#!/bin/sh
# docker-entrypoint.sh
# Starts Next.js and ensures CMS database is verified/seeded on startup.

set -e

# Background bootstrap once Next.js starts listening
if [ -n "$PAYLOAD_SECRET" ]; then
  (
    for i in $(seq 1 30); do
      if node -e "fetch('http://127.0.0.1:3000/api/seed?secret=${PAYLOAD_SECRET}', {method:'POST'}).then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))" 2>/dev/null; then
        echo "==> CMS database verified / seeded successfully ✓"
        break
      fi
      sleep 2
    done
  ) &
fi

echo "==> Starting Next.js production server..."
exec node node_modules/.bin/next start

