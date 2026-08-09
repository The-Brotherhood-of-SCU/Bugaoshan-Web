<script setup lang="ts">
import { SITE } from '../data/site'
import { asset } from '../lib/asset'
import Icon from './ui/Icon.vue'
</script>

<template>
  <footer class="border-t border-black/5 bg-scu-dark text-white">
    <div class="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center gap-3">
        <img :src="asset('brotherhood-of-scu.png')" alt="" class="h-10 w-10 rounded-lg" />
        <div>
          <p class="font-semibold">{{ SITE.org }}</p>
          <p class="text-sm text-gray-300">© 2026 {{ SITE.name }} {{ SITE.nameEn }}</p>
        </div>
      </div>
      <nav class="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <a :href="SITE.repo" target="_blank" rel="noopener noreferrer" class="text-gray-200 transition-colors hover:text-white">
          <span class="inline-flex items-center gap-1"><Icon name="github" :size="16" /> 仓库</span>
        </a>
        <a :href="SITE.licenseUrl" target="_blank" rel="noopener noreferrer" class="text-gray-200 transition-colors hover:text-white">许可证 {{ SITE.license }}</a>
        <a :href="SITE.contributing" target="_blank" rel="noopener noreferrer" class="text-gray-200 transition-colors hover:text-white">贡献指南</a>
      </nav>
    </div>
    <div class="border-t border-white/10 px-6 py-4 text-center text-xs text-gray-400">非官方第三方应用，与四川大学不存在隶属、授权或认可关系。</div>
  </footer>
</template>
