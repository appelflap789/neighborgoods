"use client";

import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-white border-y border-border">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="w-12 h-12 bg-light/30 rounded-xl flex items-center justify-center mx-auto mb-6">
          <Mail size={24} className="text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Stay in the loop
        </h2>
        <p className="text-muted mb-8">
          Get new store alerts, stock updates, and local shopping tips delivered
          to your inbox.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-light/30 border border-light/50 text-primary rounded-xl font-medium">
            ✓ You&apos;re subscribed — welcome!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-accent transition-colors flex items-center gap-2 justify-center"
            >
              Subscribe
              <ArrowRight size={16} />
            </button>
          </form>
        )}
        <p className="text-xs text-muted mt-4">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
