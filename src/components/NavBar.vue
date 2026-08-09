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

<style scoped>
/* 移动菜单面板动画 */
.menu-enter-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.menu-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* 菜单项依次出现动画 */
.menu-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.menu-enter-active .menu-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.menu-enter-active .menu-item:nth-child(1) { transition-delay: 0.02s; }
.menu-enter-active .menu-item:nth-child(2) { transition-delay: 0.05s; }
.menu-enter-active .menu-item:nth-child(3) { transition-delay: 0.08s; }
.menu-enter-active .menu-item:nth-child(4) { transition-delay: 0.11s; }
.menu-enter-active .menu-item:nth-child(5) { transition-delay: 0.14s; }
.menu-enter-active .menu-item:nth-child(6) { transition-delay: 0.17s; }

.menu-enter-from .menu-item {
  opacity: 0;
  transform: translateX(-12px);
}
.menu-leave-to .menu-item {
  opacity: 0;
  transform: translateX(-12px);
}
.menu-leave-active .menu-item:nth-child(1) { transition-delay: 0s; }
.menu-leave-active .menu-item:nth-child(2) { transition-delay: 0.02s; }
.menu-leave-active .menu-item:nth-child(3) { transition-delay: 0.04s; }
.menu-leave-active .menu-item:nth-child(4) { transition-delay: 0.06s; }
.menu-leave-active .menu-item:nth-child(5) { transition-delay: 0.08s; }
.menu-leave-active .menu-item:nth-child(6) { transition-delay: 0.1s; }

/* 汉堡按钮旋转动画 */
.toggle-btn {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toggle-btn.rotated {
  transform: rotate(90deg);
}
</style>

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
        class="toggle-btn text-scu-dark md:hidden dark:text-white"
        :class="{ rotated: open }"
        aria-label="打开菜单"
        :aria-expanded="open"
        @click="open = !open"
      ><Icon :name="open ? 'close' : 'menu'" :size="24" /></button>
    </nav>

    <Transition name="menu">
      <div v-if="open" class="border-t border-black/5 bg-white px-6 py-4 md:hidden dark:border-white/10 dark:bg-neutral-950">
        <div class="flex flex-col gap-4">
          <a
            v-for="l in links"
            :key="l.href"
            :href="l.href"
            @click="open = false"
            class="menu-item text-sm font-medium text-scu-gray hover:text-scu dark:text-neutral-300 dark:hover:text-white"
          >{{ l.label }}</a>
          <div class="menu-item flex items-center gap-4 pt-2">
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
    </Transition>
  </header>
</template>
