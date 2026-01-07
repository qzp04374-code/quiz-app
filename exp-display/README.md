# quiz-app (ClassSync / exp-display)

授業運用の循環を最優先にした、投影（display）＋学生（student）＋教員（index）＋運用ツール群（CSV投入/TTS辞書）で構成されたクイズ運用アプリです。

---

## まず見るもの（仕様の正本）
`exp-display/` 配下に仕様と運用ルールを置いています。

- `exp-display/SPEC.md` … 仕様の正本（DB構造・画面挙動・view/mode/timer/TTS）
- `exp-display/STABLE_CHECKLIST.md` … **壊さない不変条件**＋毎回のスモークテスト
- `exp-display/CHANGELOG.md` … 変更ログ（1行で差分を追う）

---

## 画面（URL）
- 教員画面：`/quiz-app/exp-display/index.html`
- 投影：`/quiz-app/exp-display/display.html`
- 学生：`/quiz-app/exp-display/student.html`
- CSV投入：`/quiz-app/exp-display/import-csv.html`
- 読み上げ辞書：`/quiz-app/exp-display/dict-editor.html`（tts-dict.json編集）

運用時は room を付与します：
- `.../display.html?room=kyoto-01`
- `.../student.html?room=kyoto-01`
- `.../import-csv.html?room=kyoto-01`

---

## 授業当日の標準手順（推奨）
1. CSV投入（`import-csv.html`）
2. 投影を開く（`display.html`）
   - 起動時はQR強制ON（参加導線）
3. 学生が入室（参加人数が増える）
4. 教員画面で「QRを消す」→ standby（出題待ち）
5. 「次の問題」→ quiz/open で出題開始
6. 必要ならタイマー（20/30/60）で自動close運用
7. 「解答終了」→ `status="closed"` で正解・解説を上段表示
8. 次の問題へ

---

## 安定版タグ（重要）
タグを「復旧ポイント」として運用します（stableは付け替えない）。

---

## 開発ポリシー（削除事故を防ぐ）
- 既存機能は削除しない（無効化は flag で）
- 1回の変更で触るファイルは原則1つ
- 変更後は `STABLE_CHECKLIST.md` の Smoke Test を通す
- キャッシュ事故回避のため build 表示 + `?v=<build>` 運用を推奨
