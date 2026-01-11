# ClassSync（授業リアルタイム投票システム）

授業で使用するリアルタイム双方向クラスルーム投票システム。
Firebase Realtime Database を介して、学生端末（student）からの回答を、教員端末（index）で制御し、投影端末（display）で可視化する。

## 構成（主要ページ）
- `index.html`（教員操作）
  - 出題開始/終了、集計リセット、QR表示、結果公開方式切替、タイマー操作
  - 教員用リアルタイム結果（counts / TEXT最新表示）
- `display.html`（投影）
  - 問題表示、集計グラフ、QR表示、TTS（問題読み上げ）
  - revealMode による「投票中マスク → 終了で公開」対応
- `student.html`（学生回答）
  - ○× / 5択 / TEXT の回答
  - status=open で操作可能、決定で確定（押し間違い→決定方式）
  - タイマー更新でTEXT入力が消えない（再描画制御）

## 対応ルーム（固定）
- kyoto-01 / kyoto-02
- sendai-01 / sendai-02
- nagoya-01 / nagoya-02

URLパラメータで room を指定：
- student: `.../student.html?room=nagoya-01`
- display: `.../display.html?room=nagoya-01`

## 主要機能
- 投票モード：`ox` / `five` / `text`
- 投票開始/終了：`activity.status = open/closed`
- 投影結果の公開方式：`activity.revealMode = live/closed`
  - live: 投票中もリアルタイム公開
  - closed: 投票中はマスク表示、closedで公開
- QR表示（安定版）
  - `activity.qr === true` または `activity.view === "qr"` で表示
  - それ以外は必ず非表示（固まり防止）
- TTS（display）
  - OFF→ON→読む、次問題でもリロード不要を目標に runId方式で安定化
  - open時：start.mp3 → 1秒後に読み上げ（運用）
- 音（SE）
  - `poyon.mp3`：投票1件増
  - `gong.mp3`：解答終了
  - `countdown.mp3`：残り3秒
  - `start.mp3`：出題開始

## 注意
Chrome拡張由来のコンソールエラー
`A listener indicated an asynchronous response ...` は拡張（multi-tabs等）の可能性が高く、アプリ本体の不具合ではない。
投影PCは拡張を最小限にするのが安全。

## ドキュメント
- `SPEC.md`：Firebase構造・画面仕様・挙動
- `CHANGELOG.md`：変更履歴（安定化対応含む）
- `STABLE_CHECKLIST.md`：運用前チェックリスト（QR/TTS/投票/ルーム切替）
