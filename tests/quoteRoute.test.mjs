import test from 'node:test';
import assert from 'node:assert/strict';
import { getRouteManifest } from '../scripts/route-manifest.mjs';

test('the quote journey has a direct-load public page without being indexed', async () => {
  const manifest = await getRouteManifest();
  assert.ok(manifest.PUBLIC_ROUTES.includes('/get-a-quote'));
  assert.ok(manifest.NOINDEX_ROUTES.includes('/get-a-quote'));
  assert.ok(!manifest.INDEXABLE_ROUTES.includes('/get-a-quote'));
});
