import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import { menusApi } from '@/services/api';
import { Modal, Button, Input, Textarea, Select } from '@/components/ui';
import { toast } from '@/components/ui/Toast';
import { formatPrice, getCategoryName } from '@/utils';
import type { MenuItem } from '@/types';

const categories = [
  { value: 'entrees', label: '头盘' },
  { value: 'plats', label: '主菜' },
  { value: 'desserts', label: '甜点' },
  { value: 'vins', label: '酒单' },
];

export default function MenusPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    description: '',
    price: '',
    category: 'entrees',
    allergens: '',
    isFeatured: false,
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await menusApi.getAll();
      setMenuItems(response.data);
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        nameEn: item.nameEn || '',
        description: item.description,
        price: String(item.price),
        category: item.category,
        allergens: item.allergens || '',
        isFeatured: item.isFeatured,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        nameEn: '',
        description: '',
        price: '',
        category: 'entrees',
        allergens: '',
        isFeatured: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      name: formData.name,
      nameEn: formData.nameEn || undefined,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category as any,
      allergens: formData.allergens || undefined,
      isFeatured: formData.isFeatured,
      isAvailable: true,
    };

    try {
      if (editingItem) {
        await menusApi.update(editingItem.id, data);
        toast.success('菜品已更新');
      } else {
        await menusApi.create(data);
        toast.success('菜品已添加');
      }
      setIsModalOpen(false);
      fetchMenuItems();
    } catch (error) {
      toast.error('操作失败');
    }
  };

  const handleToggleFeatured = async (id: number) => {
    try {
      await menusApi.toggleFeatured(id);
      toast.success('推荐状态已更新');
      fetchMenuItems();
    } catch (error) {
      toast.error('更新失败');
    }
  };

  const handleToggleAvailability = async (id: number) => {
    try {
      await menusApi.toggleAvailability(id);
      toast.success('上下架状态已更新');
      fetchMenuItems();
    } catch (error) {
      toast.error('更新失败');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这道菜品吗？')) return;
    try {
      await menusApi.delete(id);
      toast.success('菜品已删除');
      fetchMenuItems();
    } catch (error) {
      toast.error('删除失败');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            菜单管理
          </h1>
          <p className="text-gray-400">
            管理餐厅的所有菜品
          </p>
        </div>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          <Plus className="w-4 h-4 mr-2" />
          添加菜品
        </Button>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary border border-gray-800 overflow-hidden"
      >
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          </div>
        ) : menuItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background-alt">
                <tr className="text-left text-gray-400 text-sm">
                  <th className="px-6 py-4 font-medium">菜品</th>
                  <th className="px-6 py-4 font-medium">分类</th>
                  <th className="px-6 py-4 font-medium">价格</th>
                  <th className="px-6 py-4 font-medium">推荐</th>
                  <th className="px-6 py-4 font-medium">状态</th>
                  <th className="px-6 py-4 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.id} className="border-t border-gray-800 hover:bg-white/5">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-white font-medium">{item.name}</div>
                        {item.nameEn && (
                          <div className="text-gray-500 text-sm">{item.nameEn}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {getCategoryName(item.category)}
                    </td>
                    <td className="px-6 py-4 text-accent font-medium">
                      {formatPrice(item.price)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleFeatured(item.id)}
                        className={`p-2 transition-colors ${
                          item.isFeatured ? 'text-accent' : 'text-gray-600 hover:text-accent'
                        }`}
                      >
                        <Star className={`w-5 h-5 ${item.isFeatured ? 'fill-current' : ''}`} />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleAvailability(item.id)}
                        className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                          item.isAvailable
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                        }`}
                      >
                        {item.isAvailable ? '在售' : '已下架'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="p-2 text-gray-400 hover:text-accent transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500">暂无菜品</p>
          </div>
        )}
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? '编辑菜品' : '添加菜品'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="菜品名称 (中文)"
              placeholder="请输入菜品名称"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="菜品名称 (英文)"
              placeholder="请输入英文名称"
              value={formData.nameEn}
              onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
            />
          </div>

          <Textarea
            label="菜品描述"
            placeholder="请输入菜品描述"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="价格 (€)"
              type="number"
              placeholder="请输入价格"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
            <Select
              label="分类"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={categories}
            />
          </div>

          <Input
            label="过敏原信息"
            placeholder="例如：含有乳制品、麸质"
            value={formData.allergens}
            onChange={(e) => setFormData({ ...formData, allergens: e.target.value })}
          />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-5 h-5 rounded border-gray-600 bg-transparent text-accent focus:ring-accent"
            />
            <label htmlFor="featured" className="text-gray-300">
              设为主厨推荐
            </label>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
            <Button type="submit" variant="primary">
              {editingItem ? '保存修改' : '添加菜品'}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              取消
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
