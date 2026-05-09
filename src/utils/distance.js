// src/utils/distance.js
// ──────────────────────────────────────────────
// Haversine formula: calculates great-circle distance
// between two lat/lng points in kilometres.
// ──────────────────────────────────────────────

const R = 6371; // Earth's radius in km

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

/**
 * Returns distance in km between two coordinates.
 */
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1)); // 1 decimal km
}

/**
 * Format distance for display.
 * < 1 km → show in metres
 * >= 1 km → show in km
 */
export function formatDistance(km) {
  if (km === null || km === undefined) return 'Distance unknown';
  if (km < 1) return `${Math.round(km * 1000)} m away`;
  return `${km} km away`;
}
