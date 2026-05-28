"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { Heart, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const favoriteCount = useAppSelector((state) => state.favorites.ids.length);

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-emerald-600" />
            <span className="text-xl font-bold tracking-tight">
              thread<span className="text-emerald-600">market</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/favorites"
              className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {favoriteCount > 0 && (
                <span className="bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
