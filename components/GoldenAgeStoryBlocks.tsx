"use client";

import Image from "next/image";

function GoldButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="h-12 rounded-md bg-[linear-gradient(180deg,#d9b45c_0%,#9d7b2a_100%)] px-8 text-[10px] font-extrabold tracking-[0.22em] text-black shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
    >
      {label}
    </button>
  );
}

function StoryCard({
  kicker,
  title,
  description,
  imageOnLeft,
  imageSrc,
  imageAlt,
}: {
  kicker: string;
  title: string;
  description: string;
  imageOnLeft: boolean;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#d1b469]/40 bg-black shadow-[0_22px_70px_rgba(0,0,0,0.35)]">
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(140%_140%_at_0%_0%,#2f2f2f_0%,#111_35%,#080808_100%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_7px,rgba(0,0,0,0)_7px,rgba(0,0,0,0)_22px)]" />
        <div className="relative grid grid-cols-1 gap-8 px-6 py-8 md:grid-cols-2 md:gap-10 md:px-10 md:py-10">
          {imageOnLeft ? (
            <>
              <div className="flex items-center">
                <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-black/30 shadow-[0_18px_55px_rgba(0,0,0,0.45)]">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={900}
                    height={650}
                    className="h-auto w-full"
                    priority={false}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="text-[10px] font-extrabold tracking-[0.24em] text-[#f3d25f]">
                  {kicker}
                </div>
                <div className="mt-2 text-[34px] font-extrabold leading-tight text-white md:text-[38px]">
                  {title}
                </div>
                <div className="mt-4 text-[12px] leading-5 text-white/80">
                  {description}
                </div>

                <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <GoldButton label="CHECK AVAILABILITY" />
                  <div className="text-[10px] font-semibold text-white/70">
                    ▲ Low Stock: Allocation Closing Soon
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col justify-center">
                <div className="text-[10px] font-extrabold tracking-[0.24em] text-[#f3d25f]">
                  {kicker}
                </div>
                <div className="mt-2 text-[34px] font-extrabold leading-tight text-white md:text-[38px]">
                  {title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="relative inline-block">
                    <span className="absolute -bottom-1 left-0 h-2 w-full bg-[#f3d25f]/70" />
                    <span className="relative">{title.split(" ").slice(-1)[0]}</span>
                  </span>
                </div>
                <div className="mt-4 text-[12px] leading-5 text-white/80">
                  {description}
                </div>

                <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <GoldButton label="CHECK AVAILABILITY" />
                  <div className="text-[10px] font-semibold text-white/70">
                    Protective Sleeve Included • Certified
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-black/30 shadow-[0_18px_55px_rgba(0,0,0,0.45)]">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={900}
                    height={650}
                    className="h-auto w-full"
                    priority={false}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function GoldenAgeStoryBlocks() {
  return (
    <section className="w-full bg-white pb-14">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="mt-10 flex flex-col gap-10">
          <StoryCard
            kicker="RAINBOW IS THE FUTURE • QFS VERIFIED"
            title="The Golden Age Is Here."
            description="The storm has passed. We are witnessing the return to a value-based system, anchored in integrity and sovereignty. The QFS Rainbow Bill is designed to mark this historic transition—a physical representation of the wealth and freedom returning to the people.\n\nFinished in 99.99% Gold Foil with high-security holographic detailing, this asset represents the promise of the 47th President. It is not just a note; it is your personal stake in the future. Secure your legacy before the public release closes."
            imageOnLeft
            imageSrc="/golden-age-hero-1.svg"
            imageAlt="Golden Age hero"
          />

          <StoryCard
            kicker="PRECISION ARTISTRY • HOLOGRAPHIC GOLD"
            title="A Masterpiece of the New Era."
            description="The QFS Rainbow Bill represents the perfect fusion of tradition and future technology. Crafted with distinct rainbow holographic foils overlaid on pure 99.9% gold leaf, this note shimmers with the full spectrum of light—symbolizing transparency and the bright future of our great nation.\n\nEvery detail, from the portrait of the 47th President to the intricate security-style engravings, is designed to honor the restoration of the Republic. This is not merely a display piece; it is a declaration of where you stand in history. Authentic, resilient, and undeniably patriotic."
            imageOnLeft={false}
            imageSrc="/golden-age-hero-2.svg"
            imageAlt="Masterpiece hero"
          />
        </div>
      </div>
    </section>
  );
}

