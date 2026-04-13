import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@/components/ui';
import { toast } from '@/components/ui/Toast';
import { authApi } from '@/services/api';
import { useAuthStore } from '@/stores';
import { Lock, Mail } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('请填写所有字段');
      return;
    }

    setIsLoading(true);
    try {
      const response = await authApi.login(email, password);
      login(response.data.token, response.data.admin);
      toast.success('登录成功！');
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.error || '登录失败');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-background to-primary" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(201, 169, 98, 0.05) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-accent mb-6">
            <span className="text-4xl font-display font-bold text-accent">L</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            L'Imperial
          </h1>
          <p className="text-gray-400">管理后台</p>
        </div>

        {/* Form */}
        <div className="bg-background-alt border border-gray-800 p-8">
          <h2 className="text-2xl font-display font-semibold text-white mb-6 text-center">
            管理员登录
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="email"
                placeholder="管理员邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="password"
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
            >
              登录
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              默认账号: admin@limperial.com
            </p>
            <p className="text-gray-500 text-sm">
              默认密码: Imperial2024!
            </p>
          </div>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-gray-400 hover:text-accent transition-colors text-sm"
          >
            返回网站首页
          </a>
        </div>
      </motion.div>
    </div>
  );
}
