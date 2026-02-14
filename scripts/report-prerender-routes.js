#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');
const { getStaticRoutes } = require('./prerender-routes');

const SNAPSHOT_FILE = path.resolve(__dirname, 'prerender-static-routes.snapshot.json');

const toSet = (items) => new Set(items || []);

const run = async () => {
  const staticRoutes = (await getStaticRoutes()).sort();

  let snapshotRoutes = [];
  try {
    const snapshotRaw = await fs.readFile(SNAPSHOT_FILE, 'utf8');
    const parsed = JSON.parse(snapshotRaw);
    if (Array.isArray(parsed)) {
      snapshotRoutes = parsed;
    }
  } catch (_) {
    // No snapshot yet; treat everything as newly discovered.
  }

  const currentSet = toSet(staticRoutes);
  const snapshotSet = toSet(snapshotRoutes);

  const addedRoutes = staticRoutes.filter((route) => !snapshotSet.has(route));
  const removedRoutes = snapshotRoutes.filter((route) => !currentSet.has(route)).sort();

  console.log(`[prerender-routes] static routes discovered: ${staticRoutes.length}`);

  if (addedRoutes.length > 0) {
    console.log(`[prerender-routes] newly discovered static routes (${addedRoutes.length}):`);
    addedRoutes.forEach((route) => console.log(`  + ${route}`));
  } else {
    console.log('[prerender-routes] newly discovered static routes: none');
  }

  if (removedRoutes.length > 0) {
    console.log(`[prerender-routes] removed static routes (${removedRoutes.length}):`);
    removedRoutes.forEach((route) => console.log(`  - ${route}`));
  }
};

run().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
