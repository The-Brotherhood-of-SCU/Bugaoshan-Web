<script setup lang="ts">
import { ref } from 'vue'
import { SITE } from '../data/site'
import { asset } from '../lib/asset'
import Icon from './ui/Icon.vue'
import Button from './ui/Button.vue'

const open = ref(false)

const links = [
  { href: '#features', label: '特性' },
  { href: '#screenshots', label: '截图' },
  { href: '#downloads', label: '下载' },
  { href: '#opensource', label: '开源' },
  { href: '#disclaimer', label: '声明' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-neutral-950/80">
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
      <a href="#top" class="flex items-center gap-2 font-bold text-scu-dark dark:text-white">
        <img :src="asset('favicon.svg')" alt="" class="h-8 w-8" />
        <span class="text-lg">{{ SITE.name }}</span>
      </a>

      <div class="hidden items-center gap-8 md:flex">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="text-sm font-medium text-scu-gray transition-colors hover:text-scu dark:text-neutral-300 dark:hover:text-white"
        >{{ l.label }}</a>
        <a
          :href="SITE.repo"
          target="_blank"
          rel="noopener noreferrer"
          class="text-scu-gray transition-colors hover:text-scu dark:text-neutral-300 dark:hover:text-white"
          aria-label="GitHub 仓库"
        ><Icon name="github" :size="20" /></a>
        <Button href="#downloads" variant="primary">下载</Button>
      </div>

      <button
        type="button"
        class="text-scu-dark md:hidden dark:text-white"
        aria-label="打开菜单"
        :aria-expanded="open"
        @click="open = !open"
      ><Icon :name="open ? 'close' : 'menu'" :size="24" /></button>
    </nav>

    <div v-if="open" class="border-t border-black/5 bg-white px-6 py-4 md:hidden dark:border-white/10 dark:bg-neutral-950">
      <div class="flex flex-col gap-4">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          @click="open = false"
          class="text-sm font-medium text-scu-gray hover:text-scu dark:text-neutral-300 dark:hover:text-white"
        >{{ l.label }}</a>
        <div class="flex items-center gap-4 pt-2">
          <Button href="#downloads" variant="primary" className="flex-1">下载</Button>
          <a
            :href="SITE.repo"
            target="_blank"
            rel="noopener noreferrer"
            class="text-scu-gray hover:text-scu dark:text-neutral-300 dark:hover:text-white"
            aria-label="GitHub 仓库"
          ><Icon name="github" :size="22" /></a>
        </div>
      </div>
    </div>
  </header>
</template>
