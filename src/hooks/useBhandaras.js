import {
  useEffect,
  useState,
} from 'react';

import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

import { db } from '../firebase/config.js';

import {
  calculateDistance,
} from '../utils/distance.js';

const COLLECTION =
  'bhandaras';

export function useBhandaras(
  userLocation
) {
  const [bhandaras, setBhandaras] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  // ─────────────────────────────────────────
  // Live realtime updates
  // ─────────────────────────────────────────

  useEffect(() => {
    setLoading(true);

    const q = query(
      collection(db, COLLECTION),
      orderBy(
        'createdAt',
        'desc'
      )
    );

    const unsubscribe =
      onSnapshot(
        q,

        (snapshot) => {
          const data =
            snapshot.docs
              .map((doc) => {
                const item = {
                  id: doc.id,
                  ...doc.data(),
                };

                // ─────────────────────
                // Auto expiry system
                // Expires next day 12AM
                // ─────────────────────

                const createdAt =
                  item.createdAt
                    ?.seconds
                    ? new Date(
                        item.createdAt.seconds *
                          1000
                      )
                    : new Date();

                // Next day midnight
                const expiryDate =
                  new Date(
                    createdAt
                  );

                expiryDate.setDate(
                  expiryDate.getDate() +
                    1
                );

                expiryDate.setHours(
                  0,
                  0,
                  0,
                  0
                );

                // Hide expired
                if (
                  new Date() >
                  expiryDate
                ) {
                  return null;
                }

                // ─────────────────────
                // Distance
                // ─────────────────────

                if (
                  userLocation &&
                  item.lat &&
                  item.lng
                ) {
                  item.distance =
                    calculateDistance(
                      userLocation.lat,
                      userLocation.lng,
                      item.lat,
                      item.lng
                    );
                } else {
                  item.distance =
                    null;
                }

                return item;
              })

              // Remove expired
              .filter(Boolean);

          setBhandaras(data);

          setLoading(false);

          setError('');
        },

        (err) => {
          console.error(err);

          setError(
            'Failed to load bhandaras.'
          );

          setLoading(false);
        }
      );

    return () =>
      unsubscribe();

  }, [userLocation]);

  return {
    bhandaras,
    loading,
    error,
  };
}