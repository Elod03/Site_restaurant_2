export interface Admin {
  id: number;
  email: string;
  name: string | null;
}

export interface Reservation {
  id: number;
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  occasion?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  id: number;
  name: string;
  nameEn?: string;
  description: string;
  price: number;
  category: 'entrees' | 'plats' | 'desserts' | 'vins';
  image?: string;
  isFeatured: boolean;
  isAvailable: boolean;
  allergens?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
  category: 'interior' | 'exterior' | 'food' | 'team' | 'other';
  order: number;
  createdAt: string;
}

export interface Settings {
  restaurant_name: string;
  restaurant_name_cn: string;
  address: string;
  phone: string;
  email: string;
  lunch_start: string;
  lunch_end: string;
  dinner_start: string;
  dinner_end: string;
  closed_days: string;
  michelin_stars: string;
  about_text: string;
  hero_title: string;
  hero_subtitle: string;
}

export interface ReservationFormData {
  date: Date;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  occasion?: string;
  notes?: string;
}

export interface AuthResponse {
  token: string;
  admin: Admin;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
