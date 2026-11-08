// Owner-confirmed website corrections, 19 October 2026.
export const STANDARD_KLANG_VALLEY_DELIVERY = 400;
export const ACE_HUB_WEIGHT_KG = 700;

export function calculateStandardProjectTotal({
  podOnly,
  installationPerUnit,
  quantity = 1,
  deliveryTrips = 1,
  addOnsPerUnit = 0
}) {
  if (![quantity, deliveryTrips].every((value) => Number.isInteger(value) && value >= 0)) {
    throw new RangeError('Quantity and delivery trips must be non-negative whole numbers.');
  }
  if (![podOnly, installationPerUnit, addOnsPerUnit].every((value) => Number.isFinite(value) && value >= 0)) {
    throw new RangeError('Project prices must be non-negative amounts.');
  }
  if (quantity === 0) return 0;
  return (podOnly + installationPerUnit + addOnsPerUnit) * quantity
    + STANDARD_KLANG_VALLEY_DELIVERY * deliveryTrips;
}
