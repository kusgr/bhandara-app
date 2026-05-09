import {
  Search,
  SlidersHorizontal,
} from 'lucide-react';

const FOOD_TYPES = [
  'All',
  'Prashad',
  'Bhandara',
  'Other',
];

const SORT_OPTIONS = [
  {
    label: 'Nearest',
    value: 'distance',
  },

  {
    label: 'Newest',
    value: 'newest',
  },

  {
    label: 'Most Viewed',
    value: 'views',
  },
];

export default function SearchFilters({
  filters,
  onChange,
}) {
  function update(key, value) {
    onChange({
      ...filters,
      [key]: value,
    });
  }

  return (
    <div className="card p-4 sm:p-5 space-y-5">

      {/* Header */}
      <div className="flex items-center gap-2">

        <div className="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-gray-800 flex items-center justify-center">

          <SlidersHorizontal
            size={18}
            className="text-saffron-500"
          />

        </div>

        <div>

          <h2 className="font-semibold text-gray-800 dark:text-gray-100">
            Search & Filters
          </h2>

          <p className="text-xs text-gray-400">
            Find nearby bhandaras
          </p>

        </div>

      </div>

      {/* Search */}
      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={filters.query}
          onChange={(e) =>
            update(
              'query',
              e.target.value
            )
          }
          placeholder="Search bhandara..."
          className="input-field pl-11"
        />

      </div>

      {/* Categories */}
      <div className="space-y-2">

        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Categories
        </p>

        <div className="flex flex-wrap gap-2">

          {FOOD_TYPES.map(
            (type) => {
              const active =
                filters.foodType ===
                type;

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    update(
                      'foodType',
                      type
                    )
                  }
                  className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all active:scale-95 ${
                    active
                      ? 'bg-saffron-500 text-white shadow-md'
                      : 'bg-orange-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-orange-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {type}
                </button>
              );
            }
          )}

        </div>

      </div>

      {/* Sort */}
      <div className="space-y-2">

        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Sort By
        </p>

        <div className="grid grid-cols-3 gap-2">

          {SORT_OPTIONS.map(
            (item) => {
              const active =
                filters.sortBy ===
                item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    update(
                      'sortBy',
                      item.value
                    )
                  }
                  className={`rounded-2xl py-2.5 text-sm font-semibold transition-all active:scale-95 ${
                    active
                      ? 'bg-saffron-500 text-white shadow-md'
                      : 'bg-orange-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-orange-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              );
            }
          )}

        </div>

      </div>

    </div>
  );
}