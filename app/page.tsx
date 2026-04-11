import { DealBanner } from "@/components/DealBanner";
import { GoldenAgeSection } from "@/components/GoldenAgeSection";
import { GoldenAgeStoryBlocks } from "@/components/GoldenAgeStoryBlocks";
import { NavBar } from "@/components/NavBar";
import { PromoBar } from "@/components/PromoBar";
import { ProductOfferSection } from "@/components/ProductOfferSection";
import { VerifiedReviewsSection } from "@/components/VerifiedReviewsSection";
import { FooterSection } from "@/components/FooterSection";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-[#f3f3f3]">
      <PromoBar />
      <NavBar />
      <DealBanner />
      <ProductOfferSection />
      <GoldenAgeSection />
      <GoldenAgeStoryBlocks />
      <VerifiedReviewsSection />
      <FooterSection />
    </div>
  );
}
