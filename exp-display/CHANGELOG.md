# CHANGELOG.md
ClassSync exp-display 変更ログ（1行で差分追跡する）

## 書き方ルール
- 1変更＝1エントリ（長文禁止）
- 必ず「何を」「なぜ」「影響範囲（ファイル）」を短く書く
- 変更したら Smoke Test の結果を一言添える

---

## テンプレ
- YYYY-MM-DD build:<build> [変更種別] 対象: <file> / 内容: <1行> / 理由: <1行> / Test: <OK/NGとどこを確認したか>

変更種別例：
- FIX（不具合修正）
- ADD（機能追加）
- UI（見た目/導線）
- SAFE（安全装置・互換性）
- OPS（運用改善）

---

## ログ
- 2025-12-28 build:teacher-roomlist-js-v1 [SAFE] 対象:index.html / 内容: roomSelectをJS配列生成に変更し6room対応 / 理由: option削除事故を防止 / Test: QR→解除→poll→quiz→closed OK（kyoto-01/02）
- 2025-12-28 build:import-fix-header-v1 [FIX] 対象:import-csv.html / 内容: choiceA〜のヘッダ正規化を一致させchoicesが入るよう修正 / 理由: 集計は出るが選択肢文が出ない事故対策 / Test: CSV再投入後 index/displayで選択肢表示OK
