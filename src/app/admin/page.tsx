//ここは管理者画面からの操作ページ
"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";

const Page: React.FC = () => {
  return (
    <main>
      <div className="mb-2 text-2xl font-bold">管理者用機能の一覧</div>
      <ul>
        <li className="py-2">
          <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
          <Link href="/admin/posts">
            <button className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-4 rounded mr-2 font-bold">
              投稿記事一覧
            </button>
          </Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
          <Link href="/admin/categories">
            <button className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-4 rounded mr-2 font-bold">
              カテゴリ一覧
            </button>
          </Link>
        </li>
        <li className="py-2">
          <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
          <Link href="/admin/posts/new">
            <button className="bg-green-500 hover:bg-green-400 text-white px-4 py-4 rounded mr-2 font-bold">
              新規投稿
            </button>
          </Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
          <Link href="/admin/categories/new">
            <button className="bg-green-500 hover:bg-green-400 text-white px-4 py-4 rounded mr-2 font-bold">
              カテゴリの追加
            </button>
          </Link>
        </li>
      </ul>
    </main>
  );
};

export default Page;
