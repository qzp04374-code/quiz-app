# SPEC: ClassSync（授業リアルタイム投票システム）

## 1. 目的
- 学生（student）→ ○× / 5択 / TEXT で回答
- 教員（index）→ 出題開始/終了、集計、QR表示、投影制御
- 投影（display）→ 問題・集計・QR・読み上げ（TTS）
- Firebase Realtime Database を介した同期

## 2. Firebase構造（固定＋拡張）
ルート：
rooms/{room}/
  activity/
    status: "open" | "closed" | ...
    view: "quiz" | "poll" | "standby" | "qr"
    mode: "ox" | "five" | "text"
    qr: true/false （未設定になることがある）
    config: { choices: [...] }  // 表示順など
    revealMode: "live" | "closed"
    timer: { running, endsAt, durationSec, autoClose, ... }
    expectedN: number（母数。0/未設定なら従来通り）
  answers/{userId}: string または { value, timestamp }
  result/{O,X,A..E}: number

固定ルーム：
- kyoto-01/02, sendai-01/02, nagoya-01/02

## 3. 画面仕様

### 3.1 student.html
- room は URL `?room=xxx`
- status=open で操作可能（closedではロック）
- 回答UI（iPhone風、大きいボタン）
  - ○（O） / ×（X）/ 5択 / TEXT
  - 決定ボタンで確定（押し間違い→決定方式）
- 送信後UIロック
- TEXT入力はタイマー更新で消えない（activity監視の再描画条件を絞る）

### 3.2 index.html（教員）
必須操作：
- 回答開始（open）
  - answers/result のリセットを伴う運用が基本
- 回答終了（closed）
- 集計リセット
- QR表示（学生用URL生成）
- グラフ表示に戻る
- ルーム選択
- revealMode 切替（スイッチ風UI）
- タイマーボタン（横並び・丸ボタン）
- 教員用リアルタイム結果表示（counts/TEXT最新）

UI/安定性：
- ルーム切替時は購読（onValue）を解除して貼り直す（重複購読防止）
- ルーム表示右に状態を表示
  `room:... / view:... / status:... / mode:... / reveal:...`

### 3.3 display.html（投影）
- 画面上部：ROOM/ status/ 参加人数/ タイマー/ 音ON/ 読み上げON/ 読む
- 問題表示（左）
- 集計（右、縦棒）
- revealMode:
  - live：投票中も表示
  - closed：投票中はマスク（音は鳴る）、closedで公開
- TEXTモード：
  - closed で一覧表示（運用）
- QR表示（安定版）：
  - `qr:true` または `view:"qr"` で show
  - それ以外は必ず hide（固まり防止）
- TTS（Web Speech API）
  - stopTTSで runId++ / cancel / speaking解除 / 遅延タイマー解除
  - open時 start.mp3 → 1秒後に読み上げ（運用）
  - QR中は読まない

## 4. 音（SE）
- poyon.mp3：投票が1件増えるたび
- gong.mp3：解答終了（closed）
- countdown.mp3：残り3秒（タイマー）
- start.mp3：出題開始（open）

運用注意：
- 最初の音アンロックは無音再生（muted/volume0で一瞬再生）推奨

## 5. 既知の運用注意
- DevTools の
  `A listener indicated an asynchronous response...`
  は拡張由来のケースが多い。授業運用PCは拡張を最小限に。
- favicon 404 は `<link rel="icon" href="data:,">` で消せる（任意）

## 6. 将来拡張（前提）
- 早押し、勝者表示、スライド同期、ポイント制、モード切替など
- 構造は activity/mode/view/config に寄せて拡張する
