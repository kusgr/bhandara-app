import {
  MapPinned,
  Eye,
  MapPin,
  Clock3,
} from 'lucide-react';

import MapView from '../components/MapView.jsx';

import PageWrapper from '../components/PageWrapper.jsx';

import {
  useBhandaras,
} from '../hooks/useBhandaras.js';

import {
  useGeolocation,
} from '../hooks/useGeolocation.js';

export default function MapPage() {
  const {
    location: userLocation,
  } = useGeolocation();

  const {
    bhandaras,
    loading,
  } = useBhandaras(
    userLocation
  );

  // ─────────────────────────────────────────
  // Stats
  // ─────────────────────────────────────────

  const totalViews =
    bhandaras.reduce(
      (sum, item) =>
        sum +
        (item.views || 0),
      0
    );

  const nearbyCount =
    bhandaras.filter(
      (b) =>
        b.distance != null &&
        b.distance <= 5
    ).length;

  return (
    <PageWrapper>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-saffron-500 to-turmeric-500 p-6 text-white">

          {/* Glow */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />

          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full" />

          <div className="relative z-10">

            <div className="flex items-center gap-2 mb-2">

              <MapPinned size={18} />

              <span className="text-sm text-white/80">
                Live Community Map
              </span>

            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">
              Explore Nearby
              <br />
              Bhandaras 🍛
            </h1>

            <p className="text-sm text-white/80 mt-3 max-w-md">
              Discover nearby food
              events happening around
              you in realtime.
            </p>

          </div>

        </div>

        {/* Dashboard cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Total */}
          <div className="card p-5">

            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-gray-800 flex items-center justify-center mb-4">

              <MapPin
                size={22}
                className="text-saffron-500"
              />

            </div>

            <p className="text-sm text-gray-400">
              Total Bhandaras
            </p>

            <h2 className="font-display font-extrabold text-3xl text-gray-800 dark:text-gray-100 mt-1">

              {bhandaras.length}

            </h2>

          </div>

          {/* Nearby */}
          <div className="card p-5">

            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-gray-800 flex items-center justify-center mb-4">

              <Clock3
                size={22}
                className="text-saffron-500"
              />

            </div>

            <p className="text-sm text-gray-400">
              Nearby
            </p>

            <h2 className="font-display font-extrabold text-3xl text-gray-800 dark:text-gray-100 mt-1">

              {nearbyCount}

            </h2>

          </div>

          {/* Views */}
          <div className="card p-5">

            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-gray-800 flex items-center justify-center mb-4">

              <Eye
                size={22}
                className="text-saffron-500"
              />

            </div>

            <p className="text-sm text-gray-400">
              Total Views
            </p>

            <h2 className="font-display font-extrabold text-3xl text-gray-800 dark:text-gray-100 mt-1">

              {totalViews}

            </h2>

          </div>

          {/* Live */}
          <div className="card p-5">

            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-gray-800 flex items-center justify-center mb-4">

              <span className="text-2xl">
                🔴
              </span>

            </div>

            <p className="text-sm text-gray-400">
              Live Updates
            </p>

            <h2 className="font-display font-extrabold text-3xl text-gray-800 dark:text-gray-100 mt-1">

              ON

            </h2>

          </div>

        </div>

        {/* Map */}
        <div className="space-y-4">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-display font-bold text-2xl text-gray-800 dark:text-gray-100">

                Live Map

              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Explore realtime
                bhandaras around you
              </p>

            </div>

            {!loading && (
              <span className="px-4 py-2 rounded-2xl bg-orange-50 dark:bg-gray-800 text-sm font-semibold text-saffron-600 dark:text-saffron-400">

                {bhandaras.length}
                {' '}
                active

              </span>
            )}

          </div>

          {/* Map component */}
          <MapView
            bhandaras={
              bhandaras
            }
            userLocation={
              userLocation
            }
            height="650px"
          />

        </div>

      </div>

    </PageWrapper>
  );
}