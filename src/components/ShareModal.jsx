import {
  X,
  Copy,
  Share2,
  Send,
} from 'lucide-react';

import toast from 'react-hot-toast';

export default function ShareModal({
  bhandara,
  onClose,
}) {
  if (!bhandara) return null;

  const shareUrl =
    `${window.location.origin}/bhandara/${bhandara.id}`;

  const shareText =
    `🍛 ${bhandara.title}\n\n${bhandara.description}\n\n📍 Check here:\n${shareUrl}`;

  // ─────────────────────────────────────────
  // Copy
  // ─────────────────────────────────────────

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(
        shareUrl
      );

      toast.success(
        'Link copied!'
      );

    } catch {
      toast.error(
        'Copy failed'
      );
    }
  }

  // ─────────────────────────────────────────
  // Native share
  // ─────────────────────────────────────────

  async function nativeShare() {
    try {
      if (
        navigator.share
      ) {
        await navigator.share({
          title:
            bhandara.title,

          text:
            bhandara.description,

          url: shareUrl,
        });
      } else {
        copyLink();
      }

    } catch {
      // ignore cancel
    }
  }

  // ─────────────────────────────────────────
  // WhatsApp
  // ─────────────────────────────────────────

  function whatsappShare() {
    const url =
      `https://wa.me/?text=${encodeURIComponent(
        shareText
      )}`;

    window.open(
      url,
      '_blank'
    );
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">

      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md animate-slide-up">

        <div className="card p-6 space-y-6">

          {/* Header */}
          <div className="flex items-start justify-between gap-4">

            <div>

              <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-saffron-500 to-turmeric-500 flex items-center justify-center text-2xl shadow-lg mb-3">
                🍛
              </div>

              <h2 className="font-display font-bold text-2xl text-gray-800 dark:text-gray-100">
                Share Bhandara
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Help others discover this
                food event.
              </p>

            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-2xl bg-orange-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-orange-100 dark:hover:bg-gray-700 transition-all"
            >
              <X size={18} />
            </button>

          </div>

          {/* Preview */}
          <div className="rounded-2xl border border-orange-100 dark:border-gray-700 bg-orange-50/70 dark:bg-gray-800/70 p-4">

            <p className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
              {bhandara.title}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {bhandara.description}
            </p>

          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 gap-3">

            {/* Native */}
            <button
              onClick={nativeShare}
              className="btn-primary flex items-center justify-center gap-2"
            >

              <Share2 size={18} />

              Share Now

            </button>

            {/* WhatsApp */}
            <button
              onClick={
                whatsappShare
              }
              className="btn-secondary flex items-center justify-center gap-2"
            >

              <Send size={18} />

              Share on WhatsApp

            </button>

            {/* Copy */}
            <button
              onClick={copyLink}
              className="btn-secondary flex items-center justify-center gap-2"
            >

              <Copy size={18} />

              Copy Link

            </button>

          </div>

        </div>

      </div>
    </div>
  );
}