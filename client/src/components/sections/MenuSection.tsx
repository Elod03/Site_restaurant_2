import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks';
import { formatPrice } from '@/utils';

interface MenuItem {
  id: number;
  name: string;
  nameEn?: string;
  description: string;
  price: number;
  category: string;
  isFeatured: boolean;
  allergens?: string;
}

interface MenuSectionProps {
  items: MenuItem[];
}

const categories = [
  { id: 'entrees', label: '头盘', en: 'Appetizers' },
  { id: 'plats', label: '主菜', en: 'Main Courses' },
  { id: 'desserts', label: '甜点', en: 'Desserts' },
  { id: 'vins', label: '酒单', en: 'Wine Selection' },
];

export default function MenuSection({ items }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState('entrees');
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const filteredItems = items.filter((item) => item.category === activeCategory);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-primary">
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
              精选菜单
            </span>
            <div className="w-12 h-px bg-accent" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-semibold text-white mb-6">
            美食<span className="text-gradient">艺术</span>
          </h2>
          <p className="text-gray-400 text-lg">
            每一道菜品都凝聚了大厨的心血与创意，选用最优质的时令食材精心烹制。
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-6 py-3 font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'text-accent'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="block text-sm tracking-wider uppercase">{cat.label}</span>
              <span className="block text-xs text-gray-500 mt-1">{cat.en}</span>
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="menu-category"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group flex gap-6 p-6 bg-background-alt/50 border border-gray-800 hover:border-accent/30 transition-all duration-300"
            >
              {/* Image */}
              <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                <img
                  src={`https://source.unsplash.com/200x200/?food,${item.id}`}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200`;
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-lg font-display font-semibold text-white">
                    {item.name}
                  </h4>
                  {item.isFeatured && (
                    <span className="badge text-xs">主厨推荐</span>
                  )}
                </div>
                {item.nameEn && (
                  <span className="text-xs text-accent/70 block mb-2">
                    {item.nameEn}
                  </span>
                )}
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                {item.allergens && (
                  <p className="text-xs text-gray-500 mt-2">
                    {item.allergens}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="flex-shrink-0 text-right">
                <span className="text-xl font-display font-bold text-accent">
                  {formatPrice(item.price)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            to="/menu"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-accent text-accent hover:bg-accent hover:text-primary transition-all duration-300"
          >
            <span className="tracking-wider uppercase">查看完整菜单</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
