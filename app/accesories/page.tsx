import { NavBar } from "@/components/NavBar";

function Dropdown({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 text-[12px] text-zinc-600"
    >
      <span>{label}</span>
      <span className="text-zinc-400">▾</span>
    </button>
  );
}

export default function AccesoriesPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <NavBar />

      <div className="mx-auto max-w-[1240px] px-4 pb-20 pt-10 sm:px-6">
        <div className="text-center text-[40px] font-light tracking-wide text-zinc-700">
          Accesories
        </div>

        <div className="mt-10 flex items-center justify-end gap-4">
          <div className="flex items-center gap-3">
            <div className="text-[12px] text-zinc-500">Sort by:</div>
            <Dropdown label="Best selling" />
          </div>
          <div className="text-[12px] text-zinc-500">0 products</div>
        </div>

        <div className="mt-24 text-center">
          <div className="text-[28px] font-light text-zinc-700">
            No products found
          </div>
          <div className="mt-2 text-[20px] font-light text-zinc-600">
            Use fewer filters or{" "}
            <button type="button" className="text-[#6c0d0d]">
              remove all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

