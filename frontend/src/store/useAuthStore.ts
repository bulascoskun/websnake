import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  first_name: string;
  last_name: string;
  email: string;
  token: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updatedFields: object) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),

      updateUser: (updatedFields: object) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedFields } : state.user,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);
