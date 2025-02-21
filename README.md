This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## はじめに

- こんにちは。小説集めにはまっているShou-Kです。
- 今回は、「読んだ小説投稿アプリ」を作成しました。

## プロジェクト概要

- 読んだ小説についての感想や、評価、読むのにかかった時間を投稿できます。
- 面白かった本を簡単に広めることができたらと思い作成しています。

## 使用したもの

- Next.js　　アプリ開発の大本
- supabase　　投稿内容のテーブル管理(https://supabase.com/)
- vercel　　アプリの公開(https://vercel.com/shouks-projects)

## 機能

**ヘッダー**

| ボタン | 操作 |

- | Reading Record | ホーム画面へ |
- | 管理者操作 | 管理者操作画面へ（Login状態の場合） |
- | Login (or Logout) | ログイン画面へ（投下時ログアウト） |
- | ユーザー | ユーザー情報へ |

**管理者操作画面**

- | 投稿記事一覧 | 投稿記事の編集、削除 |
- |カテゴリ一覧 | カテゴリの編集、削除 |
- |新規投稿 | 投稿の新規作成 |
- |カテゴリの追加 | カテゴリの新規作成 |

## 開発サーバー起動方法

VSCodeターミナルなどで実行できます。

```bash
npm run dev
```

## 今後の展望

- UIを本棚のようにして表示したい
- スマホの写真をそのまま載せられるようにしたい

## 開発ログ

- **2/19**　
- 読書時間と評価を表示に成功
- ホーム画面にて登録した時間と評価が正しく記載されないバグが発生中
- テーブルでは数値がnullになっているため正しく値の登録が行えていない模様
- **現在修正中です**

- **2/21**
- 評価、所要時間が未設定、未評価になるバグを修正
- 正しく表示されるように

## vercel URL

- https://next-blog-app-shouk.vercel.app/
