import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { reservationsApi } from '@/services/api';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await reservationsApi.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      title: '今日预订',
      value: stats?.todayCount || 0,
      icon: Calendar,
      change: '+12%',
      positive: true,
    },
    {
      title: '今日客人',
      value: stats?.todayGuests || 0,
      icon: Users,
      change: '+8%',
      positive: true,
    },
    {
      title: '本周趋势',
      value: stats?.weekTrend?.length || 0,
      icon: TrendingUp,
      change: '-5%',
      positive: false,
    },
    {
      title: '待确认',
      value: stats?.todayReservations?.filter((r: any) => r.status === 'pending').length || 0,
      icon: Clock,
      change: null,
      positive: null,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          仪表盘
        </h1>
        <p className="text-gray-400">
          欢迎回来，查看您的餐厅运营概况
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-primary border border-gray-800 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-accent" />
              </div>
              {stat.change && (
                <div className={`flex items-center gap-1 text-sm ${
                  stat.positive ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.positive ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              )}
            </div>
            <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
            <p className="text-3xl font-display font-bold text-white">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Today's Reservations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-primary border border-gray-800 p-6"
      >
        <h2 className="text-xl font-display font-semibold text-white mb-6">
          今日预订
        </h2>
        
        {stats?.todayReservations?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm border-b border-gray-800">
                  <th className="pb-4">时间</th>
                  <th className="pb-4">姓名</th>
                  <th className="pb-4">人数</th>
                  <th className="pb-4">状态</th>
                  <th className="pb-4">备注</th>
                </tr>
              </thead>
              <tbody>
                {stats.todayReservations.map((reservation: any) => (
                  <tr key={reservation.id} className="border-b border-gray-800/50">
                    <td className="py-4 text-white">{reservation.time}</td>
                    <td className="py-4 text-white">{reservation.name}</td>
                    <td className="py-4 text-white">{reservation.guests} 位</td>
                    <td className="py-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded ${
                        reservation.status === 'confirmed'
                          ? 'bg-green-500/20 text-green-400'
                          : reservation.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {reservation.status === 'confirmed' ? '已确认' : reservation.status === 'pending' ? '待确认' : '已完成'}
                      </span>
                    </td>
                    <td className="py-4 text-gray-400 text-sm">
                      {reservation.notes || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">今日暂无预订</p>
          </div>
        )}
      </motion.div>

      {/* Week Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-primary border border-gray-800 p-6"
      >
        <h2 className="text-xl font-display font-semibold text-white mb-6">
          本周趋势
        </h2>
        
        <div className="flex items-end gap-2 h-32">
          {stats?.weekTrend?.map((day: any, index: number) => {
            const maxGuests = Math.max(...(stats?.weekTrend?.map((d: any) => d.guests) || [1]));
            const height = (day.guests / maxGuests) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-accent/20 hover:bg-accent/40 transition-colors rounded-t"
                  style={{ height: `${Math.max(height, 5)}%` }}
                />
                <span className="text-xs text-gray-500">
                  {new Date(day.date).toLocaleDateString('zh-CN', { weekday: 'short' })}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
