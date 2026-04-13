import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  UtensilsCrossed, 
  Image, 
  Settings, 
  LogOut,
  Menu,
  Star
} from 'lucide-react';
import { useAuthStore } from '@/stores';
import { authApi } from '@/services/api';
import { toast } from '@/components/ui/Toast';

const menuItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: '仪表盘' },
  { path: '/admin/reservations', icon: Calendar, label: '预订管理' },
  { path: '/admin/menus', icon: UtensilsCrossed, label: '菜单管理' },
  { path: '/admin/gallery', icon: Image, label: '画廊管理' },
  { path: '/admin/settings', icon: Settings, label: '系统设置' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logout, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        navigate('/admin/login');
        return;
      }
      try {
        await authApi.getMe();
      } catch {
        logout();
        navigate('/admin/login');
      }
    };
    checkAuth();
  }, [isAuthenticated, logout, navigate]);

  const handleLogout = () => {
    logout();
    toast.success('已安全退出');
    navigate('/admin/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-primary border-r border-gray-800 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center">
                <span className="text-lg font-display font-bold text-accent">L</span>
              </div>
              <div>
                <h1 className="text-lg font-display font-semibold text-white">
                  L'Imperial
                </h1>
                <p className="text-xs text-gray-500">管理后台</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-accent/10 text-accent border-l-2 border-accent'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 mb-4 px-4">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent font-medium">
                  {admin?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div>
                <p className="text-sm text-white">{admin?.name || '管理员'}</p>
                <p className="text-xs text-gray-500">{admin?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>退出登录</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background-alt/80 backdrop-blur-lg border-b border-gray-800">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              className="lg:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                {[1, 2, 3].map((star) => (
                  <Star key={star} className="w-4 h-4 text-accent fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-400">L'Imperial 管理后台</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
