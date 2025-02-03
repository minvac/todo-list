"use client";

import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/context/UserContext";

export const AuthProvider = ({ children }) => {
  return (
    <SessionProvider>
      <UserProvider>{children}</UserProvider>
    </SessionProvider>
  );
};
