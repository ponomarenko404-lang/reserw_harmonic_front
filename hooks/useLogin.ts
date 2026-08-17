"use client";

import { useMutation } from "@tanstack/react-query";

import { loginUser } from "@/lib/api/auth";

export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
  });
}