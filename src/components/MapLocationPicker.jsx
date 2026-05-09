import {
  useEffect,
  useState,
} from 'react';

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from 'react-leaflet';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

// ─────────────────────────────────────────────
// Fix marker icons
// ─────────────────────────────────────────────

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',

  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ─────────────────────────────────────────────
// Recenter map
// ─────────────────────────────────────────────

function RecenterMap({
  center,
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 14, {
      animate: true,
    });
  }, [center, map]);

  return null;
}

// ─────────────────────────────────────────────
// Marker selector
// ─────────────────────────────────────────────

function LocationMarker({
  value,
  onChange,
}) {
  useMapEvents({
    async click(e) {
      const lat =
        e.latlng.lat;

      const lng =
        e.latlng.lng;

      let address =
        'Selected Location';

      try {
        const response =
          await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );

        const data =
          await response.json();

        address =
          data.display_name ||
          address;

      } catch (err) {
        console.error(err);
      }

      onChange({
        lat,
        lng,
        address,
      });
    },
  });

  if (!value) return null;

  return (
    <Marker
      position={[
        value.lat,
        value.lng,
      ]}
      draggable={true}
      eventHandlers={{
        async dragend(e) {
          const marker =
            e.target;

          const pos =
            marker.getLatLng();

          let address =
            'Selected Location';

          try {
            const response =
              await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.lat}&lon=${pos.lng}`
              );

            const data =
              await response.json();

            address =
              data.display_name ||
              address;

          } catch (err) {
            console.error(err);
          }

          onChange({
            lat: pos.lat,
            lng: pos.lng,
            address,
          });
        },
      }}
    />
  );
}

export default function MapLocationPicker({
  value,
  onChange,
}) {
  // Default Delhi
  const [currentCenter, setCurrentCenter] =
    useState([
      28.6139,
      77.2090,
    ]);

  // ─────────────────────────────────────────
  // Auto current location
  // ─────────────────────────────────────────

  useEffect(() => {
    if (
      navigator.geolocation
    ) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat =
            position.coords
              .latitude;

          const lng =
            position.coords
              .longitude;

          setCurrentCenter([
            lat,
            lng,
          ]);
        },

        () => {
          // ignore errors
        }
      );
    }
  }, []);

  // If selected location exists
  const center = value
    ? [
        value.lat,
        value.lng,
      ]
    : currentCenter;

  return (
    <div className="space-y-3">

      {/* Instructions */}
      <div className="rounded-2xl bg-orange-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-600 dark:text-gray-300">

        📍 Click anywhere on map
        to select exact location

      </div>

      {/* Map */}
      <div className="overflow-hidden rounded-3xl border border-orange-100 dark:border-gray-800">

        <MapContainer
          center={center}
          zoom={13}
          className="w-full h-[350px]"
        >

          {/* Auto recenter */}
          <RecenterMap
            center={center}
          />

          {/* Tiles */}
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marker */}
          <LocationMarker
            value={value}
            onChange={onChange}
          />

        </MapContainer>

      </div>

      {/* Selected location */}
      {value && (
        <div className="rounded-2xl bg-orange-50 dark:bg-gray-800 p-4 border border-orange-100 dark:border-gray-700">

          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">

            Selected Location

          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">

            {value.address}

          </p>

        </div>
      )}

    </div>
  );
}