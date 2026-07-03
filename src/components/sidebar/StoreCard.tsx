"use client";

import { StoreWithDistance } from "@/lib/types";
import { MapPin, Clock } from "lucide-react";

interface StoreCardProps {
  store: StoreWithDistance;
  isSelected: boolean;
  onSelect: () => void;
}

export function StoreCard({ store, isSelected, onSelect }: StoreCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`
        rounded-xl overflow-hidden cursor-pointer transition-all duration-200
        border shadow-sm hover:shadow-md
        ${isSelected ? "border-primary bg-light/10" : "border-border bg-white hover:border-accent"}
      `}
    >
      {/* Store image */}
      <div className="h-32 overflow-hidden">
        <img
          src={store.image_url}
          alt={store.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Store info */}
      <div className="p-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-foreground text-sm">
            {store.name}
          </h3>
          <span className="text-xs text-muted whitespace-nowrap ml-2">
            {store.distance.toFixed(1)} km
          </span>
        </div>

        <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-light/30 text-primary font-medium">
          {store.category}
        </span>

        <p className="text-xs text-muted mt-2 line-clamp-2">
          {store.description}
        </p>

        <div className="flex items-center gap-3 mt-2 text-xs text-muted">
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {store.address.split(",")[0]}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {store.opening_hours.split(",")[0]}
          </span>
        </div>
      </div>
    </div>
  );
}
