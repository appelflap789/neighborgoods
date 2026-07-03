"use client";

import { useState } from "react";
import Link from "next/link";
import { Map } from "@/components/map/Map";
import { RadiusControl } from "@/components/map/RadiusControl";
import { BottomSheet } from "@/components/map/BottomSheet";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { SearchBar } from "@/components/search/SearchBar";
import { Filters } from "@/components/search/Filters";
import { useLocation } from "@/hooks/useLocation";
import { useStores } from "@/hooks/useStores";
import { useSearch } from "@/hooks/useSearch";
import { RADIUS_DEFAULT, RADIUS_MIN, RADIUS_MAX } from "@/config/constants";
import { StoreWithDistance } from "@/lib/types";
import { Leaf, Search, X } from "lucide-react";

export default function MapPage() {
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
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

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
      <header className="bg-white border-b border-border px-4 py-3 flex items-center gap-3 z-20 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Leaf size={22} className="text-primary" />
          <h1 className="text-base font-bold text-foreground">NeighborGoods</h1>
        </Link>

        {/* Desktop: full search bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Mobile: search icon that expands */}
        <div className="flex-1 flex justify-end md:hidden">
          {mobileSearchOpen ? (
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
              <button
                onClick={() => {
                  setMobileSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-2 text-muted"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setMobileSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 text-muted"
            >
              <Search size={20} />
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Desktop sidebar */}
        <aside className="w-96 border-r border-border flex-col overflow-hidden hidden md:flex">
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

        {/* Map — full width on mobile, flex-1 on desktop */}
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

        {/* Mobile bottom sheet */}
        <div className="md:hidden">
          <BottomSheet
            stores={stores}
            selectedStoreId={selectedStoreId}
            onStoreSelect={handleStoreSelect}
            getProductsForStore={getProductsForStore}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            inStockOnly={inStockOnly}
            onInStockChange={setInStockOnly}
          />
        </div>
      </div>
    </div>
  );
}
