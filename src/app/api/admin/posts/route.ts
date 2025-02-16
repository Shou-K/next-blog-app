//テーブルに新しい投稿をポストする処理
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import { Post } from "@prisma/client";
import { supabase } from "@/utils/supabase"; // ◀ 追加

type RequestBody = {
  //新規作成する4つの要素の型を指定する
  title: string;
  content: string;
  coverImageURL: string;
  categoryIds: string[];
  duration?: string; // ◀ 所要時間（省略可能）
  rating?: string; // ◀ 評価（省略可能）
};

export const POST = async (req: NextRequest) => {
  // JWTトークンの検証・認証
  const token = req.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 401 });

  try {
    const requestBody: RequestBody = await req.json();

    // 分割代入
    const { title, content, coverImageURL, categoryIds, duration, rating } =
      requestBody;

    // categoryIds の存在確認
    const categories = await prisma.category.findMany({
      where: { id: { in: categoryIds } },
    });

    if (categories.length !== categoryIds.length) {
      return NextResponse.json(
        { error: "指定されたカテゴリのいくつかが存在しません" },
        { status: 400 }
      );
    }

    // 投稿記事を作成
    const post = await prisma.post.create({
      data: {
        title,
        content,
        coverImageURL,
        duration, // ◀ 追加
        rating, // ◀ 追加
      },
    });

    // 中間テーブルにレコードを追加
    await prisma.postCategory.createMany({
      data: categoryIds.map((categoryId) => ({
        postId: post.id,
        categoryId,
      })),
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "投稿記事の作成に失敗しました" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  //テーブルから記事を取得している。
  try {
    const posts = await prisma.post.findMany({
      // ◀ 推論を利用して posts の型を決定
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(posts); //ここでidやtitleなどの塊(posts)を送っている。
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "投稿記事の一覧の取得に失敗しました" },
      { status: 500 }
    );
  }
};
