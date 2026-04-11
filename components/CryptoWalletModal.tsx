"use client";

import * as React from "react";
import { Modal } from "@/components/Modal";
import { formatUsd } from "@/lib/qfsBundles";

export function CryptoWalletModal({
  open,
  onClose,
  walletAddress,
  networkLabel,
  amountUsd,
  bundleLabel,
}: {
  open: boolean;
  onClose: () => void;
  walletAddress: string;
  networkLabel: string;
  amountUsd: number;
  bundleLabel: string;
}) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!open) setCopied(false);
  }, [open]);

  return (
    <Modal open={open} title="Pay by Crypto Wallet Address" onClose={onClose}>
      <div className="grid gap-4">
        <div className="rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3">
          <div className="text-[11px] font-extrabold text-zinc-900">Order</div>
          <div className="mt-1 text-[11px] text-zinc-700">{bundleLabel}</div>
          <div className="mt-1 text-[12px] font-extrabold text-zinc-900">
            Amount Due: {formatUsd(amountUsd)}
          </div>
        </div>

        <div className="grid gap-2">
          <div className="text-[11px] font-semibold text-zinc-800">
            Network: <span className="font-extrabold">{networkLabel}</span>
          </div>
          <div className="rounded-md border border-zinc-200 bg-white px-3 py-3">
            <div className="text-[10px] font-extrabold tracking-[0.18em] text-zinc-500">
              WALLET ADDRESS
            </div>
            <div className="mt-2 break-all font-mono text-[12px] text-zinc-900">
              {walletAddress}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="h-10 rounded-md border border-zinc-200 bg-white px-4 text-[11px] font-extrabold text-zinc-800"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(walletAddress);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1500);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? "COPIED" : "COPY ADDRESS"}
          </button>

          <button
            type="button"
            className="h-10 rounded-md bg-blue-600 px-4 text-[11px] font-extrabold text-white"
            onClick={onClose}
          >
            I&apos;VE SENT PAYMENT
          </button>
        </div>

        <div className="text-[11px] leading-4 text-zinc-600">
          Send the exact amount to the address above. After payment is confirmed on the
          network, your order will be processed.
        </div>
      </div>
    </Modal>
  );
}

