export const DEFAULT_CENTER = {
  latitude: 52.0907,
  longitude: 5.1214,
} as const;

export const DEFAULT_ZOOM = 13;

export const RADIUS_MIN = 1; // km
export const RADIUS_MAX = 10; // km
export const RADIUS_DEFAULT = 3; // km

export const STORE_CATEGORIES = [
  "Fashion",
  "Electronics",
  "Food",
  "Sports",
  "Books",
  "Home & Garden",
  "Health & Beauty",
  "Vintage",
] as const;

export type StoreCategory = (typeof STORE_CATEGORIES)[number];
