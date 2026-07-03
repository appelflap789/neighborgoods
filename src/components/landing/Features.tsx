"use client";

import { useEffect, useRef } from "react";
import { Map, Search, Radio } from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Interactive Map",
    description:
      "Explore Utrecht's local stores on a smooth, zoomable map. Click any marker to instantly see what's in stock and when they're open.",
    color: "bg-green-50",
    iconColor: "text-primary",
  },
  {
    icon: Search,
    title: "Search by Product",
    description:
      "Looking for sneakers or a vintage jacket? Search by product name and instantly see which nearby stores have it available.",
    color: "bg-emerald-50",
    iconColor: "text-accent",
  },
  {
    icon: Radio,
    title: "Set Your Radius",
    description:
      "Drag a slider to define your search area — from a quick 1 km walk to a 10 km bike ride. Only see stores you can actually reach.",
    color: "bg-teal-50",
    iconColor: "text-primary",
  },
];

export function Features() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = ref.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything you need to shop local
          </h2>
          <p className="text-lg text-muted max-w-xl mx-auto">
            Designed for both tourists exploring Utrecht and locals who want to
            support businesses in their neighborhood.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`reveal reveal-delay-${i + 1} p-8 rounded-2xl border border-border hover:border-accent/40 hover:shadow-md transition-all`}
            >
              <div
                className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6`}
              >
                <feature.icon size={24} className={feature.iconColor} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
