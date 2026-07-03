"use client";

import { StoreWithDistance } from "@/lib/types";
import { MapPin } from "lucide-react";

interface StoreMarkerProps {
  store: StoreWithDistance;
  isSelected: boolean;
}

export function StoreMarker({ store, isSelected }: StoreMarkerProps) {
  return (
    <div
      className={`
        flex items-center justify-center cursor-pointer transition-all duration-200
        ${isSelected ? "scale-125 z-10" : "hover:scale-110"}
      `}
      title={store.name}
    >
      <div
        className={`
          p-1.5 rounded-full shadow-md
          ${isSelected ? "bg-primary" : "bg-accent"}
        `}
      >
        <MapPin
          size={isSelected ? 22 : 18}
          className="text-white"
          fill="currentColor"
        />
      </div>
    </div>
  );
}
