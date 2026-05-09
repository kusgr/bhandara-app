import {
  Github,
  Globe,
  Linkedin,
  Heart,
} from 'lucide-react';

export default function DevFooter() {
  return (
    <footer className="relative mt-16 pb-28 md:pb-10">

      {/* Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-200 dark:via-gray-700 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 pt-10">

        <div className="card p-6 sm:p-8 overflow-hidden relative">

          {/* Background blobs */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-200/20 dark:bg-orange-900/10 rounded-full blur-3xl" />

          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-200/20 dark:bg-yellow-900/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">

            {/* Left */}
            <div className="space-y-3">

              <div className="flex items-center gap-3">

                <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-saffron-500 to-turmeric-500 flex items-center justify-center shadow-lg shadow-orange-300/30 text-2xl">
                  👨‍💻
                </div>

                <div>

                  <h2 className="font-display font-extrabold text-2xl text-gray-800 dark:text-gray-100">
                    Kushagra Maurya
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Full Stack Developer
                  </p>

                </div>

              </div>

              <p className="max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">

                Building modern community-driven
                applications with beautiful UI,
                smooth UX and real-world impact.

              </p>

            </div>

            {/* Right */}
            <div className="space-y-4">

              {/* Portfolio */}
              <a
                href="https://kusgr.github.io/p/"
                target="_blank"
                rel="noreferrer"
                className="btn-primary flex items-center justify-center gap-2"
              >

                <Globe size={18} />

                Visit Portfolio

              </a>

              {/* Socials */}
              <div className="flex items-center gap-3 justify-center md:justify-end">

                <a
                  href="https://github.com/kusgr"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-2xl bg-orange-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-orange-100 dark:hover:bg-gray-700 transition-all hover:-translate-y-1"
                >
                  <Github size={18} />
                </a>

                <a
                  href="https://linkedin.com/in/kusgr"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-2xl bg-orange-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-orange-100 dark:hover:bg-gray-700 transition-all hover:-translate-y-1"
                >
                  <Linkedin size={18} />
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-6">

          Made with

          <Heart
            size={14}
            className="fill-red-400 text-red-400"
          />

          in India 🇮🇳

        </div>

      </div>
    </footer>
  );
}