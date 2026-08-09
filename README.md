# 不高山上 · 官网落地页

> 为开源项目 [Bugaoshan](https://github.com/The-Brotherhood-of-SCU/Bugaoshan) 打造的单页长滚动官网。

## 技术栈

- [Vite](https://vitejs.dev/) 6 + [React](https://react.dev/) 19 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4（CSS-first 配置）

## 本地开发

```bash
npm install
npm run dev     # http://localhost:5173/bugaoshan-web/
npm run build   # 产物输出到 dist/
npm run preview # http://localhost:4173/bugaoshan-web/
```

## 部署

推送至 `master` 分支后，[GitHub Actions](.github/workflows/deploy.yml) 会自动构建并部署到 GitHub Pages：

```text
https://the-brotherhood-of-scu.github.io/bugaoshan-web/
```

部署前需要在仓库 **Settings → Pages → Source** 中选择 “GitHub Actions”。

## 免责声明

本应用为非官方第三方应用，与四川大学不存在隶属、授权或认可关系。

This is an unofficial third-party application and is not affiliated with or endorsed by Sichuan University.
