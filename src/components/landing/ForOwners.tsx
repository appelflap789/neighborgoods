"use client";

import { useEffect, useRef } from "react";
import { CheckCircle, Mail, TrendingUp, Users } from "lucide-react";

const benefits = [
  "Free to join — no subscription fees",
  "We handle the digital presence",
  "Reach thousands of local shoppers",
  "Update your stock in minutes",
];

export function ForOwners() {
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
    <section
      id="for-owners"
      className="py-24 bg-background"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-light/30 border border-light/50 text-primary text-xs font-medium mb-6">
              <TrendingUp size={12} />
              For store owners
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Boost your store&apos;s visibility in Utrecht
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-8">
              Join Utrecht&apos;s premier platform for connecting local shops with
              eager customers. Stand out in the digital age while maintaining
              your store&apos;s unique character.
            </p>

            <ul className="space-y-3 mb-10">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-accent flex-shrink-0" />
                  <span className="text-muted">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Contact form */}
            <form
              action={`mailto:info@neighborgoods.live?subject=Store listing request`}
              method="get"
              encType="text/plain"
              className="space-y-4 bg-white border border-border rounded-2xl p-6"
            >
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Mail size={18} className="text-primary" />
                List your store
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  className="px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary"
                />
                <input
                  name="store"
                  type="text"
                  placeholder="Store name"
                  required
                  className="px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary"
                />
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email address"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary"
              />
              <textarea
                name="body"
                placeholder="Tell us about your store..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary resize-none"
              />
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-accent transition-colors"
              >
                Send interest →
              </button>
            </form>
          </div>

          {/* Right: stats */}
          <div className="reveal reveal-delay-2 grid grid-cols-2 gap-4">
            {[
              { icon: Users, value: "1,000+", label: "Monthly visitors", color: "bg-green-50" },
              { icon: TrendingUp, value: "Free", label: "To list your store", color: "bg-emerald-50" },
              { icon: CheckCircle, value: "24h", label: "Average setup time", color: "bg-teal-50" },
              { icon: Mail, value: "Direct", label: "Customer discovery", color: "bg-green-50" },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`${stat.color} rounded-2xl p-6 flex flex-col gap-3`}
              >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <stat.icon size={20} className="text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
