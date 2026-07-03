"use client";

import { useRef, useCallback, useEffect } from "react";
import MapGL, {
  Marker,
  NavigationControl,
  GeolocateControl,
  MapRef,
  Source,
  Layer,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { StoreWithDistance, Coordinates } from "@/lib/types";
import { createGeoJSONCircle } from "@/lib/geo";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "@/config/constants";
import { StoreMarker } from "./StoreMarker";

interface MapProps {
  stores: StoreWithDistance[];
  location: Coordinates;
  radius: number;
  selectedStoreId: string | null;
  onStoreSelect: (storeId: string) => void;
  onMapClick: (coords: Coordinates) => void;
  flyToStore: StoreWithDistance | null;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function Map({
  stores,
  location,
  radius,
  selectedStoreId,
  onStoreSelect,
  onMapClick,
  flyToStore,
}: MapProps) {
  const mapRef = useRef<MapRef>(null);

  const radiusGeoJSON = createGeoJSONCircle(location, radius);

  const handleMapClick = useCallback(
    (e: mapboxgl.MapLayerMouseEvent) => {
      // Don't set location if clicking on a marker
      const features = e.target.queryRenderedFeatures(e.point);
      if (features.length > 0) return;

      onMapClick({
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
      });
    },
    [onMapClick]
  );

  useEffect(() => {
    if (flyToStore && mapRef.current) {
      mapRef.current.flyTo({
        center: [flyToStore.longitude, flyToStore.latitude],
        zoom: 15,
        duration: 1500,
      });
    }
  }, [flyToStore]);

  return (
    <MapGL
      ref={mapRef}
      initialViewState={{
        latitude: DEFAULT_CENTER.latitude,
        longitude: DEFAULT_CENTER.longitude,
        zoom: DEFAULT_ZOOM,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
      onClick={handleMapClick}
      interactiveLayerIds={[]}
    >
      <NavigationControl position="top-right" />
      <GeolocateControl position="top-right" />

      {/* Radius circle */}
      <Source id="radius-circle" type="geojson" data={radiusGeoJSON}>
        <Layer
          id="radius-fill"
          type="fill"
          paint={{
            "fill-color": "#2D6A4F",
            "fill-opacity": 0.08,
          }}
        />
        <Layer
          id="radius-border"
          type="line"
          paint={{
            "line-color": "#2D6A4F",
            "line-width": 2,
            "line-opacity": 0.4,
            "line-dasharray": [3, 2],
          }}
        />
      </Source>

      {/* User location marker */}
      <Marker
        latitude={location.latitude}
        longitude={location.longitude}
        anchor="center"
      >
        <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg pulse-marker" />
      </Marker>

      {/* Store markers */}
      {stores.map((store) => (
        <Marker
          key={store.id}
          latitude={store.latitude}
          longitude={store.longitude}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            onStoreSelect(store.id);
          }}
        >
          <StoreMarker
            store={store}
            isSelected={store.id === selectedStoreId}
          />
        </Marker>
      ))}
    </MapGL>
  );
}
