# STABLE_CHECKLIST.md
ClassSync exp-display 安定版を壊さないための固定ルール（STABLE）

## 0. このプロジェクトの目的（最優先）
授業運用の循環を **途切れさせない**：
参加(QR) → 出題(open) → 可視化(集計) → 回収(解説/closed) → 次へ

---

## 1. 絶対に壊してはいけない不変条件（Invariant）
### 1) display起動でQR強制ON
- displayを開いたら `activity.qr=true` を必ず保証
- QR中は問題を表示しない（参加導線優先）

### 2) QR解除で“出題可能状態”を必ず作る
- `qr=false` にするだけでは不十分
- `status/open`, `view`, `mode`, `config.choices`（またはtext）を欠損させない

### 3) 集計は display が answers を直接集計（result依存排除）
- indexがresultを書かなくても回答が即反映されること
- 参加人数だけ増えて集計が出ない事故を絶対に再発させない

### 4) 集計は縦棒（vertical bar）固定
- 横棒は禁止
- choices順：`activity.config.choices` を最優先、無ければ mode から補完
- 想定外choiceが来ても落ちない（必要なら追加表示可）

### 5) 解答終了＝status="closed"
- closed のとき **正解・解説を表示**
- 解説は最上段へ（振り返り優先）
- 選択肢は下へ押す（回収フェーズのUI）

---

## 2. 触っていい範囲（固定）
開発対象固定：
- quiz-app/exp-display/

ファイル固定（正）：
- index.html（教員画面）
- display.html（投影）
- student.html（学生）
- import-csv.html（CSV投入）

※ 上記を **削除・改名しない**。追加はOK。

---

## 3. 変更の基本原則（削除事故防止）
1) **削除禁止**
   - 既存のボタン・分岐・表示は消さない
   - 使わないなら feature flag で無効化（表示は残す）

2) **1変更＝1箇所**
   - 1回の作業で触るファイルは原則1つ
   - 触ったら必ず smoke test を通す（下記）

3) **最小差分**
   - 既存のデータ構造（rooms/...）を崩さない
   - 新フィールド追加は後方互換（無くても動く）にする

4) **buildタグ運用**
   - display/index に build 表示を入れる
   - URLに `&v=<build>` を付けられるようにする（キャッシュ事故対策）

---

## 4. データ構造（前提）
room ルート：
- rooms/<room>/
  - activity
  - quiz/current_question_id
  - questions/<qid>
  - answers/*

注：display は answers を直集計すること（resultに依存しない）

---

## 5. Smoke Test（毎回これだけはやる）
対象ルーム：最低1つ（できれば kyoto-01）でOK

### A. 投影側（display）
- [ ] display を開く → 強制QR ON（参加人数表示）
- [ ] QR中：次の問題 disabled / 問題非表示
- [ ] QR解除：学生が回答できる（open/mode/choices が保証される）

### B. 教員側（index）
- [ ] ルーム切替が効く（別roomを操作しても混線しない）
- [ ] 次の問題 → quiz に戻る（問題文＋選択肢が出る）
- [ ] クイック投票（○✕ / ABCDE / TEXT）→ poll で集計が縦棒で動く
- [ ] 解答終了 → closed で正解・解説が表示される

### C. 学生側（student）
- [ ] QR解除後：ボタンが出る（modeに応じて）
- [ ] 回答すると display の集計が即時更新される

---

## 6. よくある事故と対策（固定メモ）
### 事故1：直したのに反映されない
原因：キャッシュ or 別パス
対策：buildタグ + `?v=<build>` を必ず変える

### 事故2：参加人数は増えるのに集計が出ない
原因：result依存
対策：display は answers 直集計（この仕様を絶対維持）

### 事故3：ルームを選んだのに別roomが動く
原因：roomSelect onchange 未接続、roomパラメータ未付与
対策：roomは JS配列生成 + URL/LS保存 + import/display に ?room を渡す

---

## 7. リリース手順（安定版を守る）
- [ ] STABLEタグ（例：stable-2025-12-28）からブランチを切る
- [ ] 変更は最小差分で実装
- [ ] Smoke Test を通す
- [ ] CHANGELOG に1行追記
- [ ] 新stableタグを打つ（必要なら）
