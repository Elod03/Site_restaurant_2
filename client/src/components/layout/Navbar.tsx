import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useUIStore } from '@/stores';
import Button from '../ui/Button';
import { cn } from '@/utils';

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/menu', label: '菜单' },
  { href: '/about', label: '关于我们' },
  { href: '/gallery', label: '画廊' },
  { href: '/contact', label: '联系我们' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, setMobileMenuOpen]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-primary/95 backdrop-blur-lg shadow-lg py-4'
            : 'bg-transparent py-6'
        )}
      >
        <div className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-accent flex items-center justify-center group-hover:shadow-gold transition-shadow duration-300">
                <span className="text-xl font-display font-bold text-accent">L</span>
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-display font-semibold text-white tracking-wide">
                L'Imperial
              </h1>
              <p className="text-[10px] text-accent tracking-[0.3em] uppercase">
                Michelin 3 Stars
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'relative font-sans text-sm tracking-wider uppercase transition-colors duration-300',
                  location.pathname === link.href
                    ? 'text-accent'
                    : 'text-white hover:text-accent'
                )}
              >
                {link.label}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                管理
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={() => useUIStore.getState().setReservationModalOpen(true)}
            >
              在线预订
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white hover:text-accent transition-colors"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-primary lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      'text-3xl font-display transition-colors duration-300',
                      location.pathname === link.href
                        ? 'text-accent'
                        : 'text-white hover:text-accent'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Button
                  variant="primary"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    useUIStore.getState().setReservationModalOpen(true);
                  }}
                >
                  在线预订
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
