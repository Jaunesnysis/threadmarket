"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, ArrowLeft, Eye, MapPin, Star, Package } from "lucide-react";
import { items, conditionLabels } from "@/data/items";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite } from "@/store/favoritesSlice";

export default function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const item = items.find((i) => i.id === id);

  const dispatch = useAppDispatch();
  const isFavorited = useAppSelector((state) =>
    state.favorites.ids.includes(id),
  );

  if (!item) notFound();

  return (
    <div>
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100">
          <Image
            src={item.images[0]}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          {/* Title & price */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-1">
              {item.brand}
            </p>
            <h1 className="text-2xl font-bold text-stone-900">{item.title}</h1>
            <p className="text-3xl font-bold text-stone-900 mt-3">
              €{item.price}
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="bg-stone-100 text-stone-700 text-sm px-3 py-1.5 rounded-full font-medium">
              {conditionLabels[item.condition]}
            </span>
            <span className="bg-stone-100 text-stone-700 text-sm px-3 py-1.5 rounded-full font-medium">
              Size {item.size}
            </span>
            <span className="bg-stone-100 text-stone-700 text-sm px-3 py-1.5 rounded-full font-medium capitalize">
              {item.category}
            </span>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-400 mb-2">
              Description
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-4 text-sm text-stone-400">
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4" />
              {item.favorites} favorites
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              {item.views} views
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {item.location}
            </span>
          </div>

          {/* Seller */}
          <div className="bg-stone-50 rounded-2xl p-4 flex items-center gap-4">
            <Image
              src={item.seller.avatar}
              alt={item.seller.username}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div className="flex-1">
              <p className="font-semibold text-stone-900">
                {item.seller.username}
              </p>
              <div className="flex items-center gap-3 text-sm text-stone-500 mt-0.5">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {item.seller.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Package className="w-3.5 h-3.5" />
                  {item.seller.totalSales} sales
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-auto">
            <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-2xl transition-colors">
              Buy now
            </button>
            <button
              onClick={() => dispatch(toggleFavorite(item.id))}
              className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-colors ${
                isFavorited
                  ? "border-rose-300 bg-rose-50"
                  : "border-stone-200 hover:border-stone-300"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorited ? "fill-rose-500 text-rose-500" : "text-stone-400"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
