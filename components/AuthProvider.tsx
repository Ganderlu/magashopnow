"use client";

import * as React from "react";
import { AuthUser, readAuthUser, writeAuthUser } from "@/lib/auth";

type AuthApi = {
  user: AuthUser | null;
  signIn: (email: string) => void;
  signOut: () => void;
};

const AuthContext = React.createContext<AuthApi | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);

  React.useEffect(() => {
    setUser(readAuthUser());
    const onUpdate = () => setUser(readAuthUser());
    window.addEventListener("storage", onUpdate);
    window.addEventListener("oms_auth_updated", onUpdate);
    return () => {
      window.removeEventListener("storage", onUpdate);
      window.removeEventListener("oms_auth_updated", onUpdate);
    };
  }, []);

  const signIn = React.useCallback((email: string) => {
    const clean = String(email).trim().toLowerCase();
    if (!clean) return;
    const next: AuthUser = { email: clean };
    setUser(next);
    writeAuthUser(next);
  }, []);

  const signOut = React.useCallback(() => {
    setUser(null);
    writeAuthUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = React.useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within AuthProvider");
  return value;
}

