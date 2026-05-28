"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { items } from "@/data/items";
import { FilterState } from "@/types";
import ItemCard from "@/components/ItemCard";
import FilterSidebar from "@/components/FilterSidebar";

const defaultFilters: FilterState = {
  category: "all",
  condition: "all",
  minPrice: 0,
  maxPrice: 0,
  size: "",
  searchQuery: "",
};

export default function Home() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (filters.category !== "all" && item.category !== filters.category)
        return false;
      if (filters.condition !== "all" && item.condition !== filters.condition)
        return false;
      if (filters.minPrice > 0 && item.price < filters.minPrice) return false;
      if (filters.maxPrice > 0 && item.price > filters.maxPrice) return false;
      if (filters.size && item.size !== filters.size) return false;
      if (
        search &&
        !item.title.toLowerCase().includes(search.toLowerCase()) &&
        !item.brand.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [filters, search]);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">
          Pre-loved fashion,{" "}
          <span className="text-emerald-600">new to you</span>
        </h1>
        <p className="text-stone-500 mt-1">{items.length} items available</p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          placeholder="Search by title or brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        <FilterSidebar filters={filters} onChange={setFilters} />

        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-stone-400">
              <p className="text-lg font-medium">No items found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-stone-400 mb-4">
                {filtered.length} item{filtered.length !== 1 ? "s" : ""} found
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
