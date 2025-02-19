This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## プロジェクト概要

こんにちは
最近、小説集めにはまっているShou-Kです。

**読んだ小説の評価、感想投稿アプリ**
を開発しました。
アプリ開発にはnext.js、投稿記事のテーブル管理にsupabase、公開にgithubおよびvercelを使用しています。

## 機能

**ヘッダー**

- Reading Record　→　ホーム画面へ
- 管理者操作 →　管理者操作画面へ(Login状態の場合)
- Login(or Logout)→　ログイン画面へ(投下時ログアウト)
- ユーザー →　ユーザー情報へ

**管理者操作画面**

- 投稿記事一覧　　→　投稿記事の編集、削除
- カテゴリ一覧　　→　カテゴリの編集、削除
- 新規投稿　　　 →　投稿の新規作成
- カテゴリの追加 →　カテゴリの新規作成

## 開発サーバー起動方法

VSCodeターミナルなどで実行できます。

```bash
npm run dev
```

## 開発ログ

2/19日　読書時間と評価を表示に成功
ホーム画面にて登録した時間と評価が正しく記載されないバグが発生中
テーブルでは数値がnullになっているため正しく値の登録が行えていない模様
**現在修正中**

ブラウザ
Open [http://localhost:3000](http://localhost:3000)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
