// 统一处理 public/ 静态资源路径，自动带上 Vite 的 base（GitHub Pages 子路径）
export const asset = (path: string): string =>
  import.meta.env.BASE_URL + path.replace(/^\/+/, '')
