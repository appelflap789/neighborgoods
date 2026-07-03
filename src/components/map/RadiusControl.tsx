"use client";

import { MapPin } from "lucide-react";

interface RadiusControlProps {
  radius: number;
  onRadiusChange: (radius: number) => void;
  min: number;
  max: number;
}

export function RadiusControl({
  radius,
  onRadiusChange,
  min,
  max,
}: RadiusControlProps) {
  return (
    <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg p-4 z-10">
      <div className="flex items-center gap-2 mb-2">
        <MapPin size={16} className="text-primary" />
        <span className="text-sm font-medium text-foreground">
          Search radius: {radius} km
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={0.5}
        value={radius}
        onChange={(e) => onRadiusChange(parseFloat(e.target.value))}
        className="w-48 accent-primary"
      />
      <div className="flex justify-between text-xs text-muted mt-1">
        <span>{min} km</span>
        <span>{max} km</span>
      </div>
    </div>
  );
}
