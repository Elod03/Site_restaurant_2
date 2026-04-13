import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Calendar, Clock, Users, MessageSquare } from 'lucide-react';
import { useReservationStore, useUIStore } from '@/stores';
import { Button, Input, Select } from '../ui';
import { reservationsApi } from '@/services/api';
import { toast } from '../ui/Toast';
import { generateTimeSlots } from '@/utils';
import 'react-datepicker/dist/react-datepicker.css';

export default function ReservationForm() {
  const { setReservationModalOpen } = useUIStore();
  const { date, time, guests, setDate, setTime, setGuests } = useReservationStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    occasion: '',
    notes: '',
  });

  const occasions = [
    { value: '', label: '选择场合 (可选)' },
    { value: 'birthday', label: '生日庆祝' },
    { value: 'anniversary', label: '周年纪念' },
    { value: 'business', label: '商务宴请' },
    { value: 'date', label: '浪漫约会' },
    { value: 'other', label: '其他' },
  ];

  const lunchSlots = generateTimeSlots('12:00', '14:00');
  const dinnerSlots = generateTimeSlots('19:00', '21:30');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !formData.name || !formData.email || !formData.phone) {
      toast.error('请填写所有必填项');
      return;
    }

    setIsSubmitting(true);
    try {
      await reservationsApi.create({
        date: date.toISOString(),
        time,
        guests,
        ...formData,
      });
      toast.success('预订成功！我们将尽快与您联系确认');
      setReservationModalOpen(false);
      setDate(null);
      setTime('');
      setGuests(2);
      setFormData({ name: '', email: '', phone: '', occasion: '', notes: '' });
    } catch (error: any) {
      toast.error(error.response?.data?.error || '预订失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const guestOptions = Array.from({ length: 20 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1} 位`,
  }));

  return (
    <div className="max-h-[85vh] overflow-y-auto p-6 lg:p-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-display font-semibold text-white mb-2">
          在线预订
        </h3>
        <p className="text-gray-400">
          预订您的专属美食体验
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date & Time Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <Calendar className="w-4 h-4 text-accent" />
              预订日期
            </label>
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              minDate={new Date()}
              maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)}
              excludeDates={[
                new Date('2024-01-01'),
                new Date('2024-01-02'),
              ]}
              className="w-full bg-transparent border-b-2 border-gray-600 px-4 py-3 text-white focus:border-accent focus:outline-none transition-colors"
              dateFormat="yyyy年MM月dd日"
              placeholderText="选择日期"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <Clock className="w-4 h-4 text-accent" />
              预订时间
            </label>
            <Select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              options={[
                { value: '', label: '选择时间' },
                ...(date ? [
                  { value: 'lunch', label: '—— 午餐时段 ——' },
                  ...lunchSlots.map((t) => ({ value: `lunch-${t}`, label: t })),
                  { value: 'dinner', label: '—— 晚餐时段 ——' },
                  ...dinnerSlots.map((t) => ({ value: `dinner-${t}`, label: t })),
                ] : [{ value: '', label: '请先选择日期' }]),
              ]}
            />
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
            <Users className="w-4 h-4 text-accent" />
            用餐人数
          </label>
          <Select
            value={String(guests)}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            options={guestOptions}
          />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="您的姓名"
            placeholder="请输入姓名"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="联系电话"
            type="tel"
            placeholder="请输入电话"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>

        <Input
          label="电子邮箱"
          type="email"
          placeholder="请输入邮箱"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <Select
          label="特殊场合"
          value={formData.occasion}
          onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
          options={occasions}
        />

        <div>
          <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
            <MessageSquare className="w-4 h-4 text-accent" />
            特殊要求
          </label>
          <textarea
            placeholder="如有食物过敏、座位偏好或其他要求，请在此说明..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            className="w-full bg-transparent border-b-2 border-gray-600 px-4 py-3 text-white placeholder-gray-500 focus:border-accent focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Info */}
        <div className="bg-background-alt/50 border border-gray-800 rounded-lg p-4 space-y-2">
          <p className="text-sm text-gray-400">
            <strong className="text-white">午餐:</strong> 12:00 - 14:30 (最后点单 14:00)
          </p>
          <p className="text-sm text-gray-400">
            <strong className="text-white">晚餐:</strong> 19:00 - 22:30 (最后点单 21:30)
          </p>
          <p className="text-sm text-red-400">
            * 周一、周二休息
          </p>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isSubmitting}
        >
          确认预订
        </Button>

        <p className="text-center text-sm text-gray-500">
          预订成功后，我们将在24小时内通过邮件或电话与您确认
        </p>
      </form>
    </div>
  );
}
