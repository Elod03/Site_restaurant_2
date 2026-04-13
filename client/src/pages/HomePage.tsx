import { useState, useEffect } from 'react';
import { Navbar, Footer } from '@/components/layout';
import { Hero, AboutSection, ExperienceSection, MenuSection, LocationSection } from '@/components/sections';
import { Modal } from '@/components/ui';
import ReservationForm from '@/components/sections/ReservationForm';
import { useUIStore } from '@/stores';
import { menusApi } from '@/services/api';
import type { MenuItem } from '@/types';

export default function HomePage() {
  const { isReservationModalOpen, setReservationModalOpen } = useUIStore();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await menusApi.getAll({ available: true });
        setMenuItems(response.data);
        setFeaturedItems(response.data.filter((item: MenuItem) => item.isFeatured));
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <AboutSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Featured Menu */}
      <MenuSection items={featuredItems.length > 0 ? featuredItems : menuItems.slice(0, 8)} />

      {/* Michelin & Awards */}
      <section className="py-24 bg-gradient-to-b from-primary to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #C9A962 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="container-luxury relative">
          <div className="text-center">
            <div className="flex justify-center gap-4 mb-8">
              {[1, 2, 3].map((star) => (
                <svg
                  key={star}
                  className="w-16 h-16 text-accent fill-current animate-pulse"
                  viewBox="0 0 24 24"
                  style={{ animationDelay: `${star * 0.2}s` }}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4">
              米其林三星
            </h2>
            <p className="text-xl text-accent tracking-[0.3em] uppercase mb-8">
              三星荣誉 · 卓越品质
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              自1952年开业以来，L'Imperial 始终保持米其林三星评级，
              这是美食界的最高荣誉，代表着环境、服务和料理的完美结合。
            </p>
          </div>
        </div>
      </section>

      {/* Location */}
      <LocationSection />

      <Footer />

      {/* Reservation Modal */}
      <Modal
        isOpen={isReservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
        size="lg"
      >
        <ReservationForm />
      </Modal>
    </div>
  );
}
