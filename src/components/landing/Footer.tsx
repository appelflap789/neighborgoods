import Link from "next/link";
import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Leaf size={20} className="text-primary" />
              <span className="font-bold text-foreground">NeighborGoods</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              Connecting Utrecht&apos;s local stores with the people who love their
              city.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/map" className="hover:text-primary transition-colors">
                  Store map
                </Link>
              </li>
              <li>
                <a href="#features" className="hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-primary transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <a href="#for-owners" className="hover:text-primary transition-colors">
                  For store owners
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a
                  href="mailto:info@neighborgoods.live"
                  className="hover:text-primary transition-colors"
                >
                  info@neighborgoods.live
                </a>
              </li>
              <li>
                <a
                  href="tel:+31651354767"
                  className="hover:text-primary transition-colors"
                >
                  +31 6 51354767
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted">
          <span>© 2026 NeighborGoods. All rights reserved.</span>
          <span>Made with love for Utrecht</span>
        </div>
      </div>
    </footer>
  );
}
