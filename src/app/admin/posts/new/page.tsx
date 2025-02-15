"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";
import { useAuth } from "@/app/_hooks/useAuth";

// カテゴリの型
type CategoryApiResponse = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};
type SelectableCategory = { id: string; name: string; isSelect: boolean };

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchErrorMsg, setFetchErrorMsg] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCoverImageURL, setNewCoverImageURL] = useState("");
  const [newCoverImageKey, setNewCoverImageKey] = useState("");

  const router = useRouter();
  const { token } = useAuth();
  const [checkableCategories, setCheckableCategories] = useState<
    SelectableCategory[] | null
  >(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/categories", {
          method: "GET",
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
        const apiResBody = (await res.json()) as CategoryApiResponse[];
        setCheckableCategories(
          apiResBody.map((body) => ({
            id: body.id,
            name: body.name,
            isSelect: false,
          }))
        );
      } catch (error) {
        setFetchErrorMsg(
          `カテゴリの一覧のフェッチに失敗しました: ${error instanceof Error ? error.message : error}`
        );
        setCheckableCategories(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const switchCategoryState = (categoryId: string) => {
    if (!checkableCategories) return;
    setCheckableCategories(
      checkableCategories.map((category) =>
        category.id === categoryId
          ? { ...category, isSelect: !category.isSelect }
          : category
      )
    );
  };

  const updateNewCoverImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);

      const { url, key } = await res.json();
      setNewCoverImageURL(url);
      setNewCoverImageKey(key);
    } catch (error) {
      console.error("画像のアップロードに失敗しました", error);
      window.alert("画像のアップロードに失敗しました");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      window.alert("予期せぬ動作：トークンが取得できません。");
      return;
    }

    setIsSubmitting(true);
    try {
      const requestBody = {
        title: newTitle,
        content: newContent,
        coverImageURL: newCoverImageURL,
        coverImageKey: newCoverImageKey,
        categoryIds: checkableCategories
          ? checkableCategories.filter((c) => c.isSelect).map((c) => c.id)
          : [],
      };

      const res = await fetch("/api/admin/posts", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);

      const postResponse = await res.json();
      setIsSubmitting(false);
      router.push(`/posts/${postResponse.id}`);
    } catch (error) {
      console.error("投稿記事の作成に失敗しました", error);
      window.alert("投稿記事の作成に失敗しました");
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-4 text-2xl font-bold">投稿記事の新規作成</div>

      <form
        onSubmit={handleSubmit}
        className={twMerge("space-y-4", isSubmitting && "opacity-50")}
      >
        <div className="space-y-1">
          <label htmlFor="title" className="block font-bold">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full rounded-md border-2 px-2 py-1"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="content" className="block font-bold">
            本文
          </label>
          <textarea
            id="content"
            name="content"
            className="h-48 w-full rounded-md border-2 px-2 py-1"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block font-bold">カバーイメージ</label>
          <input
            type="file"
            id="coverImage"
            onChange={updateNewCoverImage}
            accept="image/*"
          />
          {newCoverImageURL && (
            <img
              src={newCoverImageURL}
              alt="カバー画像"
              className="mt-2 w-48 rounded-md"
            />
          )}
        </div>

        <button
          type="submit"
          className={twMerge(
            "rounded-md px-5 py-1 font-bold bg-indigo-500 text-white hover:bg-indigo-600",
            isSubmitting && "opacity-50"
          )}
          disabled={isSubmitting}
        >
          記事を投稿
        </button>
      </form>
    </div>
  );
};

export default Page;
