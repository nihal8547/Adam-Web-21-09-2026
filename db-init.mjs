// db-init.mjs
// Bootstraps the Payload CMS database by calling getPayload() which triggers
// the push: true schema sync from @payloadcms/db-postgres.
// Run once before `next start` in Docker.

import { getPayload } from 'payload';
import config from './payload.config.js';

console.log('[db-init] Connecting to database and syncing schema…');

try {
  const payload = await getPayload({ config });
  console.log('[db-init] Schema sync complete ✓');
  // Gracefully shut down — next start takes over
  await payload.db.destroy();
  process.exit(0);
} catch (err) {
  console.error('[db-init] ERROR:', err.message);
  // Don't fail hard — let the app start and surface the real error
  process.exit(0);
}
