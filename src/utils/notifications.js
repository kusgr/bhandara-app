const SHOWN_KEY =
  'shown-bhandara-alerts';

// ─────────────────────────────────────────────
// Request permission
// ─────────────────────────────────────────────

export async function requestNotificationPermission() {
  if (
    !('Notification' in window)
  ) {
    return 'denied';
  }

  if (
    Notification.permission ===
    'granted'
  ) {
    return 'granted';
  }

  const permission =
    await Notification.requestPermission();

  return permission;
}

// ─────────────────────────────────────────────
// Send notification
// ─────────────────────────────────────────────

export function sendNotification({
  title,
  body,
}) {
  if (
    Notification.permission !==
    'granted'
  ) {
    return;
  }

  new Notification(title, {
    body,
    icon: '/pwa-192.png',
  });
}

// ─────────────────────────────────────────────
// Nearby notification logic
// ─────────────────────────────────────────────

export function notifyNearbyBhandaras(
  bhandaras,
  userLocation
) {
  if (
    !userLocation ||
    !Array.isArray(bhandaras)
  ) {
    return;
  }

  // Already shown IDs
  const alreadyShown =
    JSON.parse(
      localStorage.getItem(
        SHOWN_KEY
      ) || '[]'
    );

  const updatedShown = [
    ...alreadyShown,
  ];

  bhandaras.forEach((b) => {
    // No distance
    if (
      b.distance == null
    ) {
      return;
    }

    // Too far
    if (b.distance > 5) {
      return;
    }

    // Prevent duplicate alerts
    if (
      alreadyShown.includes(
        b.id
      )
    ) {
      return;
    }

    // Expiry protection
    const createdAt =
      b.createdAt?.seconds
        ? new Date(
            b.createdAt.seconds *
              1000
          )
        : new Date();

    const expiryDate =
      new Date(createdAt);

    expiryDate.setDate(
      expiryDate.getDate() + 1
    );

    expiryDate.setHours(
      0,
      0,
      0,
      0
    );

    // Skip expired
    if (
      new Date() >
      expiryDate
    ) {
      return;
    }

    // Send notification
    sendNotification({
      title:
        '🍛 Nearby Bhandara',

      body:
        `${b.title} is only ${b.distance.toFixed(
          1
        )} km away.`,
    });

    updatedShown.push(b.id);
  });

  localStorage.setItem(
    SHOWN_KEY,
    JSON.stringify(
      updatedShown
    )
  );
}