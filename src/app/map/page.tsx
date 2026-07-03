"use client";

import { useState } from "react";
import { Map } from "@/components/map/Map";
import { RadiusControl } from "@/components/map/RadiusControl";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { SearchBar } from "@/components/search/SearchBar";
import { Filters } from "@/components/search/Filters";
import { useLocation } from "@/hooks/useLocation";
import { useStores } from "@/hooks/useStores";
import { useSearch } from "@/hooks/useSearch";
import { RADIUS_DEFAULT, RADIUS_MIN, RADIUS_MAX } from "@/config/constants";
import { StoreWithDistance } from "@/lib/types";
import { Leaf } from "lucide-react";

export default function HomePage() {
  const { location, setCustomLocation } = useLocation();
  const {
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    inStockOnly,
    setInStockOnly,
  } = useSearch();

  const [radius, setRadius] = useState(RADIUS_DEFAULT);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [flyToStore, setFlyToStore] = useState<StoreWithDistance | null>(null);

  const { stores, getProductsForStore } = useStores({
    location,
    radius,
    searchQuery,
    categoryFilter,
    inStockOnly,
  });

  const handleStoreSelect = (storeId: string) => {
    setSelectedStoreId(storeId || null);
    if (storeId) {
      const store = stores.find((s) => s.id === storeId);
      if (store) setFlyToStore(store);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-border px-4 py-3 flex items-center gap-4 z-20">
        <div className="flex items-center gap-2">
          <Leaf size={24} className="text-primary" />
          <h1 className="text-lg font-bold text-foreground">NeighborGoods</h1>
        </div>
        <div className="flex-1 max-w-md">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-96 border-r border-border flex flex-col overflow-hidden max-md:hidden">
          <div className="p-3 border-b border-border">
            <Filters
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              inStockOnly={inStockOnly}
              onInStockChange={setInStockOnly}
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <Sidebar
              stores={stores}
              selectedStoreId={selectedStoreId}
              onStoreSelect={handleStoreSelect}
              getProductsForStore={getProductsForStore}
            />
          </div>
        </aside>

        {/* Map */}
        <main className="flex-1 relative">
          <Map
            stores={stores}
            location={location}
            radius={radius}
            selectedStoreId={selectedStoreId}
            onStoreSelect={handleStoreSelect}
            onMapClick={setCustomLocation}
            flyToStore={flyToStore}
          />
          <RadiusControl
            radius={radius}
            onRadiusChange={setRadius}
            min={RADIUS_MIN}
            max={RADIUS_MAX}
          />
        </main>
      </div>
    </div>
  );
}
