// src/components/StarRating.jsx
// ──────────────────────────────────────────────
// Displays stars. If interactive=true, user can click to rate.
// ──────────────────────────────────────────────

import { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({
  rating = 0,
  interactive = false,
  onRate,
  size = 18,
}) {
  const [hovered, setHovered] = useState(0);

  const displayRating = interactive ? hovered || rating : rating;

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onRate?.(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={`transition-transform duration-100 ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
          aria-label={`Rate ${star} stars`}
        >
          <Star
            size={size}
            fill={star <= displayRating ? '#f0b429' : 'none'}
            strokeWidth={1.5}
            className={star <= displayRating ? 'star-filled' : 'star-empty'}
          />
        </button>
      ))}
    </div>
  );
}
