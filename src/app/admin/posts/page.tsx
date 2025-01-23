"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dayjs from "dayjs";

type Category = {
  id: string;
  name: string;
};

type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  categories: Category[];
};

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 投稿記事データを取得
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/posts");
      if (!response.ok) throw new Error("投稿記事の取得に失敗しました");
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "不明なエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  // 投稿記事を削除
  const deletePost = async (id: string) => {
    if (!confirm("本当にこの投稿記事を削除しますか？")) return;
    try {
      const response = await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("投稿記事の削除に失敗しました");
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "不明なエラーが発生しました");
    }
  };

  // 初回レンダリング時に投稿記事データを取得
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">投稿記事一覧</h1>
      {loading && <p>読み込み中...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">タイトル</th>
            <th className="border border-gray-400 px-4 py-2">記事内容</th>
            <th className="border border-gray-400 px-4 py-2">作成日</th>
            <th className="border border-gray-400 px-4 py-2">カテゴリ</th>
            <th className="border border-gray-400 px-4 py-2">アクション</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="border border-gray-400 px-8 py-2">{post.title}</td>
              <td className="border border-gray-400 px-4 py-2">{post.content}</td>
              <td className="border border-gray-400 px-4 py-2">
                {dayjs(post.createdAt).format("YYYY-MM-DD")}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {post.categories.map((category) => (
                  <span
                    key={category.id}
                    className="inline-block bg-gray-200 text-gray-800 text-xs font-medium mr-2 px-6 py-1 rounded">
                    {category.name}
                  </span>
                ))}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                <Link href={`posts/${post.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded mr-2">
                    編集
                  </button>
                </Link>
                <button
                  className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded"
                  onClick={() => deletePost(post.id)}
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className="py-2" href="/admin/posts/new">
          <button className="bg-green-500 text-white px-4 py-4 rounded mr-2 font-bold hover:bg-green-400">
              新規の投稿作成
          </button>
      </Link>
    </div>
  );
};

export default PostsPage;
