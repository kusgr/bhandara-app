import {
  useEffect,
  useState,
} from 'react';

export function useGeolocation() {

  const [location, setLocation] =
    useState(null);

  const [error, setError] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (
      !navigator.geolocation
    ) {

      setError(
        'Geolocation not supported'
      );

      setLoading(false);

      return;
    }

    // Watch live location
    const watchId =
      navigator.geolocation.watchPosition(

        (position) => {

          setLocation({
            lat:
              position.coords
                .latitude,

            lng:
              position.coords
                .longitude,
          });

          setError(null);

          setLoading(false);
        },

        (err) => {

          setError(err.message);

          setLoading(false);
        },

        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 15000,
        }
      );

    return () => {

      navigator.geolocation.clearWatch(
        watchId
      );
    };

  }, []);

  return {
    location,
    error,
    loading,
  };
}