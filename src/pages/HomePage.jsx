import { useState, useEffect, useMemo } from 'react';

import { Link } from 'react-router-dom';

import {
  Plus,
  Bell,
} from 'lucide-react';

import toast from 'react-hot-toast';

import { useBhandaras } from '../hooks/useBhandaras.js';
import { useGeolocation } from '../hooks/useGeolocation.js';

import BhandaraCard from '../components/BhandaraCard.jsx';
import SearchFilters from '../components/SearchFilters.jsx';
import ShareModal from '../components/ShareModal.jsx';

import PageWrapper from '../components/PageWrapper.jsx';

import {
  SkeletonCards,
  EmptyState,
} from '../components/SharedComponents.jsx';

import {
  requestNotificationPermission,
  notifyNearbyBhandaras,
} from '../utils/notifications.js';

// ─────────────────────────────────────────────
// Default filters
// ─────────────────────────────────────────────

const DEFAULT_FILTERS = {
  query: '',
  foodType: 'All',
  sortBy: 'distance',
  maxDist: 50,
};

export default function HomePage() {
  const {
    location: userLocation,
    error: geoError,
  } = useGeolocation();

  const {
    bhandaras,
    loading,
    error,
  } = useBhandaras(userLocation);

  const [filters, setFilters] =
    useState(DEFAULT_FILTERS);

  const [shareTarget, setShareTarget] =
    useState(null);

  const [notifPerm, setNotifPerm] =
    useState(
      Notification?.permission ||
        'default'
    );

  // ─────────────────────────────────────────
  // Nearby notifications
  // ─────────────────────────────────────────

  useEffect(() => {
    if (
      !loading &&
      bhandaras.length > 0 &&
      userLocation &&
      notifPerm === 'granted'
    ) {
      notifyNearbyBhandaras(
        bhandaras,
        userLocation
      );
    }
  }, [
    loading,
    bhandaras,
    userLocation,
    notifPerm,
  ]);

  // ─────────────────────────────────────────
  // Request notifications
  // ─────────────────────────────────────────

  async function handleRequestNotif() {
    const perm =
      await requestNotificationPermission();

    setNotifPerm(perm);

    if (perm === 'granted') {
      toast.success(
        'Notifications enabled 🔔'
      );

      notifyNearbyBhandaras(
        bhandaras,
        userLocation
      );
    }
  }

  // ─────────────────────────────────────────
  // Filter logic
  // ─────────────────────────────────────────

  const filtered = useMemo(() => {
    let result = [...bhandaras];

    // Search
    if (filters.query.trim()) {
      const q =
        filters.query.toLowerCase();

      result = result.filter(
        (b) =>
          b.title
            ?.toLowerCase()
            .includes(q) ||
          b.description
            ?.toLowerCase()
            .includes(q)
      );
    }

    // Category
    if (
      filters.foodType !==
      'All'
    ) {
      result = result.filter(
        (b) =>
          b.foodType ===
          filters.foodType
      );
    }

    // Sort newest
    if (
      filters.sortBy ===
      'newest'
    ) {
      result.sort(
        (a, b) =>
          (b.createdAt?.seconds ||
            0) -
          (a.createdAt?.seconds ||
            0)
      );
    }

    // Sort views
    if (
      filters.sortBy ===
      'views'
    ) {
      result.sort(
        (a, b) =>
          (b.views || 0) -
          (a.views || 0)
      );
    }

    return result;
  }, [bhandaras, filters]);

  // ─────────────────────────────────────────
  // Stats
  // ─────────────────────────────────────────

  const totalViews =
    bhandaras.reduce(
      (sum, b) =>
        sum + (b.views || 0),
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

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-5">

          {/* Main Hero */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-saffron-500 via-orange-500 to-turmeric-500 p-7 text-white min-h-[260px] flex flex-col justify-between">

            {/* Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

            <div className="relative z-10">

              <p className="text-white/80 text-sm mb-2">
                Community Food Network
              </p>

              <h1 className="font-display font-extrabold text-4xl leading-tight">

                Find Nearby
                <br />
                Bhandaras 🍛

              </h1>

              <p className="text-white/80 mt-4 max-w-sm text-sm leading-relaxed">

                Discover bhandara and
                community food events
                happening around you.

              </p>

            </div>

            {/* Button */}
            <div className="relative z-10 mt-6">

              <Link
                to="/add"
                className="inline-flex items-center gap-2 bg-white text-saffron-600 font-bold px-5 py-3 rounded-2xl shadow-lg hover:scale-[1.03] active:scale-95 transition-all"
              >

                <Plus size={18} />

                Add Bhandara

              </Link>

            </div>

          </div>

          {/* Side Stats */}
          <div className="grid grid-cols-2 gap-4">

            {/* Active */}
            <div className="card p-5 flex flex-col justify-between">

              <div className="text-4xl mb-4">
                🍛
              </div>

              <div>

                <p className="text-sm text-gray-400">
                  Active Bhandaras
                </p>

                <h2 className="font-display font-extrabold text-3xl text-gray-800 dark:text-gray-100 mt-1">

                  {bhandaras.length}

                </h2>

              </div>

            </div>

            {/* Nearby */}
            <div className="card p-5 flex flex-col justify-between">

              <div className="text-4xl mb-4">
                📍
              </div>

              <div>

                <p className="text-sm text-gray-400">
                  Nearby
                </p>

                <h2 className="font-display font-extrabold text-3xl text-gray-800 dark:text-gray-100 mt-1">

                  {nearbyCount}

                </h2>

              </div>

            </div>

            {/* Views */}
            <div className="card p-5 flex flex-col justify-between">

              <div className="text-4xl mb-4">
                👀
              </div>

              <div>

                <p className="text-sm text-gray-400">
                  Total Views
                </p>

                <h2 className="font-display font-extrabold text-3xl text-gray-800 dark:text-gray-100 mt-1">

                  {totalViews}

                </h2>

              </div>

            </div>

            {/* Live */}
            <div className="card p-5 flex flex-col justify-between">

              <div className="text-4xl mb-4">
                ⚡
              </div>

              <div>

                <p className="text-sm text-gray-400">
                  Live Updates
                </p>

                <h2 className="font-display font-extrabold text-2xl text-green-500 mt-1">

                  ACTIVE

                </h2>

              </div>

            </div>

          </div>

        </div>

        {/* Geo warning */}
        {geoError && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl px-4 py-3 text-sm text-blue-700 dark:text-blue-400">

            📍 Location unavailable

          </div>
        )}

        {/* Notifications */}
        {'Notification' in
          window &&
          notifPerm !==
            'granted' && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl px-4 py-3 flex items-center gap-3">

              <Bell size={18} />

              <p className="text-sm flex-1">
                Enable nearby
                notifications
              </p>

              <button
                onClick={
                  handleRequestNotif
                }
                className="text-sm font-bold underline"
              >
                Enable
              </button>

            </div>
          )}

        {/* Filters */}
        <SearchFilters
          filters={filters}
          onChange={setFilters}
        />

        {/* Loading */}
        {loading && (
          <SkeletonCards />
        )}

        {/* Error */}
        {error && (
          <div className="card p-6 text-center">

            <p className="text-red-500">
              {error}
            </p>

          </div>
        )}

        {/* Empty */}
        {!loading &&
          filtered.length ===
            0 && (
            <EmptyState
              title="No Bhandaras Found"
              description="Be the first to add one nearby 🍛"
            />
          )}

        {/* Cards */}
        {!loading &&
          filtered.length >
            0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {filtered.map((b) => (
                <BhandaraCard
                  key={b.id}
                  bhandara={b}
                  onShare={
                    setShareTarget
                  }
                />
              ))}

            </div>
          )}

        {/* Share Modal */}
        {shareTarget && (
          <ShareModal
            bhandara={shareTarget}
            onClose={() =>
              setShareTarget(null)
            }
          />
        )}

      </div>

    </PageWrapper>
  );
}