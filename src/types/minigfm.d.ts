// @oblivionocean/minigfm 未提供官方类型声明,这里补一个最简声明
// 注意:包实际是命名导出(README 中的 default import 写法有误)
declare module '@oblivionocean/minigfm' {
  interface MiniGFMOptions {
    /** 是否允许渲染原始 HTML(默认转义,防 XSS) */
    unsafe?: boolean
    /** 可选:传入 highlight.js 实例以启用代码块高亮 */
    hljs?: unknown
  }

  class MiniGFM {
    constructor(options?: MiniGFMOptions)
    parse(markdown: string): string
  }

  export { MiniGFM }
}
