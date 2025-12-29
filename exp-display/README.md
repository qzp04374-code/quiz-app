# quiz-app (ClassSync / exp-display)

授業運用の循環を最優先にした、投影（display）＋学生（student）＋教員（index）＋CSV投入（import-csv）構成のクイズ運用アプリです。

---

## まず見るもの（仕様の正本）
`exp-display/` 配下に仕様と運用ルールを置いています。

- `exp-display/SPEC.md` … 仕様の正本（DB構造・画面挙動・mode/viewなど）
- `exp-display/STABLE_CHECKLIST.md` … **壊さない不変条件**＋毎回のスモークテスト
- `exp-display/CHANGELOG.md` … 変更ログ（1行で差分を追う）

---

## 安定版タグ（重要）
このリポジトリは **タグを「復旧ポイント」として運用**します。

- `stable-2025-12-28`  
  - **授業当日の復旧用（動作が成立した完成版）**
- `stable-2025-12-29`  
  - `stable-2025-12-28` + ドキュメント追加（SPEC / CHECKLIST / CHANGELOG）  
  - **今後の作業の基準タグ（おすすめ）**

> 原則：stableタグは「増やすだけ」。既存stableの付け替えはしない。

---

## 公開URL（GitHub Pages）
- 教員画面：`/quiz-app/exp-display/index.html`
- 投影：`/quiz-app/exp-display/display.html`
- 学生：`/quiz-app/exp-display/student.html`
- CSV投入：`/quiz-app/exp-display/import-csv.html`

運用時は room を付与します：
- `.../display.html?room=kyoto-01`
- `.../student.html?room=kyoto-01`
- `.../import-csv.html?room=kyoto-01`

---

## 授業当日の標準手順
1. CSV投入（`import-csv.html`）
2. 投影を開く（`display.html`）  
   - 起動時はQR強制ON（参加導線）
3. 学生が入室（参加人数が増える）
4. 教員画面で「QRを消す（出題開始）」  
   - `open/view/mode/config` を保証して出題可能状態へ
5. 回答が集計・表示（縦棒）
6. 「解答終了」→ `status="closed"` で正解・解説（上段）
7. 「次の問題」へ

---

## 壊れたとき（復旧の考え方）
- まず `STABLE_CHECKLIST.md` の Smoke Test で「どこが壊れたか」を特定
- すぐ授業を回す必要がある場合は **stableタグへ戻す**（復旧ポイント）

---

## 開発ポリシー（削除事故を防ぐ）
- 既存機能は削除しない（無効化は flag で）
- 1回の変更で触るファイルは原則1つ
- 変更後は `STABLE_CHECKLIST.md` の Smoke Test を通す
- キャッシュ事故回避のため build 表示 + `?v=<build>` 運用を推奨

---

## ルーム（運用）
教員画面の roomSelect は JS配列で生成し、削除事故を防止しています。

例：
- kyoto-01 / kyoto-02
- sendai-01 / sendai-02
- nagoya-01 / nagoya-02
