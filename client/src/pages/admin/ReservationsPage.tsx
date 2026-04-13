import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Eye, Trash2 } from 'lucide-react';
import { reservationsApi } from '@/services/api';
import { Modal, Button } from '@/components/ui';
import { toast } from '@/components/ui/Toast';
import { formatDate, getStatusName, getStatusColor } from '@/utils';
import type { Reservation } from '@/types';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await reservationsApi.getAll();
      setReservations(response.data.reservations);
    } catch (error) {
      console.error('Failed to fetch reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await reservationsApi.update(id, { status });
      toast.success('状态已更新');
      fetchReservations();
      setIsModalOpen(false);
    } catch (error) {
      toast.error('更新失败');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这条预订吗？')) return;
    try {
      await reservationsApi.delete(id);
      toast.success('预订已删除');
      fetchReservations();
    } catch (error) {
      toast.error('删除失败');
    }
  };

  const filteredReservations = reservations.filter((r) =>
    filter === 'all' ? true : r.status === filter
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            预订管理
          </h1>
          <p className="text-gray-400">
            管理餐厅的所有预订
          </p>
        </div>
        
        {/* Filter */}
        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-primary border border-gray-700 text-white px-4 py-2 rounded-lg"
          >
            <option value="all">全部状态</option>
            <option value="pending">待确认</option>
            <option value="confirmed">已确认</option>
            <option value="completed">已完成</option>
            <option value="cancelled">已取消</option>
          </select>
        </div>
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
        ) : filteredReservations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background-alt">
                <tr className="text-left text-gray-400 text-sm">
                  <th className="px-6 py-4 font-medium">日期</th>
                  <th className="px-6 py-4 font-medium">时间</th>
                  <th className="px-6 py-4 font-medium">姓名</th>
                  <th className="px-6 py-4 font-medium">人数</th>
                  <th className="px-6 py-4 font-medium">联系方式</th>
                  <th className="px-6 py-4 font-medium">状态</th>
                  <th className="px-6 py-4 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="border-t border-gray-800 hover:bg-white/5">
                    <td className="px-6 py-4 text-white">
                      {formatDate(reservation.date)}
                    </td>
                    <td className="px-6 py-4 text-white">
                      {reservation.time}
                    </td>
                    <td className="px-6 py-4 text-white">
                      {reservation.name}
                    </td>
                    <td className="px-6 py-4 text-white">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        {reservation.guests} 位
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white text-sm">{reservation.email}</div>
                      <div className="text-gray-500 text-xs">{reservation.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 text-xs rounded-full border ${getStatusColor(reservation.status)}`}>
                        {getStatusName(reservation.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedReservation(reservation);
                            setIsModalOpen(true);
                          }}
                          className="p-2 text-gray-400 hover:text-accent transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(reservation.id)}
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
            <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">暂无预订记录</p>
          </div>
        )}
      </motion.div>

      {/* Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="预订详情"
        size="md"
      >
        {selectedReservation && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-500 text-sm">预订日期</label>
                <p className="text-white">{formatDate(selectedReservation.date)}</p>
              </div>
              <div>
                <label className="text-gray-500 text-sm">预订时间</label>
                <p className="text-white">{selectedReservation.time}</p>
              </div>
              <div>
                <label className="text-gray-500 text-sm">用餐人数</label>
                <p className="text-white">{selectedReservation.guests} 位</p>
              </div>
              <div>
                <label className="text-gray-500 text-sm">当前状态</label>
                <span className={`inline-block px-3 py-1 text-xs rounded-full border ${getStatusColor(selectedReservation.status)}`}>
                  {getStatusName(selectedReservation.status)}
                </span>
              </div>
            </div>

            <div>
              <label className="text-gray-500 text-sm">客人姓名</label>
              <p className="text-white">{selectedReservation.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-500 text-sm">邮箱</label>
                <p className="text-white">{selectedReservation.email}</p>
              </div>
              <div>
                <label className="text-gray-500 text-sm">电话</label>
                <p className="text-white">{selectedReservation.phone}</p>
              </div>
            </div>

            {selectedReservation.occasion && (
              <div>
                <label className="text-gray-500 text-sm">特殊场合</label>
                <p className="text-white">{selectedReservation.occasion}</p>
              </div>
            )}

            {selectedReservation.notes && (
              <div>
                <label className="text-gray-500 text-sm">备注</label>
                <p className="text-white">{selectedReservation.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
              {selectedReservation.status === 'pending' && (
                <>
                  <Button
                    variant="primary"
                    onClick={() => handleUpdateStatus(selectedReservation.id, 'confirmed')}
                  >
                    确认预订
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleUpdateStatus(selectedReservation.id, 'cancelled')}
                  >
                    取消预订
                  </Button>
                </>
              )}
              {selectedReservation.status === 'confirmed' && (
                <Button
                  variant="primary"
                  onClick={() => handleUpdateStatus(selectedReservation.id, 'completed')}
                >
                  标记已完成
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
