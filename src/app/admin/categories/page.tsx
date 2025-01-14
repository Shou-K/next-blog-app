"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Category = {
  id: string;
  name: string;
};

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // カテゴリデータを取得
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) throw new Error("カテゴリの取得に失敗しました");
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "不明なエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  // カテゴリを削除
  const deleteCategory = async (id: string) => {
    if (!confirm("本当にこのカテゴリを削除しますか？")) return;
    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("カテゴリの削除に失敗しました");
      setCategories(categories.filter((category) => category.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "不明なエラーが発生しました");
    }
  };

  // 初回レンダリング時にカテゴリデータを取得
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">カテゴリ管理</h1>
      {loading && <p>読み込み中...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">カテゴリ名</th>
            <th className="border border-gray-400 px-4 py-2">アクション</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="border border-gray-400 px-4 py-2">{category.id}</td>
              <td className="border border-gray-400 px-4 py-2">{category.name}</td>
              <td className="border border-gray-400 px-4 py-2">
                <Link href={`/admin/categories/${category.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded mr-2">
                    編集
                  </button>
                </Link>
                <button
                  className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded"
                  onClick={() => deleteCategory(category.id)}
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/admin/categories/new">
            <button className="bg-green-500 hover:bg-green-400 text-white px-4 py-4 rounded mr-2 font-bold">
              カテゴリの作成
            </button>
      </Link>
    </div>
  );
};

export default CategoriesPage;
