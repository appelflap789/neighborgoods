import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(45,106,79,0.15) 0%, transparent 70%), linear-gradient(180deg, #F8FAF9 0%, #ffffff 100%)",
        }}
      />

      {/* Decorative blobs */}
      <div
        className="absolute top-32 right-0 w-96 h-96 rounded-full -z-10 opacity-20"
        style={{
          background:
            "radial-gradient(circle, #95D5B2 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-light/30 border border-light/50 text-primary text-xs font-medium mb-6">
              <MapPin size={12} />
              Utrecht, Netherlands
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-foreground mb-6">
              Find what&apos;s in stock,{" "}
              <span
                className="relative"
                style={{
                  background: "linear-gradient(135deg, #2D6A4F, #40916C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                right around
                <br />
                the corner.
              </span>
            </h1>

            <p className="text-lg text-muted leading-relaxed mb-8 max-w-md">
              Browse local stores in Utrecht, check live inventory, and shop
              smarter — without leaving your neighborhood.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/map"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-accent transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
              >
                Explore the map
                <ArrowRight size={18} />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-border rounded-xl font-medium text-foreground hover:border-accent transition-all"
              >
                How it works
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-foreground">10+</div>
                <div className="text-xs text-muted">Local stores</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <div className="text-2xl font-bold text-foreground">50+</div>
                <div className="text-xs text-muted">Products tracked</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <div className="text-2xl font-bold text-foreground">1 city</div>
                <div className="text-xs text-muted">Utrecht (growing)</div>
              </div>
            </div>
          </div>

          {/* Right: App mockup */}
          <div className="relative hidden lg:block">
            {/* Browser chrome */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border bg-white">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-3 px-3 py-1 bg-white border border-border rounded-md text-xs text-muted text-center">
                  neighborgoods.live/map
                </div>
              </div>

              {/* App UI mockup */}
              <div className="flex h-80">
                {/* Sidebar mockup */}
                <div className="w-48 border-r border-border p-3 space-y-2">
                  <div className="h-7 bg-gray-100 rounded-md" />
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`rounded-lg overflow-hidden border ${
                        i === 1 ? "border-primary" : "border-border"
                      }`}
                    >
                      <div
                        className={`h-16 ${
                          i === 1
                            ? "bg-gradient-to-br from-green-200 to-green-300"
                            : "bg-gray-100"
                        }`}
                      />
                      <div className="p-2 space-y-1">
                        <div className="h-2.5 bg-gray-200 rounded w-3/4" />
                        <div className="h-2 bg-green-100 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map mockup */}
                <div className="flex-1 relative bg-gray-50 overflow-hidden">
                  {/* Simulated map tiles */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern
                        id="grid"
                        width="30"
                        height="30"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 30 0 L 0 0 0 30"
                          fill="none"
                          stroke="#2D6A4F"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>

                  {/* Simulated roads */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="60%" x2="100%" y2="55%" stroke="#e5e7eb" strokeWidth="6" />
                    <line x1="30%" y1="0" x2="35%" y2="100%" stroke="#e5e7eb" strokeWidth="4" />
                    <line x1="60%" y1="0" x2="65%" y2="100%" stroke="#e5e7eb" strokeWidth="3" />
                    <line x1="0" y1="30%" x2="100%" y2="35%" stroke="#e5e7eb" strokeWidth="3" />
                  </svg>

                  {/* Radius circle */}
                  <div
                    className="absolute rounded-full border-2 border-dashed border-primary/40 bg-primary/5"
                    style={{
                      width: "160px",
                      height: "160px",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />

                  {/* User location */}
                  <div
                    className="absolute w-4 h-4 bg-primary rounded-full border-2 border-white shadow-md"
                    style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                  />

                  {/* Store pins */}
                  {[
                    { top: "35%", left: "42%" },
                    { top: "55%", left: "58%" },
                    { top: "45%", left: "68%" },
                    { top: "62%", left: "38%" },
                  ].map((pos, i) => (
                    <div
                      key={i}
                      className="absolute"
                      style={{ top: pos.top, left: pos.left }}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 border-white shadow flex items-center justify-center ${
                          i === 0 ? "bg-primary scale-125" : "bg-accent"
                        }`}
                      >
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-border p-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-light/40 rounded-lg flex items-center justify-center">
                <MapPin size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground">
                  Old Town Boutique
                </div>
                <div className="text-xs text-green-500 font-medium">
                  ✓ 4 items in stock
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
