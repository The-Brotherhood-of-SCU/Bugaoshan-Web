import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// base 必须带子路径，且与 GitHub 仓库名大小写一致，否则 Pages 项目页资源 404
export default defineConfig({
  base: '/Bugaoshan-Web/',
  plugins: [vue(), tailwindcss()],
})
