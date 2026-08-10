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
  { href: '#screenshots', label: '预览' },
  { href: '#opensource', label: '开源' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_88%,transparent)] backdrop-blur-md">
    <nav class="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="主导航">
      <a href="#top" class="focus-editorial flex items-center gap-3" aria-label="返回页面顶部">
        <img :src="asset('favicon.svg')" alt="" class="h-9 w-9 border border-[var(--line)] bg-white" />
        <span>
          <span class="display-serif block text-lg leading-none text-[var(--ink)]">{{ SITE.name }}</span>
          <span class="editorial-label mt-1 block text-[0.55rem] text-[var(--faint)]">Campus Field Notes</span>
        </span>
      </a>

      <div class="hidden items-center gap-7 md:flex">
        <a
          v-for="(link, index) in links"
          :key="link.href"
          :href="link.href"
          class="focus-editorial editorial-label text-[var(--muted)] transition-colors hover:text-[var(--wine)]"
        ><span class="mr-1 text-[var(--faint)]">0{{ index + 1 }}</span>{{ link.label }}</a>
        <a
          :href="SITE.repo"
          target="_blank"
          rel="noopener noreferrer"
          class="focus-editorial text-[var(--muted)] transition-colors hover:text-[var(--wine)]"
          aria-label="打开 GitHub 仓库"
        ><Icon name="github" :size="20" /></a>
        <Button href="#downloads" variant="primary" className="min-h-10 px-5 py-2">获取应用</Button>
      </div>

      <button
        type="button"
        class="focus-editorial grid h-11 w-11 place-items-center border border-[var(--line)] text-[var(--ink)] md:hidden"
        :aria-label="open ? '关闭菜单' : '打开菜单'"
        :aria-expanded="open"
        aria-controls="mobile-navigation"
        @click="open = !open"
      >
        <Icon :name="open ? 'close' : 'menu'" :size="22" />
      </button>
    </nav>

    <Transition
      enter-active-class="origin-top transition duration-200 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="origin-top transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <div v-if="open" id="mobile-navigation" class="border-t border-[var(--line)] bg-[var(--paper-raised)] px-5 py-6 md:hidden">
        <div class="mx-auto flex max-w-7xl flex-col">
          <a
            v-for="(link, index) in links"
            :key="link.href"
            :href="link.href"
            class="focus-editorial flex items-center border-b border-[var(--line)] py-4 text-sm font-semibold text-[var(--ink)]"
            @click="open = false"
          ><span class="editorial-label mr-4 text-[var(--wine)]">0{{ index + 1 }}</span>{{ link.label }}</a>
          <div class="mt-5 flex items-center gap-4">
            <Button href="#downloads" variant="primary" className="flex-1" @click="open = false">获取应用</Button>
            <a
              :href="SITE.repo"
              target="_blank"
              rel="noopener noreferrer"
              class="focus-editorial grid h-12 w-12 place-items-center border border-[var(--line)] text-[var(--ink)]"
              aria-label="打开 GitHub 仓库"
            ><Icon name="github" :size="21" /></a>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>
