import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-gray-800">
      {/* Main Footer */}
      <div className="container-luxury py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full border-2 border-accent flex items-center justify-center">
                <span className="text-xl font-display font-bold text-accent">L</span>
              </div>
              <div>
                <h2 className="text-xl font-display font-semibold text-white">
                  L'Imperial
                </h2>
                <p className="text-[10px] text-accent tracking-[0.3em] uppercase">
                  Michelin 3 Stars
                </p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              自1952年以来，L'Imperial 一直是巴黎美食的象征。我们始终坚持选用最优质的食材，为宾客呈现极致的法式料理体验。
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-semibold text-white mb-6">
              快速链接
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: '首页' },
                { href: '/menu', label: '菜单' },
                { href: '/about', label: '关于我们' },
                { href: '/gallery', label: '画廊' },
                { href: '/contact', label: '联系我们' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-display font-semibold text-white mb-6">
              联系信息
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  15 Avenue Montaigne<br />
                  75008 Paris, France
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="tel:+33142890000"
                  className="text-gray-400 hover:text-accent transition-colors text-sm"
                >
                  +33 1 42 89 00 00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="mailto:contact@limperial-paris.com"
                  className="text-gray-400 hover:text-accent transition-colors text-sm"
                >
                  contact@limperial-paris.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-display font-semibold text-white mb-6">
              营业时间
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <p className="text-white">午餐: 12:00 - 14:30</p>
                  <p className="text-white">晚餐: 19:00 - 22:30</p>
                </div>
              </li>
              <li className="mt-4">
                <div className="text-gray-400 text-sm">
                  <p className="text-red-400">周一、周二 休息</p>
                </div>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-2">
              {[1, 2, 3].map((star) => (
                <svg
                  key={star}
                  className="w-6 h-6 text-accent fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-accent font-medium">
                米其林三星
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-luxury py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 L'Imperial. 保留所有权利。
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/admin"
              className="text-gray-500 hover:text-accent text-sm transition-colors"
            >
              管理后台
            </Link>
            <span className="text-gray-600">|</span>
            <a
              href="#"
              className="text-gray-500 hover:text-accent text-sm transition-colors"
            >
              隐私政策
            </a>
            <span className="text-gray-600">|</span>
            <a
              href="#"
              className="text-gray-500 hover:text-accent text-sm transition-colors"
            >
              使用条款
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
