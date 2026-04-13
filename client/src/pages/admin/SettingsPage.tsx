import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { settingsApi } from '@/services/api';
import { Button, Input, Textarea } from '@/components/ui';
import { toast } from '@/components/ui/Toast';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsApi.getAll();
      setSettings(response.data);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await settingsApi.bulkUpdate(settings);
      toast.success('设置已保存');
    } catch (error) {
      toast.error('保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            系统设置
          </h1>
          <p className="text-gray-400">
            配置餐厅的基本信息和营业时间
          </p>
        </div>
        <Button variant="primary" onClick={handleSave} isLoading={saving}>
          <Save className="w-4 h-4 mr-2" />
          保存设置
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary border border-gray-800 p-6"
        >
          <h2 className="text-xl font-display font-semibold text-white mb-6">
            基本信息
          </h2>
          <div className="space-y-6">
            <Input
              label="餐厅名称 (英文)"
              value={settings.restaurant_name || ''}
              onChange={(e) => handleChange('restaurant_name', e.target.value)}
            />
            <Input
              label="餐厅名称 (中文)"
              value={settings.restaurant_name_cn || ''}
              onChange={(e) => handleChange('restaurant_name_cn', e.target.value)}
            />
            <Textarea
              label="关于餐厅"
              rows={4}
              value={settings.about_text || ''}
              onChange={(e) => handleChange('about_text', e.target.value)}
            />
            <Input
              label="Hero 标题"
              value={settings.hero_title || ''}
              onChange={(e) => handleChange('hero_title', e.target.value)}
            />
            <Input
              label="Hero 副标题"
              value={settings.hero_subtitle || ''}
              onChange={(e) => handleChange('hero_subtitle', e.target.value)}
            />
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-primary border border-gray-800 p-6"
        >
          <h2 className="text-xl font-display font-semibold text-white mb-6">
            联系信息
          </h2>
          <div className="space-y-6">
            <Textarea
              label="餐厅地址"
              rows={2}
              value={settings.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
            />
            <Input
              label="联系电话"
              value={settings.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
            <Input
              label="电子邮箱"
              value={settings.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
        </motion.div>

        {/* Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-primary border border-gray-800 p-6"
        >
          <h2 className="text-xl font-display font-semibold text-white mb-6">
            营业时间
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="午餐开始时间"
                placeholder="12:00"
                value={settings.lunch_start || ''}
                onChange={(e) => handleChange('lunch_start', e.target.value)}
              />
              <Input
                label="午餐结束时间"
                placeholder="14:30"
                value={settings.lunch_end || ''}
                onChange={(e) => handleChange('lunch_end', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="晚餐开始时间"
                placeholder="19:00"
                value={settings.dinner_start || ''}
                onChange={(e) => handleChange('dinner_start', e.target.value)}
              />
              <Input
                label="晚餐结束时间"
                placeholder="22:30"
                value={settings.dinner_end || ''}
                onChange={(e) => handleChange('dinner_end', e.target.value)}
              />
            </div>
            <Input
              label="休息日"
              placeholder="周一, 周二"
              value={settings.closed_days || ''}
              onChange={(e) => handleChange('closed_days', e.target.value)}
            />
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-primary border border-gray-800 p-6"
        >
          <h2 className="text-xl font-display font-semibold text-white mb-6">
            荣誉认证
          </h2>
          <div className="space-y-6">
            <Input
              label="米其林星级"
              type="number"
              min="1"
              max="3"
              value={settings.michelin_stars || ''}
              onChange={(e) => handleChange('michelin_stars', e.target.value)}
            />
            <div className="p-6 bg-accent/10 border border-accent/30 rounded-lg text-center">
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3].map((star) => (
                  <span
                    key={star}
                    className={`text-4xl ${star <= parseInt(settings.michelin_stars || '0') ? 'text-accent' : 'text-gray-600'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                {settings.michelin_stars || '0'} 星米其林餐厅
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
