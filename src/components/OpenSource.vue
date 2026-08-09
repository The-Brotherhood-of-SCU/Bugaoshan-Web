<script setup lang="ts">
import { SITE } from '../data/site'
import { asset } from '../lib/asset'
import Section from './ui/Section.vue'
import Icon from './ui/Icon.vue'

const actions = [
  { label: '访问仓库', icon: 'github', href: SITE.repo, primary: true },
  { label: '贡献指南', icon: 'code', href: SITE.contributing, primary: false },
  { label: '点个 Star', icon: 'star', href: SITE.repo, primary: false },
] as const
</script>

<template>
  <Section id="opensource" eyebrow="Open Source" title="开源与贡献" description="项目完全开源，由学生团队维护，欢迎一起把它做得更好。">
    <div class="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-900">
      <div class="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:text-left">
        <img :src="asset('brotherhood-of-scu.png')" alt="The-Brotherhood-of-SCU 组织 Logo" class="h-20 w-20 shrink-0 rounded-xl" />
        <div class="flex-1">
          <h3 class="text-xl font-semibold text-scu-dark dark:text-white">由 {{ SITE.org }} 开发维护</h3>
          <p class="mt-2 text-sm leading-relaxed text-scu-gray dark:text-neutral-400">
            不高山上基于 <strong class="text-scu">{{ SITE.license }}</strong> 协议开源。无论你是为它修一个 bug、补充一份文档，还是提出新点子，都欢迎通过 Pull Request 或 Issue 参与进来。
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 divide-y divide-black/5 border-t border-black/5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-white/10 dark:border-white/10">
        <a
          v-for="a in actions"
          :key="a.label"
          :href="a.href"
          target="_blank"
          rel="noopener noreferrer"
          :class="`flex items-center justify-center gap-2 px-4 py-4 text-sm font-semibold transition-colors ${a.primary ? 'bg-scu text-white hover:bg-scu-dark' : 'text-scu hover:bg-scu/5 dark:hover:bg-white/10'}`"
        >
          <Icon :name="a.icon" :size="18" /> {{ a.label }}
        </a>
      </div>
    </div>
  </Section>
</template>
