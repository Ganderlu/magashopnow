"use client";

import * as React from "react";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Modal } from "@/components/Modal";
import { formatUsd } from "@/lib/qfsBundles";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
);

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-[11px] font-semibold text-zinc-800">{label}</div>
      <div className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-[12px] text-zinc-800">
        {children}
      </div>
    </label>
  );
}

function StripeForm({
  clientSecret,
  amountUsd,
  bundleLabel,
  onClose,
}: {
  clientSecret: string;
  amountUsd: number;
  bundleLabel: string;
  onClose: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = React.useState("");
  const [status, setStatus] = React.useState<
    | { state: "idle" }
    | { state: "submitting" }
    | { state: "success"; paymentIntentId: string }
    | { state: "error"; message: string }
  >({ state: "idle" });

  const disabled = status.state === "submitting" || status.state === "success";

  return (
    <div className="grid gap-4">
      <div className="rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3">
        <div className="text-[11px] font-extrabold text-zinc-900">Order</div>
        <div className="mt-1 text-[11px] text-zinc-700">{bundleLabel}</div>
        <div className="mt-1 text-[12px] font-extrabold text-zinc-900">
          Amount Due: {formatUsd(amountUsd)}
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-blue-600">
        <div className="flex items-center justify-between bg-blue-50 px-3 py-2 text-[11px] font-semibold text-blue-700">
          <div>Credit card</div>
          <div className="flex items-center gap-1 text-[10px] font-extrabold">
            <span className="rounded bg-white px-1 py-0.5 text-blue-700">VISA</span>
            <span className="rounded bg-white px-1 py-0.5 text-blue-700">MC</span>
            <span className="rounded bg-white px-1 py-0.5 text-blue-700">AMEX</span>
          </div>
        </div>

        <div className="grid gap-3 bg-white p-3">
          <Field label="Card number">
            <CardNumberElement
              options={{
                style: {
                  base: {
                    fontSize: "12px",
                    color: "#27272a",
                    "::placeholder": { color: "#a1a1aa" },
                  },
                },
              }}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Expiration date (MM / YY)">
              <CardExpiryElement
                options={{
                  style: {
                    base: {
                      fontSize: "12px",
                      color: "#27272a",
                      "::placeholder": { color: "#a1a1aa" },
                    },
                  },
                }}
              />
            </Field>
            <Field label="Security code">
              <CardCvcElement
                options={{
                  style: {
                    base: {
                      fontSize: "12px",
                      color: "#27272a",
                      "::placeholder": { color: "#a1a1aa" },
                    },
                  },
                }}
              />
            </Field>
          </div>
          <label className="block">
            <div className="mb-2 text-[11px] font-semibold text-zinc-800">
              Name on card
            </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-[12px] text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200"
              placeholder=""
              disabled={disabled}
            />
          </label>
        </div>
      </div>

      {status.state === "error" ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[11px] font-semibold text-red-700">
          {status.message}
        </div>
      ) : null}

      {status.state === "success" ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-semibold text-emerald-700">
          Payment successful. PaymentIntent: {status.paymentIntentId}
        </div>
      ) : null}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          className="h-10 rounded-md border border-zinc-200 bg-white px-4 text-[11px] font-extrabold text-zinc-800"
          onClick={onClose}
          disabled={disabled}
        >
          Cancel
        </button>
        <button
          type="button"
          className="h-10 rounded-md bg-blue-600 px-4 text-[11px] font-extrabold text-white disabled:opacity-60"
          disabled={disabled || !stripe || !elements || !clientSecret}
          onClick={async () => {
            if (!stripe || !elements) return;
            const card = elements.getElement(CardNumberElement);
            if (!card) {
              setStatus({ state: "error", message: "Card input not ready." });
              return;
            }

            setStatus({ state: "submitting" });

            const result = await stripe.confirmCardPayment(clientSecret, {
              payment_method: {
                card,
                billing_details: { name: name || undefined },
              },
            });

            if (result.error) {
              setStatus({
                state: "error",
                message: result.error.message ?? "Payment failed.",
              });
              return;
            }

            if (!result.paymentIntent) {
              setStatus({ state: "error", message: "Payment did not complete." });
              return;
            }

            if (result.paymentIntent.status === "succeeded") {
              setStatus({
                state: "success",
                paymentIntentId: result.paymentIntent.id,
              });
              return;
            }

            setStatus({
              state: "error",
              message: `Payment status: ${result.paymentIntent.status}`,
            });
          }}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

export function StripeCheckoutModal({
  open,
  onClose,
  amountUsd,
  amountCents,
  bundleId,
  bundleLabel,
}: {
  open: boolean;
  onClose: () => void;
  amountUsd: number;
  amountCents: number;
  bundleId: string;
  bundleLabel: string;
}) {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
  const [clientSecretState, setClientSecretState] = React.useState<
    | { state: "idle" }
    | { state: "loading" }
    | { state: "ready"; clientSecret: string }
    | { state: "error"; message: string }
  >({ state: "idle" });

  React.useEffect(() => {
    if (!open) {
      setClientSecretState({ state: "idle" });
      return;
    }

    if (!publishableKey) {
      setClientSecretState({
        state: "error",
        message: "Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
      });
      return;
    }

    let cancelled = false;
    setClientSecretState({ state: "loading" });

    fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        amountCents,
        currency: "usd",
        bundleId,
        bundleLabel,
      }),
    })
      .then(async (res) => {
        const json = (await res.json().catch(() => null)) as
          | { clientSecret?: string; error?: string }
          | null;

        if (!res.ok) {
          throw new Error(json?.error ?? "Unable to initialize payment.");
        }

        if (!json?.clientSecret) throw new Error("Missing clientSecret");
        if (cancelled) return;
        setClientSecretState({ state: "ready", clientSecret: json.clientSecret });
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        const message = e instanceof Error ? e.message : "Unable to initialize payment.";
        setClientSecretState({ state: "error", message });
      });

    return () => {
      cancelled = true;
    };
  }, [open, publishableKey, amountCents, bundleId, bundleLabel]);

  return (
    <Modal open={open} title="Pay by Stripe Checkout" onClose={onClose}>
      {clientSecretState.state === "loading" ? (
        <div className="text-[12px] font-semibold text-zinc-600">
          Initializing secure payment…
        </div>
      ) : null}

      {clientSecretState.state === "error" ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[11px] font-semibold text-red-700">
          {clientSecretState.message}
        </div>
      ) : null}

      {clientSecretState.state === "ready" ? (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: clientSecretState.clientSecret }}
        >
          <StripeForm
            clientSecret={clientSecretState.clientSecret}
            amountUsd={amountUsd}
            bundleLabel={bundleLabel}
            onClose={onClose}
          />
        </Elements>
      ) : null}
    </Modal>
  );
}

