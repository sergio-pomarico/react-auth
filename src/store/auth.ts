import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  isAuth: boolean;
  token?: string | null;
  refresh?: string | null;
  login: (token: string, refresh?: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuth: false,
      token: null,
      refresh: null,
      login: (token, refreshToken) =>
        set({ isAuth: true, token, refresh: refreshToken }),
      logout: () => set({ isAuth: false, token: null, refresh: null }),
    }),
    {
      name: "authentication",
    }
  )
);
