"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
};

type Post = {
  id: string;
  title: string;
  categories: string[]; // 選択されたカテゴリID
};

const EditPostPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const postId = params.id;

  const [post, setPost] = useState<Post | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 投稿記事のデータを取得
  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`);
      if (!response.ok) throw new Error("投稿記事の取得に失敗しました");
      const data = await response.json();
      setPost(data);
      setTitle(data.title);
      setSelectedCategories(data.categories);
    } catch (err) {
      setError(err instanceof Error ? err.message : "不明なエラーが発生しました");
    }
  };

  // カテゴリ一覧を取得
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) throw new Error("カテゴリ一覧の取得に失敗しました");
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "不明なエラーが発生しました");
    }
  };

  // 初期データの取得
  useEffect(() => {
    fetchPost();
    fetchCategories();
  }, []);

  // 更新リクエスト
  const handleUpdatePost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          categoryIds: selectedCategories,
        }),
      });
      if (!response.ok) throw new Error("投稿記事の更新に失敗しました");
      alert("投稿記事を更新しました");
      router.push("/admin/posts");
    } catch (err) {
      alert(err instanceof Error ? err.message : "不明なエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!post) {
    return <p>読み込み中...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">投稿記事の編集</h1>

      <div className="mb-4">
        <label className="block mb-1 font-bold" htmlFor="title">
          タイトル
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-400 p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-bold">カテゴリ</label>
        <div>
          {categories.map((category) => (
            <label key={category.id} className="block">
              <input
                type="checkbox"
                value={category.id}
                checked={selectedCategories.includes(category.id)}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedCategories((prev) =>
                    prev.includes(value)
                      ? prev.filter((id) => id !== value)
                      : [...prev, value]
                  );
                }}
              />
              <span className="ml-2">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded"
          onClick={handleUpdatePost}
          disabled={loading}
        >
          {loading ? "保存中..." : "変更を確定"}
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded"
          onClick={() => router.push("/admin/posts")}
        >
          一覧に戻る
        </button>
      </div>
    </div>
  );
};

export default EditPostPage;
