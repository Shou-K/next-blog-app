"use client";
import type { Post } from "@/app/_types/Post";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";

type Props = {
  post: Post;
};

const PostSummary: React.FC<Props> = ({ post }) => {
  const dtFmt = "YYYY-MM-DD";

  // 評価を星で表示
  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="border border-slate-400 p-3">
      <div className="flex items-center justify-between">
        <div>{dayjs(post.createdAt).format(dtFmt)}</div>
        <div className="flex space-x-1.5">
          {post.categories.map((category) => (
            <div
              key={category.id}
              className={twMerge(
                "rounded-md px-2 py-0.5",
                "text-xs font-bold",
                "border border-slate-400 text-slate-500"
              )}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>

      {/* タイトルのみ表示 */}
      <Link href={`/posts/${post.id}`}>
        <div className="mb-1 text-lg font-bold hover:underline">
          {post.title}
        </div>
      </Link>

      {/* 評価と所要時間の追加 */}
      <div className="mt-2 flex justify-between text-sm text-gray-600">
        <div>
          所要時間:
          {post.duration !== null && post.duration !== undefined
            ? `${post.duration}時間`
            : "未設定"}
        </div>
        <div className="text-yellow-500 text-lg">
          評価:
          {post.rating !== null && post.rating !== undefined
            ? renderStars(Number(post.rating))
            : "未評価"}
        </div>
      </div>
    </div>
  );
};

export default PostSummary;
