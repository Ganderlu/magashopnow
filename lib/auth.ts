export type AuthUser = {
  email: string;
};

const STORAGE_KEY = "oms_auth_v1";

export function readAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { email?: unknown } | null;
    const email = typeof parsed?.email === "string" ? parsed.email : "";
    if (!email) return null;
    return { email };
  } catch {
    return null;
  }
}

export function writeAuthUser(user: AuthUser | null) {
  if (typeof window === "undefined") return;
  if (!user) {
    window.localStorage.removeItem(STORAGE_KEY);
  } else {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
  window.dispatchEvent(new Event("oms_auth_updated"));
}

