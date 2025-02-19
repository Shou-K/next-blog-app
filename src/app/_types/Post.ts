import { Category } from "./Category";
import { CoverImage } from "./CoverImage";

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  duration: string; // ◀ 所要時間（省略可能）
  rating: string; // ◀ 評価（省略可能）
  categories: Category[];
  coverImage: CoverImage;
};
