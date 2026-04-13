import { CheckoutScreen } from "@/components/CheckoutScreen";

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: { bundle?: string; from?: string };
}) {
  return <CheckoutScreen bundleId={searchParams.bundle} from={searchParams.from} />;
}
