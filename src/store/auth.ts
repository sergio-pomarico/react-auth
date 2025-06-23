import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  isAuth: boolean;
  token?: string | null;
  login: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuth: false,
      token: null,
      login: (token) => set({ isAuth: true, token }),
      logout: () => set({ isAuth: false, token: null }),
    }),
    {
      name: "authentication",
    }
  )
);
