"use client";

import * as React from "react";

export function Modal({
  open,
  title,
  children,
  onClose,
  maxWidthClassName = "max-w-[560px]",
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  maxWidthClassName?: string;
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/55"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div className="relative mx-auto flex min-h-full max-w-[980px] items-center justify-center px-4 py-8">
        <div
          className={[
            "w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_30px_90px_rgba(0,0,0,0.30)]",
            maxWidthClassName,
          ].join(" ")}
        >
          <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
            <div className="text-[13px] font-extrabold text-zinc-900">{title}</div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-md border border-zinc-200 text-[14px] font-bold text-zinc-700 hover:bg-zinc-50"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="px-5 py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

