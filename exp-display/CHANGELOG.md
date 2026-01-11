# CHANGELOG

## ClassSync exp-display 変更ログ（1行で差分追跡する）

### 書き方ルール
- 1変更＝1エントリ（長文禁止）
- 必ず「何を」「なぜ」「影響範囲（ファイル）」を短く書く
- 変更したら Smoke Test の結果を一言添える

### テンプレ
YYYY-MM-DD build:xxxx [変更種別] 対象: / 内容: <1行> / 理由: <1行> / Test: <OK/NGとどこを確認したか>

変更種別例：
- FIX（不具合修正）
- ADD（機能追加）
- UI（見た目/導線）
- SAFE（安全装置・互換性）
- OPS（運用改善）

### ログ
2025-12-28 build:teacher-roomlist-js-v1 [SAFE] 対象:index.html / 内容: roomSelectをJS配列生成に変更し6room対応 / 理由: option削除事故を防止 / Test: QR→解除→poll→quiz→closed OK（kyoto-01/02）
2025-12-28 build:import-fix-header-v1 [FIX] 対象:import-csv.html / 内容: choiceA〜のヘッダ正規化を一致させchoicesが入るよう修正 / 理由: 集計は出るが選択肢文が出ない事故対策 / Test: CSV再投入後 index/displayで選択肢表示OK


## [Unreleased]
- display: TEXT一覧の全幅表示（ToDo3）
- expectedN（母数）の運用導入（ToDo4）
  - indexに「母数=投票人数」ボタン
  - displayで denom = max(expectedN, actualTotal)

## 2026-01（安定化・UI調整）
### index（教員）
- UI改善
  - 横幅拡張、controlGroups を広い画面で4列化
  - タイマーボタンを横並び＋丸ボタン化
  - revealMode をスイッチ風UIへ
  - ルーム右に状態表示（room/view/status/mode/reveal）
  - ④投票・管理内の状態表示（quickState）を削除（重複表示の解消）
- 教員用リアルタイム結果表示（ToDo2）
  - answers を onValue 購読し、modeに応じて counts/TEXT最新を表示
  - ルーム切替時に購読解除（unsubAnswers）して二重購読を防止
- CSS修正
  - `color:##fff` の誤記修正
  - rgba alpha 不正の修正（0.xxへ）

### display（投影）
- revealMode（live/closed）対応：投票中マスク→解答終了で公開
- QR表示安定化：`qr:true` または `view:"qr"` で表示、それ以外は必ずhide
- TTS安定化方針
  - stopTTSで runId++ / cancel / speaking解除 / 遅延タイマー解除
  - start.mp3後 1秒で読み上げ開始
- favicon 404 対策（任意）：`<link rel="icon" href="data:,">`

### student（学生）
- TEXT入力がタイマー更新で消えないよう再描画条件を絞る
- submitBtn（二重定義）整理

## 2025-12（student UI）
- student: iPhone風UI（大ボタン＋決定方式）、片手操作配慮のレイアウト
