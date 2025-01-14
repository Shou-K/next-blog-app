//POSTリクエストを受け取る場所
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { Category } from "@prisma/client";

//どんな形でリクエストを受けるのかを指定
type RequestBody = {
  name: string;
};

export const POST = async (req: NextRequest) => {//この一文がエンドポイント　リクエスト処理＆レスポンス
  try {
    const { name }: RequestBody = await req.json();//リクエストボディの解析　JSON型として変換
    const category: Category = await prisma.category.create({//データベースに新しいデータを挿入
      data: {
        name,
      },
    });
    return NextResponse.json(category);//成功するとレスポンスを返す
  } catch (error) {//こっち側はエラー処理
    console.error(error);
    return NextResponse.json(
      { error: "カテゴリの作成に失敗しました" },
      { status: 500 }
    );
  }
};