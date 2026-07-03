"use client";

import { useState, useMemo } from "react";
import { stores, products } from "@/lib/data";
import { Store, Product, StoreWithDistance, Coordinates } from "@/lib/types";
import { haversineDistance } from "@/lib/geo";

interface UseStoresOptions {
  location: Coordinates;
  radius: number; // km
  searchQuery: string;
  categoryFilter: string | null;
  inStockOnly: boolean;
}

export function useStores({
  location,
  radius,
  searchQuery,
  categoryFilter,
  inStockOnly,
}: UseStoresOptions) {
  const storesWithDistance: StoreWithDistance[] = useMemo(() => {
    return stores.map((store) => ({
      ...store,
      distance: haversineDistance(location, {
        latitude: store.latitude,
        longitude: store.longitude,
      }),
    }));
  }, [location]);

  const filteredStores: StoreWithDistance[] = useMemo(() => {
    let result = storesWithDistance.filter((store) => store.distance <= radius);

    // Category filter
    if (categoryFilter) {
      result = result.filter((store) => store.category === categoryFilter);
    }

    // Search query — match store name or products in the store
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((store) => {
        const nameMatch = store.name.toLowerCase().includes(query);
        const storeProducts = products.filter(
          (p) => p.store_id === store.id
        );
        const productMatch = storeProducts.some(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
        return nameMatch || productMatch;
      });
    }

    // If in-stock only, filter to stores that have at least one matching in-stock product
    if (inStockOnly && searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((store) => {
        const storeProducts = products.filter(
          (p) => p.store_id === store.id
        );
        return storeProducts.some(
          (p) =>
            p.in_stock &&
            (p.name.toLowerCase().includes(query) ||
              p.category.toLowerCase().includes(query))
        );
      });
    }

    // Sort by distance
    result.sort((a, b) => a.distance - b.distance);

    return result;
  }, [storesWithDistance, radius, searchQuery, categoryFilter, inStockOnly]);

  const getProductsForStore = (storeId: string): Product[] => {
    let storeProducts = products.filter((p) => p.store_id === storeId);
    if (inStockOnly) {
      storeProducts = storeProducts.filter((p) => p.in_stock);
    }
    return storeProducts;
  };

  return {
    stores: filteredStores,
    allStores: storesWithDistance,
    getProductsForStore,
  };
}
