import { motion } from 'framer-motion';

export default function SplashScreen() {
  return (
    <motion.div
      initial={{
        opacity: 1,
      }}

      animate={{
        opacity: 1,
      }}

      exit={{
        opacity: 0,
      }}

      className="fixed inset-0 z-[9999] bg-gradient-to-br from-saffron-500 to-turmeric-500 flex flex-col items-center justify-center overflow-hidden"
    >

      {/* Glow */}
      <div className="absolute w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl" />

      {/* Logo */}
      <motion.div
        initial={{
          scale: 0.8,
          opacity: 0,
        }}

        animate={{
          scale: 1,
          opacity: 1,
        }}

        transition={{
          duration: 0.5,
        }}

        className="relative z-10"
      >

        <div className="w-28 h-28 rounded-[32px] bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">

          <span className="text-6xl">
            🍛
          </span>

        </div>

      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{
          opacity: 0,
          y: 16,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          delay: 0.2,
          duration: 0.5,
        }}

        className="relative z-10 mt-8 font-display font-extrabold text-4xl text-white"
      >
        Bhandara
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{
          opacity: 0,
        }}

        animate={{
          opacity: 1,
        }}

        transition={{
          delay: 0.4,
        }}

        className="relative z-10 text-white/80 mt-2 text-sm"
      >
        Community Food Locator
      </motion.p>

      {/* Loader */}
      <motion.div
        initial={{
          opacity: 0,
        }}

        animate={{
          opacity: 1,
        }}

        transition={{
          delay: 0.6,
        }}

        className="relative z-10 flex gap-2 mt-8"
      >

        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-3 h-3 rounded-full bg-white animate-bounce"
            style={{
              animationDelay:
                `${i * 0.15}s`,
            }}
          />
        ))}

      </motion.div>

    </motion.div>
  );
}