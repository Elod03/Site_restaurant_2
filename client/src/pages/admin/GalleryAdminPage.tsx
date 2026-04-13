import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Upload } from 'lucide-react';
import { galleryApi } from '@/services/api';
import { Modal, Button, Input, Select } from '@/components/ui';
import { toast } from '@/components/ui/Toast';
import { getCategoryName } from '@/utils';
import type { GalleryItem } from '@/types';

const categories = [
  { value: 'interior', label: '餐厅环境' },
  { value: 'exterior', label: '户外区域' },
  { value: 'food', label: '美食' },
  { value: 'team', label: '团队' },
  { value: 'other', label: '其他' },
];

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'interior',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !formData.title) {
      toast.error('请填写所有必填项');
      return;
    }

    setUploading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('image', selectedFile);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);

      await galleryApi.upload(formDataToSend);
      toast.success('图片上传成功');
      setIsModalOpen(false);
      setFormData({ title: '', category: 'interior' });
      setSelectedFile(null);
      setPreviewUrl(null);
      fetchGallery();
    } catch (error) {
      toast.error('上传失败');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这张图片吗？')) return;
    try {
      await galleryApi.delete(id);
      toast.success('图片已删除');
      fetchGallery();
    } catch (error) {
      toast.error('删除失败');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            画廊管理
          </h1>
          <p className="text-gray-400">
            管理网站画廊中的图片
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          上传图片
        </Button>
      </div>

      {/* Gallery Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {loading ? (
          <div className="col-span-full flex items-center justify-center h-64">
            <div className="w-12 h-12 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          </div>
        ) : items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group bg-primary border border-gray-800 overflow-hidden"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <button
                onClick={() => handleDelete(item.id)}
                className="p-3 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-white font-medium mb-1">{item.title}</h3>
              <span className="text-xs text-accent">{getCategoryName(item.category)}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {items.length === 0 && !loading && (
        <div className="text-center py-16">
          <p className="text-gray-500">暂无图片，点击上方按钮上传</p>
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFile(null);
          setPreviewUrl(null);
        }}
        title="上传图片"
        size="md"
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Preview */}
          {previewUrl ? (
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="block aspect-video border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-accent transition-colors">
              <div className="flex flex-col items-center justify-center h-full">
                <Upload className="w-12 h-12 text-gray-500 mb-4" />
                <p className="text-gray-400">点击选择图片</p>
                <p className="text-gray-600 text-sm mt-2">支持 jpg, png, webp 格式</p>
              </div>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}

          <Input
            label="图片标题"
            placeholder="请输入图片标题"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <Select
            label="分类"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={categories}
          />

          <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
            <Button type="submit" variant="primary" isLoading={uploading}>
              上传
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
            >
              取消
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
