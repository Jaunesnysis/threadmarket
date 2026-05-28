export interface Item {
  id: string;
  title: string;
  brand: string;
  price: number;
  size: string;
  category: Category;
  condition: Condition;
  images: string[];
  description: string;
  seller: Seller;
  location: string;
  createdAt: string;
  favorites: number;
  views: number;
}

export interface Seller {
  id: string;
  username: string;
  avatar: string;
  rating: number;
  totalSales: number;
}

export type Category =
  | "tops"
  | "bottoms"
  | "dresses"
  | "outerwear"
  | "shoes"
  | "accessories";

export type Condition = "new_with_tags" | "like_new" | "good" | "fair";

export interface FilterState {
  category: Category | "all";
  condition: Condition | "all";
  minPrice: number;
  maxPrice: number;
  size: string;
  searchQuery: string;
}
