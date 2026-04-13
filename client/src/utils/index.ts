import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(time: string): string {
  return time;
}

export function formatPrice(price: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(price);
}

export function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    entrees: '头盘',
    plats: '主菜',
    desserts: '甜点',
    vins: '酒单',
    interior: '餐厅环境',
    exterior: '户外区域',
    food: '美食',
    team: '团队',
    other: '其他',
  };
  return names[category] || category;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
    completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return colors[status] || colors.pending;
}

export function getStatusName(status: string): string {
  const names: Record<string, string> = {
    pending: '待确认',
    confirmed: '已确认',
    completed: '已完成',
    cancelled: '已取消',
  };
  return names[status] || status;
}

export function generateTimeSlots(
  start: string,
  end: string,
  interval: number = 30
): string[] {
  const slots: string[] = [];
  const [startHour, startMin] = start.split(':').map(Number);
  const [endHour, endMin] = end.split(':').map(Number);

  let currentHour = startHour;
  let currentMin = startMin;

  while (
    currentHour < endHour ||
    (currentHour === endHour && currentMin <= endMin)
  ) {
    slots.push(
      `${currentHour.toString().padStart(2, '0')}:${currentMin
        .toString()
        .padStart(2, '0')}`
    );
    currentMin += interval;
    if (currentMin >= 60) {
      currentHour += Math.floor(currentMin / 60);
      currentMin = currentMin % 60;
    }
  }

  return slots;
}

export function isRestaurantOpen(): boolean {
  const today = new Date().getDay();
  // Closed on Monday (1) and Tuesday (2)
  return today !== 1 && today !== 2;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}
