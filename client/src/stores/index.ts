import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Admin } from '../types';

interface AuthState {
  token: string | null;
  admin: Admin | null;
  isAuthenticated: boolean;
  login: (token: string, admin: Admin) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      admin: null,
      isAuthenticated: false,
      login: (token, admin) => {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('admin', JSON.stringify(admin));
        set({ token, admin, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('admin');
        set({ token: null, admin: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        admin: state.admin,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

interface ReservationState {
  date: Date | null;
  time: string;
  guests: number;
  setDate: (date: Date | null) => void;
  setTime: (time: string) => void;
  setGuests: (guests: number) => void;
  reset: () => void;
}

export const useReservationStore = create<ReservationState>((set) => ({
  date: null,
  time: '',
  guests: 2,
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setGuests: (guests) => set({ guests }),
  reset: () => set({ date: null, time: '', guests: 2 }),
}));

interface UIState {
  isMobileMenuOpen: boolean;
  isReservationModalOpen: boolean;
  isLightboxOpen: boolean;
  lightboxImage: string | null;
  setMobileMenuOpen: (open: boolean) => void;
  setReservationModalOpen: (open: boolean) => void;
  openLightbox: (image: string) => void;
  closeLightbox: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isReservationModalOpen: false,
  isLightboxOpen: false,
  lightboxImage: null,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setReservationModalOpen: (open) => set({ isReservationModalOpen: open }),
  openLightbox: (image) => set({ isLightboxOpen: true, lightboxImage: image }),
  closeLightbox: () => set({ isLightboxOpen: false, lightboxImage: null }),
}));
