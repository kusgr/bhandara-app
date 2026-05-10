// src/pages/MapPage.jsx

import {
  useEffect,
  useMemo,
} from 'react';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useMap,
} from 'react-leaflet';

import {
  Link,
} from 'react-router-dom';

import {
  LocateFixed,
} from 'lucide-react';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

import {
  useBhandaras,
} from '../hooks/useBhandaras.js';

import {
  useGeolocation,
} from '../hooks/useGeolocation.js';

// ─────────────────────────────────────────
// Fix Leaflet Marker Icons
// ─────────────────────────────────────────

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',

  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ─────────────────────────────────────────
// Orange Marker Icon
// ─────────────────────────────────────────

const orangeIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',

  iconSize: [25, 41],

  iconAnchor: [12, 41],

  popupAnchor: [1, -34],

  shadowSize: [41, 41],
});

// ─────────────────────────────────────────
// Recenter Map Component
// ─────────────────────────────────────────

function RecenterMap({
  location,
}) {

  const map = useMap();

  // Auto recenter
  useEffect(() => {

    if (
      location?.lat &&
      location?.lng
    ) {

      map.setView(
        [
          location.lat,
          location.lng,
        ],
        15,
        {
          animate: true,
        }
      );
    }

  }, [location, map]);

  // Manual recenter
  useEffect(() => {

    function handleRecenter() {

      if (
        location?.lat &&
        location?.lng
      ) {

        map.setView(
          [
            location.lat,
            location.lng,
          ],
          16,
          {
            animate: true,
          }
        );
      }
    }

    window.addEventListener(
      'recenter-map',
      handleRecenter
    );

    return () => {

      window.removeEventListener(
        'recenter-map',
        handleRecenter
      );
    };

  }, [location, map]);

  return null;
}

// ─────────────────────────────────────────
// Page
// ─────────────────────────────────────────

export default function MapPage() {

  const {
    location: userLocation,
  } = useGeolocation();

  const {
    bhandaras = [],
  } = useBhandaras(
    userLocation
  );

  // Default Center
  const center = useMemo(() => {

    if (
      userLocation?.lat &&
      userLocation?.lng
    ) {

      return [
        userLocation.lat,
        userLocation.lng,
      ];
    }

    // Delhi fallback
    return [28.6139, 77.209];

  }, [userLocation]);

  return (
    <div className="h-[calc(100vh-80px)] w-full relative">

      {/* Recenter Button */}
      <button
        onClick={() => {

          window.dispatchEvent(
            new CustomEvent(
              'recenter-map'
            )
          );
        }}
        className="absolute top-4 right-4 z-[1000] bg-white shadow-2xl border border-orange-100 rounded-2xl p-3"
      >

        <LocateFixed
          size={22}
          className="text-orange-500"
        />

      </button>

      {/* Map */}
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >

        {/* Tiles */}
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Auto Recenter */}
        <RecenterMap
          location={userLocation}
        />

        {/* Current Location */}
        {userLocation && (
          <>
            {/* Blue Glow */}
            <CircleMarker
              center={[
                userLocation.lat,
                userLocation.lng,
              ]}
              radius={18}
              pathOptions={{
                color: '#3b82f6',
                fillColor: '#3b82f6',
                fillOpacity: 0.2,
              }}
            />

            {/* Blue Dot */}
            <CircleMarker
              center={[
                userLocation.lat,
                userLocation.lng,
              ]}
              radius={8}
              pathOptions={{
                color: '#ffffff',
                weight: 3,
                fillColor: '#2563eb',
                fillOpacity: 1,
              }}
            >

              <Popup>
                📍 You are here
              </Popup>

            </CircleMarker>
          </>
        )}

        {/* Bhandara Markers */}
        {bhandaras.map(
          (bhandara) => {

            if (
              !bhandara.lat ||
              !bhandara.lng
            ) {

              return null;
            }

            return (
              <Marker
                key={bhandara.id}
                position={[
                  bhandara.lat,
                  bhandara.lng,
                ]}
                icon={orangeIcon}
              >

                <Popup>

                  <div className="space-y-2 min-w-[180px]">

                    <h3 className="font-bold text-lg">

                      {
                        bhandara.title
                      }

                    </h3>

                    <p className="text-sm text-gray-600">

                      {
                        bhandara.description
                      }

                    </p>

                    <div className="flex items-center justify-between">

                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">

                        {
                          bhandara.foodType
                        }

                      </span>

                      <Link
                        to={`/bhandara/${bhandara.id}`}
                        className="text-sm text-orange-600 font-semibold"
                      >

                        View →

                      </Link>

                    </div>

                  </div>

                </Popup>

              </Marker>
            );
          }
        )}

      </MapContainer>

    </div>
  );
}