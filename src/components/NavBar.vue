<script setup lang="ts">
import { ref } from 'vue'
import { SITE } from '../data/site'
import { asset } from '../lib/asset'
import Icon from './ui/Icon.vue'
import Button from './ui/Button.vue'

const open = ref(false)

const links = [
  { href: '#downloads', label: '下载' },
  { href: '#features', label: '特性' },
  { href: '#screenshots', label: '截图' },
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
        class="-mr-2 rounded-lg p-2 text-scu-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scu-accent md:hidden dark:text-white"
        :aria-label="open ? '关闭菜单' : '打开菜单'"
        :aria-expanded="open"
        aria-controls="mobile-navigation"
        @click="open = !open"
      >
        <span class="relative block h-6 w-6" aria-hidden="true">
          <span
            class="absolute inset-0 transition-all duration-200 ease-out"
            :class="open ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'"
          ><Icon name="menu" :size="24" /></span>
          <span
            class="absolute inset-0 transition-all duration-200 ease-out"
            :class="open ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'"
          ><Icon name="close" :size="24" /></span>
        </span>
      </button>
    </nav>

    <Transition
      enter-active-class="origin-top transition duration-200 ease-out"
      enter-from-class="-translate-y-2 scale-y-95 opacity-0"
      enter-to-class="translate-y-0 scale-y-100 opacity-100"
      leave-active-class="origin-top transition duration-150 ease-in"
      leave-from-class="translate-y-0 scale-y-100 opacity-100"
      leave-to-class="-translate-y-2 scale-y-95 opacity-0"
    >
      <div
        v-if="open"
        id="mobile-navigation"
        class="border-t border-black/5 bg-white px-6 py-4 md:hidden dark:border-white/10 dark:bg-neutral-950"
      >
        <div class="flex flex-col gap-4">
          <a
            v-for="l in links"
            :key="l.href"
            :href="l.href"
            @click="open = false"
            class="text-sm font-medium text-scu-gray hover:text-scu dark:text-neutral-300 dark:hover:text-white"
          >{{ l.label }}</a>
          <div class="flex items-center gap-4 pt-2">
            <Button href="#downloads" variant="primary" className="flex-1" @click="open = false">下载</Button>
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
    </Transition>
  </header>
</template>
