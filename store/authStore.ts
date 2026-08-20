// store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user";
import { getUserById } from "@/lib/api/users";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;

  setUser: (user: User | { user: User } | null) => void;
  setLoggedIn: (isLoggedIn: boolean) => void;
  fetchCurrentUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,

      setUser: (userData) => {
        const cleanUser =
          userData && "user" in userData ? userData.user : userData;

        set({
          user: cleanUser,
          isLoggedIn: Boolean(cleanUser),
          error: null,
        });
      },

      setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

      fetchCurrentUser: async () => {
        const currentUser = get().user;

        if (!currentUser?._id) {
          return;
        }

        set({
          isLoading: true,
          error: null,
        });

        try {
          const freshUserData = await getUserById(currentUser._id);

          const cleanUser =
            freshUserData && "user" in freshUserData
              ? freshUserData.user
              : freshUserData;

          if (cleanUser) {
            set({
              user: cleanUser,
              isLoggedIn: true,
              error: null,
            });
          }
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Failed to fetch user";

          set({
            error: errorMessage,
          });
        } finally {
          set({
            isLoading: false,
          });
        }
      },

      logout: () => {
        set({
          user: null,
          isLoggedIn: false,
          error: null,
        });
      },
    }),
    {
      name: "auth-storage",

      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
);
