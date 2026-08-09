import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// base 必须带子路径，否则 GitHub Pages 项目页资源 404
export default defineConfig({
  base: '/bugaoshan-web/',
  plugins: [vue(), tailwindcss()],
})
