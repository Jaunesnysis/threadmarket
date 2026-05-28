"use client";

import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { items } from "@/data/items";
import { useAppSelector } from "@/store/hooks";
import ItemCard from "@/components/ItemCard";
import { useState, useEffect } from "react";

export default function FavoritesPage() {
  const favoriteIds = useAppSelector((state) => state.favorites.ids);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const favoriteItems = mounted
    ? items.filter((item) => favoriteIds.includes(item.id))
    : [];

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to listings
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 flex items-center gap-3">
          <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
          Your Favorites
        </h1>
        <p className="text-stone-500 mt-1">
          {mounted
            ? `${favoriteItems.length} saved item${favoriteItems.length !== 1 ? "s" : ""}`
            : "Loading..."}
        </p>
      </div>

      {!mounted ? null : favoriteItems.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="w-12 h-12 text-stone-200 mx-auto mb-4" />
          <p className="text-lg font-medium text-stone-400">No favorites yet</p>
          <p className="text-sm text-stone-400 mt-1">
            Tap the heart on any item to save it here
          </p>
          <Link
            href="/"
            className="inline-block mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-2xl transition-colors text-sm"
          >
            Browse items
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {favoriteItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
