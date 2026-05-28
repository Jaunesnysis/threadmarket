"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Item } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite } from "@/store/favoritesSlice";
import { conditionLabels } from "@/data/items";
import { useEffect, useState } from "react";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  const dispatch = useAppDispatch();
  const isFavorited = useAppSelector((state) =>
    state.favorites.ids.includes(item.id),
  );
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleFavorite(item.id));
  };

  return (
    <Link href={`/item/${item.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-stone-300 hover:shadow-md transition-all duration-200">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
          <Image
            src={item.images[0]}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {/* Condition badge */}
          <div className="absolute top-2 left-2">
            <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full text-stone-700">
              {conditionLabels[item.condition]}
            </span>
          </div>
          {/* Favorite button */}
          <button
            onClick={handleFavorite}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-150"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                mounted && isFavorited
                  ? "fill-rose-500 text-rose-500"
                  : "text-stone-400"
              }`}
            />
          </button>
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-xs text-stone-400 font-medium uppercase tracking-wide">
            {item.brand}
          </p>
          <p className="text-sm text-stone-800 font-medium mt-0.5 truncate">
            {item.title}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-base font-bold text-stone-900">
              €{item.price}
            </span>
            <span className="text-xs text-stone-400 bg-stone-50 px-2 py-0.5 rounded-full">
              {item.size}
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">{item.location}</p>
        </div>
      </div>
    </Link>
  );
}
