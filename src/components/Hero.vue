<script setup lang="ts">
import { computed } from 'vue'
import { SITE } from '../data/site'
import { asset } from '../lib/asset'
import Button from './ui/Button.vue'
import Icon from './ui/Icon.vue'

enum Platform {
  Windows = 'windows',
  Android = 'android',
  iOS = 'ios',
  HarmonyOS = 'harmonyos',
  Linux = 'linux',
  Other = 'other',
}

const userPlatform = computed<Platform>(() => {
  if (typeof navigator === 'undefined') return Platform.Other
  const ua = navigator.userAgent
  if (/Windows/i.test(ua)) return Platform.Windows
  if (/Android/i.test(ua)) return Platform.Android
  if (/iPhone|iPad|iPod/i.test(ua)) return Platform.iOS
  if (/HarmonyOS/i.test(ua)) return Platform.HarmonyOS
  if (/Linux/i.test(ua)) return Platform.Linux
  return Platform.Other
})

const primaryHeroCta = computed(() => {
  switch (userPlatform.value) {
    case Platform.Windows:
      return {
        href: '#platform-windows',
        icon: 'windows',
        label: '下载 Windows 版',
      }
    case Platform.Android:
      return {
        href: '#platform-android',
        icon: 'android',
        label: '下载 Android 版',
      }
    case Platform.iOS:
      return {
        href: SITE.appStore,
        icon: 'apple',
        label: '前往 App Store 下载',
        external: true,
      }
    case Platform.HarmonyOS:
      return {
        href: '#platform-harmonyos',
        icon: 'harmonyos',
        label: '了解鸿蒙版 (邀测)',
      }
    case Platform.Linux:
      return {
        href: '#platform-linux',
        icon: 'linux',
        label: '下载 Linux 版',
      }
    default:
      return {
        href: '#downloads',
        icon: 'arrowDown',
        label: '下载应用',
      }
  }
})

const platformShortcuts = [
  { id: 'android', name: 'Android', icon: 'android', target: '#platform-android' },
  { id: 'windows', name: 'Windows', icon: 'windows', target: '#platform-windows' },
  { id: 'ios', name: 'App Store', icon: 'apple', target: '#platform-ios' },
  { id: 'harmonyos', name: '鸿蒙', icon: 'harmonyos', target: '#platform-harmonyos', badge: '适配中' },
  { id: 'linux', name: 'Linux', icon: 'linux', target: '#platform-linux' },
]
</script>

<template>
  <section id="top" class="hero-field overflow-hidden border-b border-[var(--line)]">
    <div class="mx-auto grid min-h-[calc(72svh-4.5rem)] max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 lg:min-h-[calc(88svh-4.5rem)] lg:grid-cols-12 lg:py-16">
      <div class="relative z-10 lg:col-span-7">
        <div class="mb-8 flex items-center gap-4">
          <span class="editorial-label border-y border-[var(--wine)] py-2 text-[var(--wine)]">SCU / Student Utility</span>
          <span class="h-px flex-1 bg-[var(--line)]"></span>
        </div>

        <h1 class="display-serif max-w-[9ch] text-[clamp(4.5rem,12vw,9rem)] leading-[0.84] text-[var(--ink)]">
          不高<span class="text-[var(--wine)]">山上</span>
        </h1>
        <p class="mt-4 font-serif text-xl tracking-[0.12em] text-[var(--muted)] sm:text-2xl">{{ SITE.nameEn }} · {{ SITE.tagline }}</p>
        <p class="mt-7 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg">课表、成绩与校园服务，一处抵达。</p>

        <div class="mt-7 flex flex-wrap gap-3">
          <Button :href="primaryHeroCta.href" variant="primary" :external="primaryHeroCta.external">
            <Icon :name="primaryHeroCta.icon" :size="18" /> {{ primaryHeroCta.label }}
          </Button>
          <Button :href="SITE.docs" variant="secondary" external>
            <Icon name="book" :size="18" /> 官方文档
          </Button>
          <Button :href="SITE.repo" variant="secondary" external>
            <Icon name="github" :size="18" /> 浏览源码
          </Button>
        </div>

        <!-- 平台直达快捷徽章栏 -->
        <div class="mt-8 border-t border-dashed border-[var(--line)] pt-5">
          <p class="editorial-label text-[var(--faint)]">平台支持 / Platforms</p>
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <a
              v-for="p in platformShortcuts"
              :key="p.id"
              :href="p.target"
              class="focus-editorial inline-flex items-center gap-1.5 border border-[var(--line)] bg-[var(--paper-raised)] px-3 py-1.5 text-xs font-semibold text-[var(--ink)] transition-colors hover:border-[var(--wine)] hover:text-[var(--wine)]"
            >
              <Icon :name="p.icon" :size="14" class="text-[var(--wine)]" />
              <span>{{ p.name }}</span>
              <span
                v-if="p.badge"
                class="editorial-label ml-1 text-[0.62rem] text-[var(--brick)]"
              >{{ p.badge }}</span>
            </a>
          </div>
        </div>
      </div>

      <div class="hero-art hidden lg:col-span-5 lg:block" aria-hidden="true">
        <img :src="asset('favicon.svg')" alt="" class="hero-logo-svg" />
        <p class="editorial-label absolute bottom-0 left-0 z-10 text-[var(--muted)]">31.5° N / 104.0° E<br />Campus notes, rebuilt.</p>
      </div>
    </div>
  </section>
</template>
