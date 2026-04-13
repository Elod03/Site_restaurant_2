import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/components/layout';
import { Button } from '@/components/ui';
import { menusApi } from '@/services/api';
import { formatPrice, getCategoryName } from '@/utils';
import type { MenuItem } from '@/types';
import { ChefHat, Leaf } from 'lucide-react';

const categories = [
  { id: 'entrees', label: '头盘', en: 'Appetizers' },
  { id: 'plats', label: '主菜', en: 'Main Courses' },
  { id: 'desserts', label: '甜点', en: 'Desserts' },
  { id: 'vins', label: '酒单', en: 'Wine Selection' },
];

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('entrees');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await menusApi.getAll();
        setMenuItems(response.data);
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920"
            alt="Menu"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-black/50" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center px-6"
        >
          <h1 className="text-5xl lg:text-7xl font-display font-bold text-white mb-4">
            精选菜单
          </h1>
          <p className="text-xl text-gray-300">
            由主厨精心烹制的法式美食艺术
          </p>
        </motion.div>
      </section>

      {/* Category Navigation */}
      <section className="sticky top-16 lg:top-20 z-40 bg-primary/95 backdrop-blur-lg border-b border-gray-800">
        <div className="container-luxury">
          <div className="flex overflow-x-auto py-4 gap-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-6 py-3 rounded-full border transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-accent text-primary border-accent'
                    : 'border-gray-700 text-gray-400 hover:border-accent hover:text-accent'
                }`}
              >
                <span className="block text-sm font-medium">{cat.label}</span>
                <span className="block text-xs opacity-70">{cat.en}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-16">
        <div className="container-luxury">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Category Header */}
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-display font-bold text-white mb-2">
                  {getCategoryName(activeCategory)}
                </h2>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-px bg-accent" />
                  <span className="text-accent">{categories.find((c) => c.id === activeCategory)?.en}</span>
                  <div className="w-16 h-px bg-accent" />
                </div>
              </motion.div>

              {/* Menu Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex gap-6 p-6 bg-background-alt/50 border border-gray-800 hover:border-accent/50 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="w-28 h-28 flex-shrink-0 overflow-hidden relative">
                      <img
                        src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200`}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200';
                        }}
                      />
                      {item.isFeatured && (
                        <div className="absolute top-2 left-2 bg-accent text-primary p-1 rounded-full">
                          <ChefHat className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-xl font-display font-semibold text-white">
                          {item.name}
                        </h4>
                      </div>
                      {item.nameEn && (
                        <span className="text-xs text-accent/70 mb-2">
                          {item.nameEn}
                        </span>
                      )}
                      <p className="text-gray-400 text-sm leading-relaxed flex-1">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          {item.allergens && (
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Leaf className="w-3 h-3" />
                              {item.allergens}
                            </span>
                          )}
                        </div>
                        <span className="text-2xl font-display font-bold text-accent">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500">该分类暂无菜品</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-b from-background to-primary">
        <div className="container-luxury text-center">
          <h3 className="text-2xl font-display text-white mb-4">
            想要品尝这些美味？
          </h3>
          <p className="text-gray-400 mb-8">
            立即预订您的专属美食体验
          </p>
          <Button variant="primary" onClick={() => {}}>
            在线预订
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
