import test from 'node:test';
import assert from 'node:assert/strict';
import { ACE_UNO_PRICING, POD_SEO_BY_SLUG } from '../src/data/podSeoCatalog.js';

test('Uno installed prices use RM400 delivery and retain the separate installation and stool prices', () => {
  assert.equal(ACE_UNO_PRICING.standardKlangValleyDelivery, 400);
  assert.equal(ACE_UNO_PRICING.standardKlangValleyInstallation, 350);
  assert.equal(ACE_UNO_PRICING.standardInstalledTotal, 9900);
  assert.equal(ACE_UNO_PRICING.optionalHighBarStool, 250);
  assert.equal(ACE_UNO_PRICING.standardInstalledTotalWithStool, 10150);
});

test('prelaunch installed totals reflect the increased delivery charge without changing pod prices', () => {
  assert.equal(POD_SEO_BY_SLUG['ace-pod-one'].startingPrice, 15550);
  assert.equal(POD_SEO_BY_SLUG['ace-pod-four'].startingPrice, 31550);
});

test('delivery is charged per trip while pod and installation costs scale with quantity', async () => {
  const { calculateStandardProjectTotal } = await import('../src/data/commercialTerms.js');
  const order = { podOnly: 9150, installationPerUnit: 350, quantity: 2 };
  assert.equal(calculateStandardProjectTotal(order), 19400);
  assert.equal(calculateStandardProjectTotal({ ...order, deliveryTrips: 2 }), 19800);
  assert.equal(calculateStandardProjectTotal({ ...order, addOnsPerUnit: 250 }), 19900);
  assert.equal(calculateStandardProjectTotal({ ...order, quantity: 0 }), 0);
  assert.throws(() => calculateStandardProjectTotal({ ...order, quantity: -1 }), RangeError);
  assert.throws(() => calculateStandardProjectTotal({ ...order, deliveryTrips: 1.5 }), RangeError);
});
