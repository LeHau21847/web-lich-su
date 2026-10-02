import { create } from 'zustand';

type Role = 'guest' | 'student' | 'admin';

interface AuthState {
  role: Role;
  username: string | null;
  login: (username: string, role: Role) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: 'guest',
  username: null,
  login: (username, role) => set({ username, role }),
  logout: () => set({ username: null, role: 'guest' }),
}));
