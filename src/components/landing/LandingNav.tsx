"use client";

import Link from "next/link";
import { Leaf, Map } from "lucide-react";
import { useEffect, useState } from "react";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Leaf size={22} className="text-primary" />
          <span className="text-lg font-bold text-foreground">
            NeighborGoods
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <a
            href="#features"
            className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block"
          >
            How it works
          </a>
          <a
            href="#for-owners"
            className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block"
          >
            For stores
          </a>
          <Link
            href="/map"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors"
          >
            <Map size={16} />
            Open Map
          </Link>
        </div>
      </nav>
    </header>
  );
}
