# SPEC.md（ClassSync exp-display 仕様の正本）

## 1. 目的
授業運用の循環を壊さない：
参加(QR) → 待機(standby) → 出題(open) → 可視化(集計) → 回収(closedで解説/公開) → 次へ

## 2. 画面と役割
- index.html：教員操作（ルーム切替、次へ/戻る、クイック投票、解答終了、QR、タイマー）
- display.html：投影（QR導線、縦棒集計、closedで正解/解説を上段、TTS/SE、タイマー表示）
- student.html：学生回答UI（activity.mode/config に従い UI を切替、openのみ送信可）
- import-csv.html：CSV→Firebaseへ questions を投入
- dict-editor.html：TTS辞書（dict/tts-dict.json）の編集支援

## 3. 不変条件（Invariant）
1) display起動で `activity.qr=true`（強制QR）
2) QR中は投影が参加導線を最優先（問題表示・操作系は抑止されること）
3) QR解除は “待機(standby)” を作る（いきなりquizにしない／欠損状態を作らない）
4) 集計は display が `answers` を直接集計（result依存禁止）
5) 集計は縦棒のみ
   - quiz中：choice順は「表示中の問題 choices」を最優先（表示と集計の一致を保証）
   - poll中：choice順は `activity.config.choices`（なければ mode から補完）
6) `status="closed"` のとき
   - quiz：正解・解説を最上段へ
   - text：回答一覧は「解答終了で公開」になること
7) poll に入ったら quizの問題購読は解除（混線防止）

## 4. DB構造（前提）
rooms/<room>/
- activity: {
    qr: boolean,
    view: "qr" | "standby" | "quiz" | "poll",
    status: "open" | "closed" | "ready" | "-",
    mode: "ox" | "five" | "text" | null,
    config: { choices?: string[] } | { type:"text" } | null,
    timer: { running:boolean, endsAt?:number, durationSec?:number, autoClose?:boolean }
  }
- quiz/current_question_id: string
- questions/<qid>: { question, choices?, answer?, explanation?, mode? }
- answers/<userId>: string | { value:string, ... }

## 5. view/mode/config の基本
- view:
  - quiz：問題＋集計
  - poll：集計のみ（口頭質問の投票）
  - standby：待機（先生操作待ち）
  - qr：参加導線
- mode:
  - ox / five / text
- config:
  - ox:   { choices:["O","X"] }
  - five: { choices:["A","B","C","D","E"] }
  - text: { type:"text" }

## 6. タイマー（teacher → display）
- index が `activity.timer` を更新
- display は `endsAt` を監視してカウント表示＋必要なら `status="closed"` へ自動遷移（open中かつQRでない時）

## 7. CSV仕様（要点）
- 必須：question_id（またはqid相当）, question
- 任意：choiceA..choiceE, answer, explanation, mode
- import-csv はヘッダを正規化して読み取る（大小・記号差を吸収）
