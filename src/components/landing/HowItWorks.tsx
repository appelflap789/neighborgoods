"use client";

import { useEffect, useRef } from "react";
import { LocateFixed, Store, ShoppingBag } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: LocateFixed,
    title: "Set your location",
    description:
      "Allow location access or click anywhere on the map to set your starting point. Adjust the radius to your preferred walking or cycling distance.",
  },
  {
    number: "02",
    icon: Store,
    title: "Browse nearby stores",
    description:
      "See all local stores within your radius, sorted by distance. Filter by category — Fashion, Electronics, Vintage, and more.",
  },
  {
    number: "03",
    icon: ShoppingBag,
    title: "Check stock & visit",
    description:
      "Click any store to see exactly what's in stock right now. Plan your visit knowing the products you want are available.",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const elements = ref.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-24 bg-background" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted max-w-xl mx-auto">
            Three simple steps to find exactly what you need, right where you are.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`reveal reveal-delay-${i + 1} text-center`}
            >
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 rounded-2xl bg-white border-2 border-primary/20 flex items-center justify-center mx-auto shadow-sm">
                  <step.icon size={32} className="text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
