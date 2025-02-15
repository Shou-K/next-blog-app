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

  return (
    <main className="max-w-2xl mx-auto p-4">
      <div className="space-y-2">
        <h1 className="mb-2 text-2xl font-bold">{post.title}</h1>
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
