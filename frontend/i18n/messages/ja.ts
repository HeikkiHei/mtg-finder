import type { Messages } from './en'

const ja: Messages = {
  app: {
    tagline:
      'バインダーのページをスキャンして、Magic: The Gathering のカードを認識し、価格を調べましょう。'
  },
  nav: {
    language: '言語'
  },
  auth: {
    signIn: 'ログイン'
  },
  scan: {
    heading: 'バインダーページをスキャン',
    help: 'グリッド状に並べたカード（最大4×4）の写真をアップロードし、下でレイアウトを選んでください。空きスロットはスキップされます。',
    fileLabel: 'バインダーの写真',
    gridLabel: 'グリッドレイアウト',
    gridUsed: 'レイアウト: {rows}×{cols}',
    process: '処理',
    processing: '処理中…',
    statusProcessing: '画像を処理しています…',
    statusDetected: '{count} 枚のカードを検出しました。',
    original: '元の画像',
    detected: '検出されたカード（{count}）',
    unidentified: '識別できませんでした（{count}）— カウント対象外',
    unrecognized: '未認識',
    altScanned: 'スキャンしたカード: {name}',
    altUnrecognized: '未認識のカード {index}',
    save: '保存',
    saved: '保存済み'
  },
  saved: {
    heading: '保存したカード',
    empty: 'まだ保存されたカードはありません。',
    loading: '読み込み中…',
    error: '保存したカードを読み込めませんでした。バックエンドは起動していますか？',
    signInPrompt: 'コレクションを見るにはログインしてください。'
  }
}

export default ja
