"use client";

import { useState, useCallback } from "react";

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setCategoryFilter(null);
    setInStockOnly(false);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    inStockOnly,
    setInStockOnly,
    clearFilters,
  };
}
