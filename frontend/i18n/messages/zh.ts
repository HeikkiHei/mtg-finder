import type { Messages } from './en'

const zh: Messages = {
  app: {
    tagline: '扫描一页卡册，识别你的万智牌（Magic: The Gathering）卡牌并查询价格。'
  },
  nav: {
    language: '语言'
  },
  auth: {
    signIn: '登录'
  },
  scan: {
    heading: '扫描卡册页面',
    help: '上传以网格排列的卡牌（最多 4×4）照片，并在下方选择布局。空位将被跳过。',
    fileLabel: '卡册照片',
    gridLabel: '网格布局',
    gridUsed: '布局：{rows}×{cols}',
    process: '处理',
    processing: '处理中…',
    statusProcessing: '正在处理图片…',
    statusDetected: '已识别 {count} 张卡牌。',
    original: '原图',
    detected: '已识别的卡牌（{count}）',
    unidentified: '无法识别（{count}）— 不计入',
    unrecognized: '未识别',
    altScanned: '已扫描卡牌：{name}',
    altUnrecognized: '未识别的卡牌 {index}',
    save: '保存',
    saved: '已保存'
  },
  saved: {
    heading: '已保存的卡牌',
    empty: '还没有已保存的卡牌。',
    loading: '加载中…',
    error: '无法加载已保存的卡牌。后端是否正在运行？',
    signInPrompt: '登录以查看你的收藏。'
  }
}

export default zh
