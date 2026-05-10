import { create } from "zustand";
import type { User } from "../types";

interface AuthStore {
  token: string | null;
  user: User | null;
  language: "ru" | "en";
  setAuth: (token: string, user: User) => void;
  setUser: (user: User) => void;
  setLanguage: (lang: "ru" | "en") => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  user: null,
  language: "ru",
  setAuth: (token, user) => set({ token, user }),
  setUser: (user) => set({ user }),
  setLanguage: (language) => set({ language }),
  logout: () => set({ token: null, user: null }),
}));
