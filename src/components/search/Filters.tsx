"use client";

import { STORE_CATEGORIES } from "@/config/constants";
import { Package } from "lucide-react";

interface FiltersProps {
  categoryFilter: string | null;
  onCategoryChange: (category: string | null) => void;
  inStockOnly: boolean;
  onInStockChange: (value: boolean) => void;
}

export function Filters({
  categoryFilter,
  onCategoryChange,
  inStockOnly,
  onInStockChange,
}: FiltersProps) {
  return (
    <div className="space-y-3">
      {/* Category pills */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            categoryFilter === null
              ? "bg-primary text-primary-foreground"
              : "bg-background text-muted hover:bg-light/30 hover:text-primary border border-border"
          }`}
        >
          All
        </button>
        {STORE_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() =>
              onCategoryChange(categoryFilter === category ? null : category)
            }
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              categoryFilter === category
                ? "bg-primary text-primary-foreground"
                : "bg-background text-muted hover:bg-light/30 hover:text-primary border border-border"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* In-stock toggle */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockChange(e.target.checked)}
          className="w-4 h-4 accent-primary rounded"
        />
        <span className="text-xs text-muted flex items-center gap-1">
          <Package size={12} />
          In stock only
        </span>
      </label>
    </div>
  );
}
