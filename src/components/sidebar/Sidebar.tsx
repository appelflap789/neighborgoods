"use client";

import { StoreWithDistance, Product } from "@/lib/types";
import { StoreCard } from "./StoreCard";
import { ProductList } from "./ProductList";
import { MapPin } from "lucide-react";

interface SidebarProps {
  stores: StoreWithDistance[];
  selectedStoreId: string | null;
  onStoreSelect: (storeId: string) => void;
  getProductsForStore: (storeId: string) => Product[];
}

export function Sidebar({
  stores,
  selectedStoreId,
  onStoreSelect,
  getProductsForStore,
}: SidebarProps) {
  const selectedStore = stores.find((s) => s.id === selectedStoreId);
  const selectedProducts = selectedStoreId
    ? getProductsForStore(selectedStoreId)
    : [];

  return (
    <div className="h-full flex flex-col bg-card overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <MapPin size={20} className="text-primary" />
          <h2 className="font-semibold text-foreground">
            {stores.length} store{stores.length !== 1 ? "s" : ""} nearby
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {selectedStore ? (
          <div>
            {/* Back button */}
            <button
              onClick={() => onStoreSelect("")}
              className="w-full p-3 text-sm text-primary hover:bg-light/20 flex items-center gap-1 border-b border-border"
            >
              ← Back to all stores
            </button>

            {/* Selected store detail */}
            <div className="p-4">
              <StoreCard
                store={selectedStore}
                isSelected={true}
                onSelect={() => {}}
              />
              <ProductList products={selectedProducts} />
            </div>
          </div>
        ) : (
          <div className="p-3 space-y-3">
            {stores.length === 0 ? (
              <div className="text-center py-8 text-muted">
                <MapPin size={32} className="mx-auto mb-2 opacity-50" />
                <p>No stores found in this area.</p>
                <p className="text-sm mt-1">Try increasing the radius.</p>
              </div>
            ) : (
              stores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  isSelected={store.id === selectedStoreId}
                  onSelect={() => onStoreSelect(store.id)}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
