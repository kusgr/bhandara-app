import {
  MapPin,
  Eye,
  Share2,
  ArrowRight,
} from 'lucide-react';

import { Link } from 'react-router-dom';

export default function BhandaraCard({
  bhandara,
  onShare,
}) {
  return (
    <div className="group card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      {/* Image / Banner */}
      <div className="relative h-48 overflow-hidden">

        {bhandara.imageUrl ? (
          <img
            src={bhandara.imageUrl}
            alt={bhandara.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-saffron-500 to-turmeric-500 flex items-center justify-center">

            <span className="text-6xl">
              🍛
            </span>

          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Category */}
        <div className="absolute top-4 left-4">

          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-saffron-600 shadow-md">

            {bhandara.foodType}

          </span>

        </div>

      </div>

      {/* Content */}
      <div className="p-5 space-y-4">

        {/* Title */}
        <div>

          <h3 className="font-display font-bold text-xl text-gray-800 dark:text-gray-100 line-clamp-1">

            {bhandara.title}

          </h3>

          {/* Description */}
          {bhandara.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">

              {bhandara.description}

            </p>
          )}

        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm">

          {/* Distance */}
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">

            <MapPin size={15} />

            <span>

              {bhandara.distance !=
              null
                ? `${bhandara.distance.toFixed(
                    1
                  )} km`
                : 'Location'}

            </span>

          </div>

          {/* Views */}
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">

            <Eye size={15} />

            <span>
              {bhandara.views ||
                0}
            </span>

          </div>

        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* View */}
          <Link
            to={`/bhandara/${bhandara.id}`}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >

            View Details

            <ArrowRight
              size={16}
            />

          </Link>

          {/* Share */}
          <button
            onClick={() =>
              onShare?.(
                bhandara
              )
            }
            className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-gray-800 hover:bg-orange-100 dark:hover:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all active:scale-95"
          >

            <Share2 size={18} />

          </button>

        </div>

      </div>

    </div>
  );
}