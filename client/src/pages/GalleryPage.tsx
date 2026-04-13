import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/components/layout';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryApi } from '@/services/api';
import { useUIStore } from '@/stores';
import { getCategoryName } from '@/utils';
import type { GalleryItem } from '@/types';

const categories = [
  { id: 'all', label: '全部' },
  { id: 'interior', label: '环境' },
  { id: 'food', label: '美食' },
  { id: 'team', label: '团队' },
  { id: 'exterior', label: '户外' },
];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const { isLightboxOpen, openLightbox, closeLightbox } = useUIStore();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await galleryApi.getAll();
        setItems(response.data);
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter((item) => item.category === activeCategory);

  const handlePrev = () => {
    if (currentIndex !== null && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex !== null && currentIndex < filteredItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const openLightboxAt = (index: number) => {
    setCurrentIndex(index);
    const item = filteredItems[index];
    if (item) {
      openLightbox(item.image);
    }
  };

  const closeLightboxHandler = () => {
    setCurrentIndex(null);
    closeLightbox();
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920"
            alt="画廊"
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
            视觉画廊
          </h1>
          <p className="text-xl text-gray-300">
            感受 L'Imperial 的独特魅力
          </p>
        </motion.div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="container-luxury">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-accent text-primary border-accent'
                    : 'border-gray-700 text-gray-400 hover:border-accent hover:text-accent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
                  onClick={() => openLightboxAt(index)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-display font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <span className="text-accent text-sm">
                      {getCategoryName(item.category)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {filteredItems.length === 0 && !loading && (
            <div className="text-center py-16">
              <p className="text-gray-500">暂无图片</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {isLightboxOpen && currentIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightboxHandler}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 p-2 text-white hover:text-accent transition-colors z-10"
            onClick={closeLightboxHandler}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Prev Button */}
          {currentIndex > 0 && (
            <button
              className="absolute left-6 p-3 text-white hover:text-accent transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
          )}

          {/* Image */}
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            src={filteredItems[currentIndex]?.image}
            alt={filteredItems[currentIndex]?.title}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next Button */}
          {currentIndex < filteredItems.length - 1 && (
            <button
              className="absolute right-6 p-3 text-white hover:text-accent transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          )}

          {/* Caption */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <h3 className="text-xl font-display font-semibold text-white mb-2">
              {filteredItems[currentIndex]?.title}
            </h3>
            <p className="text-gray-400">
              {currentIndex + 1} / {filteredItems.length}
            </p>
          </div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
