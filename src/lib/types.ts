export interface Store {
  id: string;
  name: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  address: string;
  image_url: string;
  opening_hours: string;
  owner_id: string | null;
}

export interface Product {
  id: string;
  store_id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  in_stock: boolean;
  image_url: string;
  updated_at: string;
}

export interface StoreWithDistance extends Store {
  distance: number; // km from user location
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
