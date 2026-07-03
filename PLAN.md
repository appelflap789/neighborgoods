# NeighborGoods 2.0 — Build Plan

## Overview
Map-based app for Utrecht where users can see stores and their stock, set their location, and find available items within a radius. Rebuild of https://www.neighborgoods.live/ with better map, interface, and modular architecture.

---

## Architecture Decisions

| Decision | Choice |
|----------|--------|
| Framework | Next.js (App Router) + TypeScript |
| Map | Mapbox GL JS via `react-map-gl` |
| Styling | Tailwind CSS + shadcn/ui |
| Colors | Modernized green (`#2D6A4F` primary, `#40916C` accent, `#F8FAF9` bg) |
| Data | Local JSON mock data (Supabase-ready interface) |
| Data model | Stores + Products, boolean in_stock |
| Layout | Split-panel: sidebar left, map right, bottom sheet on mobile |
| Search | Both modes — store-first default, product search via search bar |
| Location | Geolocation prompt, click-to-set, slider + visual radius circle |
| Auth | None for MVP |
| Deployment | Local only (`next dev`) |
| Structure | Modular folder architecture |

---

## Data Model

### Store
- id: string (uuid)
- name: string
- description: string
- category: string (e.g. "Fashion", "Electronics", "Food")
- latitude: number
- longitude: number
- address: string
- image_url: string
- opening_hours: string
- owner_id: string | null (for future)

### Product
- id: string (uuid)
- store_id: string (FK → Store)
- name: string
- description: string
- category: string (e.g. "Sneakers", "Laptops")
- price: number
- in_stock: boolean
- image_url: string
- updated_at: string (ISO date)

---

## Project Structure

```
neighborgoods/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Main map page
│   │   ├── layout.tsx          # Root layout
│   │   └── api/                # API routes
│   │       ├── stores/route.ts # GET stores (with geo filter)
│   │       └── products/route.ts # GET products (by store, search)
│   ├── components/
│   │   ├── map/                # Map module
│   │   │   ├── Map.tsx
│   │   │   ├── StoreMarker.tsx
│   │   │   └── RadiusCircle.tsx
│   │   ├── sidebar/            # Sidebar module
│   │   │   ├── Sidebar.tsx
│   │   │   ├── StoreCard.tsx
│   │   │   └── ProductList.tsx
│   │   ├── search/             # Search module
│   │   │   ├── SearchBar.tsx
│   │   │   └── Filters.tsx
│   │   └── ui/                 # shadcn/ui components
│   ├── lib/                    # Shared utilities
│   │   ├── data.ts             # Mock data (swap for supabase.ts later)
│   │   ├── geo.ts              # Geolocation & distance helpers
│   │   └── types.ts            # TypeScript types (Store, Product)
│   ├── hooks/                  # Custom React hooks
│   │   ├── useStores.ts        # Fetch & filter stores
│   │   ├── useLocation.ts      # User location state
│   │   └── useSearch.ts        # Search state
│   └── config/                 # App configuration
│       └── constants.ts        # Default coords, radius limits, etc.
├── .env.local                  # NEXT_PUBLIC_MAPBOX_TOKEN (gitignored)
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Key Features (MVP)

### 1. Interactive Map
- Mapbox GL JS vector map centered on Utrecht
- Store markers with popups (name, category, product count)
- Translucent radius circle showing search area
- Click-to-set location (alternative to geolocation)
- Smooth fly-to animations when selecting stores

### 2. Sidebar (Store-First Mode)
- Scrollable list of stores within radius
- Store cards: image, name, category, distance, product count
- Click card → fly map to store, expand to show products
- Product list: name, price, in-stock badge

### 3. Search (Product-First Mode)
- Search bar with free text
- Typing a product name filters to stores that carry it (in stock)
- Category pill filters (Fashion, Electronics, Food, etc.)
- In-stock toggle to hide out-of-stock items

### 4. Location & Radius
- Browser geolocation prompt on first visit
- Fallback: Utrecht Dom Tower (52.0907, 5.1214)
- Click anywhere on map to set custom origin
- Radius slider (1–10 km) with visual circle overlay
- Address geocoding via Mapbox Geocoder

### 5. Mobile Responsive
- Full-screen map
- Draggable bottom sheet for store list
- Touch-friendly controls

---

## Implementation Phases

### Phase 1: Project Setup
- Initialize Next.js + TypeScript
- Install dependencies (react-map-gl, mapbox-gl, tailwindcss, shadcn/ui)
- Configure Tailwind with green color palette
- Set up folder structure
- Create .env.local with Mapbox token

### Phase 2: Core Data Layer
- Define TypeScript types (Store, Product)
- Create mock data (10 Utrecht stores, ~50 products)
- Build API routes with geo-filtering (haversine)
- Create custom hooks (useStores, useLocation, useSearch)

### Phase 3: Map Component
- Render Mapbox map centered on Utrecht
- Add store markers
- Implement radius circle overlay
- Click-to-set location
- Fly-to animations
- Store popups

### Phase 4: Sidebar & Store Cards
- Build sidebar layout (responsive)
- Store card component
- Product list component
- Sidebar ↔ map interaction (click card → fly to store)

### Phase 5: Search & Filters
- Search bar component
- Category filter pills
- In-stock toggle
- Wire search to filter both sidebar + map markers

### Phase 6: Mobile & Polish
- Bottom sheet for mobile
- Responsive breakpoints
- Loading states, empty states
- Geolocation permission UX

---

## Configuration

### Mapbox Token
```
pk.eyJ1IjoiamFjazIyOCIsImEiOiJjbXI1ZT...  (stored in .env.local, never commit)
```

### Default Location (Dom Tower, Utrecht)
- Latitude: 52.0907
- Longitude: 5.1214
- Default zoom: 13
- Default radius: 3 km

### Color Palette
- Primary: `#2D6A4F` (deep green)
- Accent: `#40916C` (medium green)
- Light: `#95D5B2` (light green)
- Background: `#F8FAF9` (barely-green white)
- Cards: `#FFFFFF`
- Text: `#1B4332` (dark green-black)
- Muted: `#6B7280` (gray)

---

## Future (Post-MVP)
- Supabase integration (replace local JSON)
- Store owner authentication & dashboard
- Real-time stock updates
- Store owner onboarding flow
- Push notifications for stock changes
- Multi-city support
- Product images
- Reviews / ratings
- Directions integration
- Deployment to Vercel
