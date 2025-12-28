# SPEC.md（ClassSync exp-display 仕様の正本）

## 1. 目的
授業運用の循環を壊さない：
参加(QR) → 出題(open) → 可視化(集計) → 回収(closedで解説) → 次へ

## 2. 画面と役割
- index.html：教員操作（ルーム切替、次へ/戻る、クイック投票、解答終了、QR）
- display.html：投影（QR導線、集計の縦棒、closedで解説上段）
- student.html：学生回答UI（mode/configに従いボタン表示）
- import-csv.html：CSV→Firebaseへ questions を投入

## 3. 不変条件（Invariant）
1) display起動で activity.qr=true（強制QR）
2) QR中は問題表示しない／次へ等を抑止
3) QR解除時に open/view/mode/config を必ず補完
4) displayは answers直集計（result依存禁止）
5) 集計は縦棒のみ（choice順は activity.config.choices 優先）
6) status="closed" のとき正解・解説を最上段へ

## 4. DB構造（前提）
rooms/<room>/
- activity: { qr, status, view, mode, config }
- quiz/current_question_id
- questions/<qid>: { question, choices, answer, explanation, mode? }
- answers/*

## 5. view/mode
- view: "quiz" | "poll"
- mode: "ox" | "five" | "text"
- config:
  - ox: { choices:["O","X"] }
  - five: { choices:["A","B","C","D","E"] }
  - text: { type:"text" }

## 6. CSV仕様（要点）
- 必須：qid, question
- 任意：choiceA..choiceE, answer, explanation, mode
- import-csv はヘッダを正規化して読み取る（大小・記号差を吸収）
