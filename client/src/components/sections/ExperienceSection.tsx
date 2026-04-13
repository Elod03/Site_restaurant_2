import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, Wine, ChefHat } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks';

const experiences = [
  {
    id: 1,
    icon: Clock,
    title: '午餐体验',
    subtitle: 'Lunch Experience',
    description: '在柔和的自然光下，品味我们的午餐套餐，开启一天的美好心情。',
    price: '€185',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600',
  },
  {
    id: 2,
    icon: Wine,
    title: '品酒晚宴',
    subtitle: 'Wine Pairing Dinner',
    description: '与侍酒师一起探索世界顶级酒庄的珍藏，感受餐酒搭配的艺术。',
    price: '€380',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600',
  },
  {
    id: 3,
    icon: Users,
    title: '私人包厢',
    subtitle: 'Private Dining',
    description: '在完全私密的空间中，与挚爱之人共度难忘的美食时光。',
    price: '€450',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600',
  },
  {
    id: 4,
    icon: ChefHat,
    title: '主厨餐桌',
    subtitle: "Chef's Table",
    description: '与主厨面对面，见证美食的诞生，享受独一无二的定制体验。',
    price: '€520',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600',
  },
];

export default function ExperienceSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-accent" />
            <span className="text-accent text-sm uppercase tracking-[0.3em]">
              精选体验
            </span>
            <div className="w-12 h-px bg-accent" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-semibold text-white mb-6">
            非凡的<span className="text-gradient">美食之旅</span>
          </h2>
          <p className="text-gray-400 text-lg">
            每一种体验都是一段独特的旅程，让我们为您定制专属的美食记忆。
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative h-[450px] overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredId(exp.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {/* Icon */}
                <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <exp.icon className="w-5 h-5 text-accent" />
                </div>

                {/* Text */}
                <div className="mb-4">
                  <span className="text-xs text-accent tracking-widest uppercase block mb-1">
                    {exp.subtitle}
                  </span>
                  <h3 className="text-2xl font-display font-semibold text-white">
                    {exp.title}
                  </h3>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {exp.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-accent font-display font-bold text-xl">
                    {exp.price}
                    <span className="text-gray-500 text-sm font-normal"> / 人</span>
                  </span>
                  <Link
                    to="/contact"
                    className="flex items-center gap-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0"
                  >
                    了解更多
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className={`absolute inset-0 border-2 transition-opacity duration-500 ${hoveredId === exp.id ? 'border-accent opacity-100' : 'border-transparent opacity-0'}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
