import {
  useEffect,
  useState,
} from 'react';

export function useGeolocation() {

  const [location, setLocation] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

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

    function success(position) {

      setLocation({
        lat:
          position.coords
            .latitude,

        lng:
          position.coords
            .longitude,
      });

      setLoading(false);

      setError(null);
    }

    function fail(err) {

      console.log(err);

      setError(
        err.message ||
        'Location permission denied'
      );

      setLoading(false);
    }

    navigator.geolocation.getCurrentPosition(
      success,
      fail,
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );

  }, []);

  return {
    location,
    loading,
    error,
  };
}