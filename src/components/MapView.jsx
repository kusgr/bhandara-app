import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  CircleMarker,
} from 'react-leaflet';

import L from 'leaflet';

import {
  useEffect,
} from 'react';

import 'leaflet/dist/leaflet.css';

import {
  Navigation,
  Eye,
} from 'lucide-react';

import { Link } from 'react-router-dom';

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
// Orange Bhandara Marker
// ─────────────────────────────────────────────

const bhandaraIcon =
  new L.Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',

    shadowUrl:
      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',

    iconSize: [25, 41],

    iconAnchor: [12, 41],

    popupAnchor: [1, -34],

    shadowSize: [41, 41],
  });

// ─────────────────────────────────────────────
// Resize fix
// ─────────────────────────────────────────────

function ResizeMap() {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 300);

    return () => clearTimeout(timer);
  }, [map]);

  return null;
}

// ─────────────────────────────────────────────
// Recenter map
// ─────────────────────────────────────────────

function RecenterMap({
  center,
}) {
  const map = useMap();

  useEffect(() => {
    if (!center) return;

    map.setView(center, 14, {
      animate: true,
    });

  }, [center, map]);

  return null;
}

export default function MapView({
  bhandaras = [],
  userLocation = null,
  height = '600px',
}) {
  // Default center
  const center =
    userLocation
      ? [
          userLocation.lat,
          userLocation.lng,
        ]
      : [28.6139, 77.2090];

  return (
    <div className="card overflow-hidden">

      <div
        className="w-full rounded-3xl overflow-hidden"
        style={{
          height,
        }}
      >

        <MapContainer
          center={center}
          zoom={11}
          scrollWheelZoom={true}
          className="w-full h-full z-0"
        >

          {/* Resize fix */}
          <ResizeMap />

          {/* Recenter */}
          <RecenterMap
            center={center}
          />

          {/* Tiles */}
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Current Location */}
          {userLocation && (
            <>
              {/* Glow */}
              <CircleMarker
                center={[
                  userLocation.lat,
                  userLocation.lng,
                ]}
                radius={18}
                pathOptions={{
                  color: '#3b82f6',
                  fillColor:
                    '#3b82f6',
                  fillOpacity: 0.15,
                  weight: 2,
                }}
              />

              {/* Blue dot */}
              <CircleMarker
                center={[
                  userLocation.lat,
                  userLocation.lng,
                ]}
                radius={8}
                pathOptions={{
                  color: '#ffffff',
                  fillColor:
                    '#2563eb',
                  fillOpacity: 1,
                  weight: 3,
                }}
              />
            </>
          )}

          {/* Bhandara markers */}
          {bhandaras.map((b) => (
            <Marker
              key={b.id}
              icon={
                bhandaraIcon
              }
              position={[
                b.lat,
                b.lng,
              ]}
            >

              <Popup>

                <div className="w-[230px] space-y-3">

                  {/* Image */}
                  {b.imageUrl ? (
                    <img
                      src={b.imageUrl}
                      alt={b.title}
                      className="w-full h-28 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-28 rounded-xl bg-gradient-to-br from-saffron-500 to-turmeric-500 flex items-center justify-center text-5xl">
                      🍛
                    </div>
                  )}

                  {/* Title */}
                  <div>

                    <h3 className="font-bold text-base line-clamp-1">

                      {b.title}

                    </h3>

                    {b.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">

                        {
                          b.description
                        }

                      </p>
                    )}

                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500">

                    {/* Category */}
                    <span className="px-2 py-1 rounded-full bg-orange-100 text-saffron-600 font-semibold">

                      {b.foodType}

                    </span>

                    {/* Views */}
                    <span className="flex items-center gap-1">

                      <Eye size={12} />

                      {b.views || 0}

                    </span>

                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">

                    {/* View */}
                    <Link
                      to={`/bhandara/${b.id}`}
                      className="flex-1 bg-saffron-500 hover:bg-saffron-600 text-white text-center py-2 rounded-xl text-sm font-semibold transition-colors"
                    >
                      View
                    </Link>

                    {/* Directions */}
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-11 flex items-center justify-center bg-orange-100 hover:bg-orange-200 rounded-xl transition-colors"
                    >

                      <Navigation
                        size={16}
                      />

                    </a>

                  </div>

                </div>

              </Popup>

            </Marker>
          ))}

        </MapContainer>

      </div>

    </div>
  );
}