#!/usr/bin/env bash
# Adam Technical Services — nightly backup of the CMS database and media.
#
# Dumps the Postgres database and archives the uploaded-media volume into
# ./backups, then prunes anything older than $KEEP_DAYS. Run from the repo
# directory (next to docker-compose.yml).
#
# Schedule with cron, e.g. nightly at 02:30:
#   30 2 * * * cd /root/adam && ./deploy/backup.sh >> /var/log/adam-backup.log 2>&1
set -euo pipefail

cd "$(dirname "$0")/.."

# Load POSTGRES_* from the compose env file if present.
[ -f .env ] && set -a && . ./.env && set +a

DB_USER="${POSTGRES_USER:-adam}"
DB_NAME="${POSTGRES_DB:-adam_cms}"
KEEP_DAYS="${KEEP_DAYS:-14}"
OUT="backups"
STAMP="$(date +%F_%H%M)"
mkdir -p "$OUT"

echo "[backup] $(date) — database → $OUT/db-$STAMP.sql.gz"
docker compose exec -T db pg_dump -U "$DB_USER" "$DB_NAME" | gzip > "$OUT/db-$STAMP.sql.gz"

# Media volume name is <project>_media; derive it from the compose project.
MEDIA_VOL="$(docker compose config --volumes 2>/dev/null | grep -x media >/dev/null \
  && basename "$PWD" | tr -cd 'a-z0-9')_media"
echo "[backup] media volume: $MEDIA_VOL → $OUT/media-$STAMP.tgz"
docker run --rm -v "$MEDIA_VOL":/m -v "$PWD/$OUT":/b alpine \
  tar czf "/b/media-$STAMP.tgz" -C /m . || echo "[backup] media volume not found; skipping"

echo "[backup] pruning backups older than $KEEP_DAYS days"
find "$OUT" -type f -mtime +"$KEEP_DAYS" -name 'db-*.sql.gz' -delete
find "$OUT" -type f -mtime +"$KEEP_DAYS" -name 'media-*.tgz' -delete

echo "[backup] done."
