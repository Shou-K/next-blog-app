"use client";
import { useState, useEffect } from "react";
import type { Post } from "@/app/_types/Post";
import PostSummary from "@/app/_components/PostSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Page: React.FC = () => {
  // 投稿データの状態管理
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 投稿データを取得
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("投稿データの取得に失敗しました");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "不明なエラーが発生しました"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // ローディング中
  if (loading) {
    return (
      <div className="text-gray-500 flex items-center justify-center h-screen">
        <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
        Loading...
      </div>
    );
  }

  // エラーが発生した場合
  if (error) {
    return <div className="text-red-500 text-center">エラー: {error}</div>;
  }

  // 投稿データが空の場合
  if (!posts || posts.length === 0) {
    return (
      <div className="text-gray-500 text-center">投稿記事がありません</div>
    );
  }

  // 投稿記事の表示
  return (
    <main className="max-w-2xl mx-auto p-4">
      <div className="mb-4 text-2xl font-bold">最新の投稿</div>
      <div className="space-y-3">
        {posts.map((post) => (
          <PostSummary key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default Page;
