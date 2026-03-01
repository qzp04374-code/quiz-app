# ClassSync v2 設計仕様書

## exp-display-v2 バージョンアップ計画

---

# 1. 目的

ClassSync を以下の機能に拡張する：

* 動画表示 → 問題出題
* 静止画表示 → 問題出題
* ゲーム画面の追加
* 既存v1を壊さない並行開発

---

# 2. ディレクトリ構成

```
/exp-display/        ← 現行安定版
/exp-display-v2/     ← 新バージョン
```

v2は独立して動作する。

QRは必ず v2/student.html を指す。

---

# 3. 画面責務（絶対原則）

| 画面           | 役割                 |
| ------------ | ------------------ |
| index.html   | 教員操作（書き込みのみ）       |
| student.html | 学生回答（answersのみ書く）  |
| display.html | 投影（原則書き込まない）       |
| game.html    | 投影用ゲーム画面（原則書き込まない） |

---

# 4. Firebase拡張（v2追加）

既存構造は維持する。

追加：

```
rooms/{room}/quiz/present/phase
```

値：

* "qr"
* "media"
* "question"
* "explain"
* "game"

---

## 4.1 media拡張（questions内）

```
rooms/{room}/questions/{qid}/media
    type: "video" | "image"
    url: string
    caption: string
    autoplay: boolean
    muted: boolean
    loop: boolean
    objectFit: "contain" | "cover"
```

mediaが無い場合は通常問題表示。

---

## 4.2 game拡張

```
rooms/{room}/game/status
rooms/{room}/game/title
rooms/{room}/game/winner
rooms/{room}/game/score/{userId}
```

---

# 5. 表示フロー（A方式）

1. phase="qr"
2. phase="media"
3. phase="question"
4. activity.status="open"
5. activity.status="closed" → phase="explain"
6. phase="game"（任意）

---

# 6. session運用

* QR表示時に session 発行
* 問題切替時は session を維持
* student は URLの s と activity.session を照合
* 不一致のみロック

---

# 7. UI設計方針

* px禁止
* CSS変数 + rem + clamp
* iPhone風
* 大型ボタン
* プロジェクター対応

---

# 8. 開発順序

1. v2ディレクトリ作成
2. QRをv2 studentへ変更
3. phase導入
4. media表示実装
5. game画面実装

---

# 9. 安全原則

* displayは原則書き込まない
* indexのみ状態変更
* sessionはQR時のみ更新
* 既存v1は変更しない

---

# 10. 将来拡張

* メディア自動遷移タイマー
* unit別可視化
* 早押しゲーム
* ポイント制

---

**End of Spec**

---

# 🟦 なぜこれが重要か

これがあると：

* GPTが仕様を誤解しない
* 将来の開発者が迷わない
* 破壊的改修を防げる
* Firebase構造がぶれない

---

