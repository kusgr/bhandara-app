import {
  useEffect,
  useState,
} from 'react';

import {
  Search,
  MapPin,
  Navigation,
} from 'lucide-react';

import toast from 'react-hot-toast';

export default function LocationPicker({
  value,
  onChange,
}) {
  const [query, setQuery] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [results, setResults] =
    useState([]);

  // ─────────────────────────────────────────
  // Search locations
  // ─────────────────────────────────────────

  useEffect(() => {
    async function search() {
      if (
        query.trim().length < 3
      ) {
        setResults([]);

        return;
      }

      try {
        setLoading(true);

        const response =
          await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              query
            )}&limit=5`
          );

        const data =
          await response.json();

        setResults(data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(
      search,
      400
    );

    return () =>
      clearTimeout(timer);

  }, [query]);

  // ─────────────────────────────────────────
  // Current location
  // ─────────────────────────────────────────

  function getCurrentLocation() {
    if (
      !navigator.geolocation
    ) {
      toast.error(
        'Geolocation not supported.'
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address:
            'Current Location',
        };

        onChange(loc);

        setQuery(
          'Current Location'
        );

        toast.success(
          'Location selected 📍'
        );
      },

      () => {
        toast.error(
          'Unable to fetch location.'
        );
      }
    );
  }

  // ─────────────────────────────────────────
  // Select suggestion
  // ─────────────────────────────────────────

  function selectLocation(item) {
    const loc = {
      lat: parseFloat(
        item.lat
      ),

      lng: parseFloat(
        item.lon
      ),

      address:
        item.display_name,
    };

    onChange(loc);

    setQuery(
      item.display_name
    );

    setResults([]);

    toast.success(
      'Location selected 📍'
    );
  }

  return (
    <div className="space-y-4">

      {/* Search */}
      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
          placeholder="Search location..."
          className="input-field pl-11"
        />

      </div>

      {/* Suggestions */}
      {results.length > 0 && (
        <div className="card p-2 space-y-1 max-h-64 overflow-y-auto">

          {results.map((item) => (
            <button
              key={item.place_id}
              type="button"
              onClick={() =>
                selectLocation(
                  item
                )
              }
              className="w-full text-left p-3 rounded-2xl hover:bg-orange-50 dark:hover:bg-gray-800 transition-all"
            >

              <div className="flex items-start gap-3">

                <MapPin
                  size={16}
                  className="text-saffron-500 mt-1 shrink-0"
                />

                <div>

                  <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-2">

                    {
                      item.display_name
                    }

                  </p>

                </div>

              </div>

            </button>
          ))}

        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-sm text-gray-400 px-2">

          Searching locations...

        </div>
      )}

      {/* Current location */}
      <button
        type="button"
        onClick={
          getCurrentLocation
        }
        className="w-full btn-secondary flex items-center justify-center gap-2"
      >

        <Navigation size={18} />

        Use Current Location

      </button>

      {/* Selected */}
      {value && (
        <div className="rounded-2xl bg-orange-50 dark:bg-gray-800 p-4 border border-orange-100 dark:border-gray-700">

          <div className="flex items-start gap-3">

            <MapPin
              size={18}
              className="text-saffron-500 mt-1"
            />

            <div>

              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">

                Selected Location

              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">

                {value.address ||
                  `${value.lat}, ${value.lng}`}

              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}