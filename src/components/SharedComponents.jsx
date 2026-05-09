export function LoadingSpinner({
  message = 'Loading…',
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 animate-fade-in">

      {/* Icon */}
      <div className="relative">

        <div className="text-6xl animate-bounce">
          🍛
        </div>

        <div className="absolute inset-0 blur-2xl bg-orange-300/30 rounded-full" />

      </div>

      {/* Dots */}
      <div className="flex gap-2">

        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-saffron-400 animate-bounce"
            style={{
              animationDelay:
                `${i * 0.15}s`,
            }}
          />
        ))}

      </div>

      {/* Message */}
      <p className="text-sm text-gray-400 dark:text-gray-500 font-body">
        {message}
      </p>

    </div>
  );
}

// ─────────────────────────────────────────────
// Skeleton cards
// ─────────────────────────────────────────────

export function SkeletonCards({
  count = 6,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">

      {Array.from({
        length: count,
      }).map((_, i) => (
        <div
          key={i}
          className="card overflow-hidden"
        >

          {/* Image */}
          <div className="h-48 bg-orange-100 dark:bg-gray-800" />

          {/* Content */}
          <div className="p-5 space-y-4">

            <div className="space-y-2">

              <div className="h-5 w-3/4 rounded-lg bg-orange-100 dark:bg-gray-800" />

              <div className="h-4 w-full rounded-lg bg-orange-50 dark:bg-gray-800" />

              <div className="h-4 w-5/6 rounded-lg bg-orange-50 dark:bg-gray-800" />

            </div>

            <div className="flex justify-between">

              <div className="h-4 w-20 rounded-lg bg-orange-100 dark:bg-gray-800" />

              <div className="h-4 w-16 rounded-lg bg-orange-100 dark:bg-gray-800" />

            </div>

            <div className="h-12 rounded-2xl bg-orange-100 dark:bg-gray-800" />

          </div>

        </div>
      ))}

    </div>
  );
}

// ─────────────────────────────────────────────
// Empty state
// ─────────────────────────────────────────────

export function EmptyState({
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in">

      {/* Icon */}
      <div className="relative mb-5">

        <div className="text-7xl">
          🍽️
        </div>

        <div className="absolute inset-0 blur-3xl bg-orange-200/40 rounded-full" />

      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-2xl text-gray-700 dark:text-gray-300 mb-2">
        {title || 'Nothing here yet'}
      </h3>

      {/* Description */}
      <p className="text-gray-400 dark:text-gray-500 font-body text-sm max-w-xs mb-6 leading-relaxed">

        {description ||
          'No bhandaras found nearby.'}

      </p>

      {/* Action */}
      {action && (
        <div>
          {action}
        </div>
      )}

    </div>
  );
}