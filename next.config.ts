import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["react-map-gl", "mapbox-gl", "@mapbox/mapbox-gl-geocoder"],
};

export default nextConfig;
