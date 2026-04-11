import { CheckoutScreen } from "@/components/CheckoutScreen";

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: { bundle?: string };
}) {
  return <CheckoutScreen bundleId={searchParams.bundle} />;
}
