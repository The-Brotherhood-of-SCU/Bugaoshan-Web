<script setup lang="ts">
import { SITE } from '../data/site'
import Icon from './ui/Icon.vue'
</script>

<template>
  <footer id="disclaimer" class="section-dark border-t border-[#625b53]">
    <div class="mx-auto grid max-w-7xl gap-7 px-5 py-9 sm:px-8 md:grid-cols-12 md:items-center">
      <div class="md:col-span-8">
        <p class="display-serif text-xl text-[#eee7dc]">{{ SITE.name }}</p>
        <p class="editorial-label mt-2 text-[#938a81]">© 2026 {{ SITE.org }}</p>
        <div class="mt-5 max-w-2xl">
          <p class="text-sm font-semibold leading-6 text-[#eee7dc]">非官方第三方应用，与四川大学不存在隶属、授权或认可关系。</p>
        </div>
      </div>

      <nav class="flex flex-wrap gap-6 text-sm md:col-span-4 md:justify-end" aria-label="页脚导航">
        <a :href="SITE.repo" target="_blank" rel="noopener noreferrer" class="focus-editorial inline-flex items-center gap-2 font-semibold text-[#c9c0b6] hover:text-white"><Icon name="github" :size="16" /> 仓库</a>
        <a :href="SITE.licenseUrl" target="_blank" rel="noopener noreferrer" class="focus-editorial font-semibold text-[#c9c0b6] hover:text-white">{{ SITE.license }}</a>
        <a :href="SITE.contributing" target="_blank" rel="noopener noreferrer" class="focus-editorial font-semibold text-[#c9c0b6] hover:text-white">贡献</a>
      </nav>
    </div>
  </footer>
</template>
