import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useUIStore } from '@/stores';

export default function Hero() {
  const { setReservationModalOpen } = useUIStore();

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-elegant-restaurant-with-people-dining-3239-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        {/* Michelin Stars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          {[1, 2, 3].map((star) => (
            <motion.svg
              key={star}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + star * 0.2 }}
              className="w-8 h-8 text-accent fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </motion.svg>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white mb-4 tracking-tight"
        >
          L'<span className="text-gradient">Imperial</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 font-light tracking-[0.3em] uppercase mb-12"
        >
          米其林三星 · 法式美食殿堂
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-lg text-gray-400 max-w-2xl mb-12 leading-relaxed"
        >
          在光影交错的优雅空间里，感受法式料理的极致艺术。
          <br />
          每道菜品都是一首诗，每个瞬间都是永恒。
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => setReservationModalOpen(true)}
            className="group relative px-10 py-4 bg-accent text-primary font-semibold overflow-hidden transition-all duration-300 hover:shadow-gold hover:scale-105"
          >
            <span className="relative z-10 tracking-wider uppercase">
              在线预订
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
          <a
            href="#discover"
            className="px-10 py-4 border-2 border-white/30 text-white hover:border-accent hover:text-accent transition-all duration-300 tracking-wider uppercase"
          >
            探索更多
          </a>
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
        />

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => {
            document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-xs text-gray-400 tracking-widest uppercase">
            向下探索
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 text-accent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
