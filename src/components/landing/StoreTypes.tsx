"use client";

import { useEffect, useRef } from "react";
import {
  Shirt,
  Laptop,
  UtensilsCrossed,
  Dumbbell,
  BookOpen,
  Home,
  Heart,
  Clock,
  LucideIcon,
} from "lucide-react";
import { STORE_CATEGORIES, StoreCategory } from "@/config/constants";

const categoryIcons: Record<StoreCategory, LucideIcon> = {
  Fashion: Shirt,
  Electronics: Laptop,
  Food: UtensilsCrossed,
  Sports: Dumbbell,
  Books: BookOpen,
  "Home & Garden": Home,
  "Health & Beauty": Heart,
  Vintage: Clock,
};

const categoryColors: Record<StoreCategory, string> = {
  Fashion: "bg-rose-50 text-rose-600",
  Electronics: "bg-blue-50 text-blue-600",
  Food: "bg-orange-50 text-orange-600",
  Sports: "bg-lime-50 text-lime-700",
  Books: "bg-amber-50 text-amber-600",
  "Home & Garden": "bg-green-50 text-green-700",
  "Health & Beauty": "bg-pink-50 text-pink-600",
  Vintage: "bg-purple-50 text-purple-600",
};

export function StoreTypes() {
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
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 reveal">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What&apos;s on the map
          </h2>
          <p className="text-lg text-muted max-w-xl mx-auto">
            From vintage finds to tech gadgets — Utrecht&apos;s most unique local
            stores, all in one place.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 reveal reveal-delay-1">
          {STORE_CATEGORIES.map((category) => {
            const Icon = categoryIcons[category];
            const colorClass = categoryColors[category];
            return (
              <div
                key={category}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border hover:border-accent/40 hover:shadow-sm transition-all cursor-default group"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass} group-hover:scale-110 transition-transform`}
                >
                  <Icon size={22} />
                </div>
                <span className="text-sm font-medium text-foreground text-center">
                  {category}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
