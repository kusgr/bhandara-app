import {
  useEffect,
  useState,
} from 'react';

import {
  useParams,
  Link,
  useNavigate,
} from 'react-router-dom';

import {
  MapPin,
  Eye,
  Share2,
  ArrowLeft,
  Navigation,
  Pencil,
  Trash2,
} from 'lucide-react';

import toast from 'react-hot-toast';

import {
  getBhandara,
  updateBhandara,
  deleteBhandara,
} from '../services/bhandaraService.js';

import ShareModal from '../components/ShareModal.jsx';

import {
  LoadingSpinner,
} from '../components/SharedComponents.jsx';

export default function BhandaraDetailPage() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [bhandara, setBhandara] =
    useState(null);

  const [shareOpen, setShareOpen] =
    useState(false);

  // ─────────────────────────────────────────
  // Load
  // ─────────────────────────────────────────

  useEffect(() => {

    async function load() {

      try {

        setLoading(true);

        const data =
          await getBhandara(id);

        setBhandara(data);

        // Increase views
        updateBhandara(id, {
          views:
            (data.views || 0) +
            1,
        });

      } catch (err) {

        console.error(err);

        toast.error(
          'Failed to load details.'
        );

      } finally {

        setLoading(false);
      }
    }

    load();

  }, [id]);

  // ─────────────────────────────────────────
  // Delete
  // ─────────────────────────────────────────

  async function handleDelete() {

    const confirmDelete =
      window.confirm(
        'Delete this bhandara?'
      );

    if (!confirmDelete)
      return;

    try {

      await deleteBhandara(id);

      toast.success(
        'Bhandara deleted.'
      );

      navigate('/');

    } catch (err) {

      console.error(err);

      toast.error(
        'Failed to delete.'
      );
    }
  }

  // ─────────────────────────────────────────
  // Loading
  // ─────────────────────────────────────────

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <LoadingSpinner />

      </div>
    );
  }

  // ─────────────────────────────────────────
  // Not found
  // ─────────────────────────────────────────

  if (!bhandara) {

    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">

        <div className="text-7xl mb-6">
          🍛
        </div>

        <h1 className="font-black text-3xl text-gray-800 mb-3">

          Bhandara Not Found

        </h1>

        <p className="text-gray-500 mb-8">

          This bhandara may have
          expired or been removed.

        </p>

        <Link
          to="/"
          className="btn-primary inline-flex items-center gap-2"
        >

          <ArrowLeft size={18} />

          Back Home

        </Link>

      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">

      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl h-[320px]">

        {bhandara.imageUrl ? (

          <img
            src={bhandara.imageUrl}
            alt={bhandara.title}
            className="w-full h-full object-cover"
          />

        ) : (

          <div className="w-full h-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">

            <span className="text-8xl">
              🍛
            </span>

          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Back */}
        <Link
          to="/"
          className="absolute top-5 left-5 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white"
        >

          <ArrowLeft size={20} />

        </Link>

        {/* Category */}
        <div className="absolute top-5 right-5">

          <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-xl border border-white/20 text-white text-sm font-bold">

            {bhandara.foodType}

          </span>

        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">

          <h1 className="font-black text-4xl leading-tight">

            {bhandara.title}

          </h1>

        </div>

      </div>

      {/* Details */}
      <div className="card p-6 space-y-6">

        {/* Description */}
        {bhandara.description && (

          <div>

            <h2 className="font-bold text-lg text-gray-800 mb-2">

              Details

            </h2>

            <p className="text-gray-600 leading-relaxed">

              {bhandara.description}

            </p>

          </div>
        )}

        {/* Meta */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

          {/* Views */}
          <div className="rounded-2xl bg-orange-50 p-4">

            <div className="flex items-center gap-2 text-gray-500 mb-2">

              <Eye size={18} />

              <span className="text-sm">
                Views
              </span>

            </div>

            <p className="font-black text-2xl text-gray-800">

              {bhandara.views || 0}

            </p>

          </div>

          {/* Distance */}
          <div className="rounded-2xl bg-orange-50 p-4">

            <div className="flex items-center gap-2 text-gray-500 mb-2">

              <MapPin size={18} />

              <span className="text-sm">
                Distance
              </span>

            </div>

            <p className="font-black text-2xl text-gray-800">

              {bhandara.distance != null
                ? `${bhandara.distance.toFixed(1)} km`
                : '--'}

            </p>

          </div>

          {/* Category */}
          <div className="rounded-2xl bg-orange-50 p-4">

            <div className="flex items-center gap-2 text-gray-500 mb-2">

              🍛

              <span className="text-sm">
                Category
              </span>

            </div>

            <p className="font-black text-lg text-gray-800">

              {bhandara.foodType}

            </p>

          </div>

        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4">

          {/* Main actions */}
          <div className="flex flex-col sm:flex-row gap-4">

            {/* Directions */}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${bhandara.lat},${bhandara.lng}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >

              <Navigation size={18} />

              Open Directions

            </a>

            {/* Share */}
            <button
              onClick={() =>
                setShareOpen(true)
              }
              className="flex-1 btn-secondary flex items-center justify-center gap-2"
            >

              <Share2 size={18} />

              Share

            </button>

          </div>

          {/* Edit/Delete */}
          <div className="grid grid-cols-2 gap-4">

            {/* Edit */}
            <Link
              to={`/edit/${bhandara.id}`}
              className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white py-3 font-semibold transition-all"
            >

              <Pencil size={18} />

              Edit

            </Link>

            {/* Delete */}
            <button
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 rounded-2xl bg-red-500 hover:bg-red-600 text-white py-3 font-semibold transition-all"
            >

              <Trash2 size={18} />

              Delete

            </button>

          </div>

        </div>

      </div>

      {/* Share Modal */}
      {shareOpen && (
        <ShareModal
          bhandara={bhandara}
          onClose={() =>
            setShareOpen(false)
          }
        />
      )}

    </div>
  );
}