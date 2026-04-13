import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks';

export default function AboutSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section id="discover" ref={ref} className="py-24 lg:py-32 bg-primary">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800"
                alt="餐厅内部"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -top-4 -left-4 w-32 h-32 border-l-2 border-t-2 border-accent/50" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-r-2 border-b-2 border-accent/50" />
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-accent text-primary p-6 text-center">
              <span className="block text-4xl font-display font-bold">70</span>
              <span className="text-sm uppercase tracking-wider">年传承</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pl-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-accent" />
              <span className="text-accent text-sm uppercase tracking-[0.3em]">
                关于我们
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-display font-semibold text-white mb-6 leading-tight">
              超越美食的
              <br />
              <span className="text-gradient">艺术体验</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              自1952年开业以来，L'Imperial 一直是巴黎美食界的标杆。我们相信，每一道菜品都是厨师对食材的敬意，每一次用餐都是宾客与艺术的邂逅。
            </p>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              在这里，传统与创新完美交融。我们的大厨们以其卓越的技艺和对细节的极致追求，将法式料理推向新的高度，让每一位宾客都能感受到味蕾与心灵的双重震撼。
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { number: '1952', label: '创立年份' },
                { number: '3', label: '米其林星级' },
                { number: '50+', label: '烹饪大师' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <span className="block text-3xl font-display font-bold text-accent mb-1">
                    {item.number}
                  </span>
                  <span className="text-sm text-gray-500">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex">
                {[1, 2, 3].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-accent fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-400 text-sm">
                米其林三星认证
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
