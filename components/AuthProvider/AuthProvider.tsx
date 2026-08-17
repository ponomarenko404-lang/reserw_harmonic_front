"use client";

import { useEffect, ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const logout = useAuthStore((state) => state.logout);
  const fetchCurrentUser = useAuthStore((state) => state.fetchCurrentUser);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      const currentUser = useAuthStore.getState().user;

      if (currentUser?._id) {
        try {
          await fetchCurrentUser();
        } catch {
          if (isMounted) {
            logout();
          }
        }
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, [fetchCurrentUser, logout]);

  return <>{children}</>;
}
