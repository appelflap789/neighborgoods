# NeighborGoods 2.0

A map-based local shopping discovery app for Utrecht. Browse stores, check real-time stock availability, and find products within a custom radius — all without leaving your neighborhood.

**Live site:** [neighborgoods.live](https://www.neighborgoods.live)

---

## Tech Stack

| Layer | Service / Library | Purpose |
|-------|-------------------|---------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) + TypeScript | Full-stack React framework |
| **Map** | [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) via [react-map-gl](https://visgl.github.io/react-map-gl/) | Interactive vector map, store markers, radius circle overlay |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) | Utility-first styling, accessible UI components |
| **Icons** | [Lucide React](https://lucide.dev) | Consistent SVG icon set throughout the UI |
| **Data** | Local JSON (mock) | Store and product data — structured to swap for Supabase later |
| **Geocoding** | [Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/) | Address search and location resolution |
| **Geolocation** | Browser Geolocation API | Detecting user's current position |

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

Get a free Mapbox token at [account.mapbox.com](https://account.mapbox.com).

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — landing page.
Open [http://localhost:3000/map](http://localhost:3000/map) — the map app.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── map/page.tsx          # Map application
│   └── api/                  # API routes (future)
├── components/
│   ├── landing/              # Landing page sections
│   ├── map/                  # Map, markers, radius control
│   ├── sidebar/              # Store list, store cards, product list
│   └── search/               # Search bar, category filters
├── hooks/
│   ├── useLocation.ts        # Browser geolocation + custom location state
│   ├── useStores.ts          # Store filtering by radius, search, category
│   └── useSearch.ts          # Search query and filter state
├── lib/
│   ├── data.ts               # Mock store and product data
│   ├── geo.ts                # Haversine distance, GeoJSON circle generator
│   ├── types.ts              # TypeScript interfaces (Store, Product)
│   └── utils.ts              # Tailwind class merge utility
└── config/
    └── constants.ts          # Default coordinates, radius limits, categories
```

---

## Roadmap

- [ ] Supabase integration (replace local JSON with PostGIS queries)
- [ ] Store owner authentication & self-service dashboard
- [ ] Real-time stock updates
- [ ] Mobile bottom sheet
- [ ] Multi-city support
- [ ] Deployment to Vercel

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
