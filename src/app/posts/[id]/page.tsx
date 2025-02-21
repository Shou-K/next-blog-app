"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import type { Post } from "@/app/_types/Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";

// 投稿記事の詳細表示 /posts/[id]
const Page: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // URLパラメータから id を取得
  const { id } = useParams() as { id: string };

  // 投稿データを取得
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) throw new Error("投稿データの取得に失敗しました");
        const data = await response.json();
        console.log("取得した投稿データ:", JSON.stringify(data, null, 2)); // ◀ JSON 形式で確認
        setPost(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "不明なエラーが発生しました"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // ローディング中
  if (isLoading) {
    return (
      <div className="text-gray-500 flex items-center justify-center h-screen">
        <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
        Loading...
      </div>
    );
  }

  // エラー表示
  if (error) {
    return <div className="text-red-500 text-center">エラー: {error}</div>;
  }

  // 投稿が見つからなかった場合
  if (!post) {
    return (
      <div className="text-gray-500 text-center">
        指定idの投稿が見つかりません
      </div>
    );
  }

  // HTMLコンテンツのサニタイズ
  const safeHTML = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: ["b", "strong", "i", "em", "u", "br"],
  });

  // 評価を星で表示
  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <main className="max-w-2xl mx-auto p-4">
      <div className="space-y-2">
        {/* タイトル＋評価＋所要時間 */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <span className="text-yellow-500 text-lg">
            {post.rating ? renderStars(Number(post.rating)) : "未評価"}
          </span>
          <span className="text-gray-600 text-sm">
            {post.duration ? `${post.duration}時間` : "未設定"}
          </span>
        </div>

        {post.coverImage && (
          <Image
            src={post.coverImage.url}
            alt="Cover Image"
            width={post.coverImage.width}
            height={post.coverImage.height}
            priority
            className="rounded-xl"
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
      </div>
    </main>
  );
};

export default Page;
