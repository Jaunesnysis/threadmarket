"use client";

import { FilterState } from "@/types";
import { sizes, conditionLabels } from "@/data/items";

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "tops", label: "Tops" },
  { value: "bottoms", label: "Bottoms" },
  { value: "dresses", label: "Dresses" },
  { value: "outerwear", label: "Outerwear" },
  { value: "shoes", label: "Shoes" },
  { value: "accessories", label: "Accessories" },
];

const conditions = [
  { value: "all", label: "All Conditions" },
  ...Object.entries(conditionLabels).map(([value, label]) => ({
    value,
    label,
  })),
];

export default function FilterSidebar({
  filters,
  onChange,
}: FilterSidebarProps) {
  const update = (partial: Partial<FilterState>) => {
    onChange({ ...filters, ...partial });
  };

  return (
    <aside className="w-full lg:w-56 shrink-0 space-y-6">
      {/* Category */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
          Category
        </h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() =>
                update({ category: cat.value as FilterState["category"] })
              }
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                filters.category === cat.value
                  ? "bg-emerald-50 text-emerald-700 font-medium"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
          Condition
        </h3>
        <div className="space-y-1">
          {conditions.map((cond) => (
            <button
              key={cond.value}
              onClick={() =>
                update({ condition: cond.value as FilterState["condition"] })
              }
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                filters.condition === cond.value
                  ? "bg-emerald-50 text-emerald-700 font-medium"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              {cond.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ""}
            onChange={(e) => update({ minPrice: Number(e.target.value) })}
            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <span className="text-stone-400">—</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ""}
            onChange={(e) => update({ maxPrice: Number(e.target.value) })}
            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() =>
                update({ size: filters.size === size ? "" : size })
              }
              className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
                filters.size === size
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "border-stone-200 text-stone-600 hover:border-stone-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() =>
          onChange({
            category: "all",
            condition: "all",
            minPrice: 0,
            maxPrice: 0,
            size: "",
            searchQuery: "",
          })
        }
        className="w-full text-sm text-stone-400 hover:text-stone-600 transition-colors underline underline-offset-2"
      >
        Reset filters
      </button>
    </aside>
  );
}
