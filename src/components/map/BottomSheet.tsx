"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { StoreWithDistance, Product } from "@/lib/types";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Filters } from "@/components/search/Filters";
import { SlidersHorizontal, X, MapPin } from "lucide-react";
import { RADIUS_MIN, RADIUS_MAX } from "@/config/constants";

const SNAP_POINTS = [0.12, 0.5, 0.92];

interface BottomSheetProps {
  stores: StoreWithDistance[];
  selectedStoreId: string | null;
  onStoreSelect: (storeId: string) => void;
  getProductsForStore: (storeId: string) => Product[];
  categoryFilter: string | null;
  onCategoryChange: (category: string | null) => void;
  inStockOnly: boolean;
  onInStockChange: (value: boolean) => void;
  radius: number;
  onRadiusChange: (radius: number) => void;
}

export function BottomSheet({
  stores,
  selectedStoreId,
  onStoreSelect,
  getProductsForStore,
  categoryFilter,
  onCategoryChange,
  inStockOnly,
  onInStockChange,
  radius,
  onRadiusChange,
}: BottomSheetProps) {
  const [snap, setSnap] = useState<number | string | null>(SNAP_POINTS[0]);
  const [showFilters, setShowFilters] = useState(false);

  const handleStoreSelect = (storeId: string) => {
    onStoreSelect(storeId);
    // Snap to full when a store is selected
    if (storeId) setSnap(SNAP_POINTS[2]);
  };

  return (
    <Drawer.Root
      open={true}
      modal={false}
      snapPoints={SNAP_POINTS}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <Drawer.Portal>
        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 z-40 flex flex-col bg-white rounded-t-2xl shadow-2xl border-t border-border focus:outline-none"
          style={{
            height: "92vh",
          }}
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          {/* Peek bar — always visible */}
          <div
            className="flex items-center justify-between px-4 py-2 flex-shrink-0 cursor-pointer"
            onClick={() =>
              setSnap(snap === SNAP_POINTS[0] ? SNAP_POINTS[1] : SNAP_POINTS[0])
            }
          >
            <span className="text-sm font-semibold text-foreground">
              {stores.length} store{stores.length !== 1 ? "s" : ""} nearby
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowFilters((v) => !v);
                if (snap === SNAP_POINTS[0]) setSnap(SNAP_POINTS[1]);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                showFilters || categoryFilter || inStockOnly
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-muted"
              }`}
            >
              <SlidersHorizontal size={13} />
              Filters
              {(categoryFilter || inStockOnly) && (
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
              )}
            </button>
          </div>

          {/* Filters + radius panel (collapsible) */}
          {showFilters && (
            <div className="px-4 pb-3 border-b border-border flex-shrink-0 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted">Filter stores</span>
                <button onClick={() => setShowFilters(false)}>
                  <X size={14} className="text-muted" />
                </button>
              </div>
              <Filters
                categoryFilter={categoryFilter}
                onCategoryChange={onCategoryChange}
                inStockOnly={inStockOnly}
                onInStockChange={onInStockChange}
              />
              {/* Radius slider */}
              <div className="pt-2 border-t border-border">
                <div className="flex items-center gap-2 mb-1.5">
                  <MapPin size={13} className="text-primary" />
                  <span className="text-xs font-medium text-foreground">
                    Search radius: {radius} km
                  </span>
                </div>
                <input
                  type="range"
                  min={RADIUS_MIN}
                  max={RADIUS_MAX}
                  step={0.5}
                  value={radius}
                  onChange={(e) => onRadiusChange(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted mt-0.5">
                  <span>{RADIUS_MIN} km</span>
                  <span>{RADIUS_MAX} km</span>
                </div>
              </div>
            </div>
          )}

          {/* Store list — scrollable */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <Sidebar
              stores={stores}
              selectedStoreId={selectedStoreId}
              onStoreSelect={handleStoreSelect}
              getProductsForStore={getProductsForStore}
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
