import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from './components/ui/Toast';
import { LoadingScreen } from './components/ui/Spinner';
import { useState, useEffect } from 'react';

// Public Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import ReservationsPage from './pages/admin/ReservationsPage';
import MenusPage from './pages/admin/MenusPage';
import GalleryAdminPage from './pages/admin/GalleryAdminPage';
import SettingsPage from './pages/admin/SettingsPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="reservations" element={<ReservationsPage />} />
          <Route path="menus" element={<MenusPage />} />
          <Route path="gallery" element={<GalleryAdminPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={
          <div className="min-h-screen bg-primary flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-display font-bold text-accent mb-4">404</h1>
              <p className="text-2xl text-white mb-8">页面未找到</p>
              <a href="/" className="text-accent hover:underline">
                返回首页
              </a>
            </div>
          </div>
        } />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
