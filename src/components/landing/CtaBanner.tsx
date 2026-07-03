import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #40916C 100%)",
        }}
      />

      {/* Decorative circle */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 -z-10"
        style={{ background: "radial-gradient(circle, #95D5B2, transparent)" }}
      />

      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Ready to explore Utrecht?
        </h2>
        <p className="text-xl text-green-200 mb-10 max-w-xl mx-auto">
          Discover what&apos;s in stock at local stores near you — no sign-up
          required.
        </p>
        <Link
          href="/map"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-xl font-semibold text-lg hover:bg-green-50 transition-all hover:shadow-2xl hover:-translate-y-1"
        >
          Open the map
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}
