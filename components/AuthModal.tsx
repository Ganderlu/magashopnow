"use client";

import * as React from "react";
import { Modal } from "@/components/Modal";
import { useAuth } from "@/components/AuthProvider";

export function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { user, signIn, signOut } = useAuth();
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if (!open) setEmail("");
  }, [open]);

  return (
    <Modal open={open} title={user ? "Account" : "Sign in"} onClose={onClose}>
      {user ? (
        <div className="grid gap-4">
          <div className="rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-[12px] text-zinc-700">
            Signed in as <span className="font-extrabold">{user.email}</span>
          </div>
          <button
            type="button"
            className="h-10 rounded-md bg-black px-4 text-[12px] font-extrabold text-white"
            onClick={() => {
              signOut();
              onClose();
            }}
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          <div className="text-[12px] text-zinc-600">Sign in to continue.</div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="h-11 w-full rounded-md border border-zinc-200 bg-white px-4 text-[13px] text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200"
            autoFocus
          />
          <button
            type="button"
            className="h-11 rounded-md bg-[#6c0d0d] px-4 text-[12px] font-extrabold text-white disabled:opacity-60"
            disabled={!email.trim()}
            onClick={() => {
              signIn(email);
              onClose();
            }}
          >
            Sign in
          </button>
        </div>
      )}
    </Modal>
  );
}

