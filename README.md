# ThreadMarket

A second-hand fashion marketplace. Browse, filter, and save pre-loved clothing and accessories.
---

## Tech Stack

| Layer            | Technology                   |
| ---------------- | ---------------------------- |
| Framework        | Next.js 15 (App Router)      |
| Language         | TypeScript                   |
| State Management | Redux Toolkit                |
| Styling          | Tailwind CSS                 |
| Testing          | Jest + React Testing Library |

## Features

- **Item grid** — browse 8 pre-loved items with photos, brand, price, size and condition
- **Filters** — filter by category, condition, price range and size
- **Search** — search by title or brand
- **Favorites** — save items with a heart, persisted via localStorage across sessions
- **Item detail page** — full item info, seller profile, rating and sales count
- **Favorites page** — view all saved items in one place
- **Responsive** — mobile-first layout

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tests

```bash
npx jest
```

5 unit tests covering ItemCard rendering and favorites toggle behaviour.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home — item grid + filters + search
│   ├── item/[id]/page.tsx    # Item detail page
│   ├── favorites/page.tsx    # Saved items page
│   └── layout.tsx            # Root layout with Redux provider
├── components/
│   ├── ItemCard.tsx          # Item card with favorites toggle
│   ├── FilterSidebar.tsx     # Category, condition, price, size filters
│   ├── Navbar.tsx            # Nav with favorites count badge
│   └── Providers.tsx         # Redux Provider wrapper
├── store/
│   ├── store.ts              # Redux store with localStorage persistence
│   ├── favoritesSlice.ts     # Favorites state and actions
│   └── hooks.ts              # Typed useAppDispatch and useAppSelector
├── data/
│   └── items.ts              # Mock item data
├── types/
│   └── index.ts              # TypeScript interfaces
└── __tests__/
    └── ItemCard.test.tsx     # Jest unit tests
```
