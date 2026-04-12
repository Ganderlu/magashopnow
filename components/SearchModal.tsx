"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Modal } from "@/components/Modal";
import { searchCatalog } from "@/lib/catalog";

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const results = React.useMemo(() => searchCatalog(query), [query]);

  return (
    <Modal open={open} title="Search" onClose={onClose} maxWidthClassName="max-w-[720px]">
      <div className="grid gap-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, collections…"
          className="h-11 w-full rounded-md border border-zinc-200 bg-white px-4 text-[13px] text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200"
          autoFocus
        />

        {query.trim() && results.length === 0 ? (
          <div className="text-[12px] text-zinc-600">No results.</div>
        ) : null}

        {results.length > 0 ? (
          <div className="grid gap-2">
            {results.map((r) => (
              <Link
                key={r.id}
                href={r.href}
                onClick={onClose}
                className="flex items-center gap-3 rounded-md border border-zinc-200 bg-white px-3 py-2 hover:bg-zinc-50"
              >
                {r.imageSrc ? (
                  <div className="relative h-10 w-10 overflow-hidden rounded border border-zinc-200 bg-white">
                    <Image
                      src={r.imageSrc}
                      alt={r.title}
                      fill
                      className="object-contain"
                      sizes="40px"
                    />
                  </div>
                ) : (
                  <div className="grid h-10 w-10 place-items-center rounded border border-zinc-200 bg-white text-[12px] font-extrabold text-zinc-500">
                    →
                  </div>
                )}

                <div className="flex-1 text-[12px] font-semibold text-zinc-800">
                  {r.title}
                </div>
                <div className="text-[12px] text-zinc-400">→</div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </Modal>
  );
}

