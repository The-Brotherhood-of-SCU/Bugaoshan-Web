# 不高山上 · 官网落地页

> 为开源项目 [Bugaoshan](https://github.com/The-Brotherhood-of-SCU/Bugaoshan) 打造的 Vue 单页长滚动官网。

## 技术栈

- [Vue](https://vuejs.org/) 3.5 + [Vite](https://vite.dev/) 6 + TypeScript 5.6
- [Tailwind CSS](https://tailwindcss.com/) v4（CSS-first 配置）

## 本地开发

```bash
npm install
npm run dev     # http://localhost:5173/Bugaoshan-Web/
npm run build   # 产物输出到 dist/
npm run preview # http://localhost:4173/Bugaoshan-Web/
```

## 部署

推送至 `main` 分支后，[GitHub Actions](.github/workflows/deploy.yml) 会自动构建并部署到 GitHub Pages：

```text
https://the-brotherhood-of-scu.github.io/Bugaoshan-Web/
```

部署前需要在仓库 **Settings → Pages → Source** 中选择 “GitHub Actions”。

## 免责声明

本应用为非官方第三方应用，与四川大学不存在隶属、授权或认可关系。

This is an unofficial third-party application and is not affiliated with or endorsed by Sichuan University.
