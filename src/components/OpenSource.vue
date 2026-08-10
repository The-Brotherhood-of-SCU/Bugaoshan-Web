<script setup lang="ts">
import { SITE } from '../data/site'
import { asset } from '../lib/asset'
import { useCopyFeedback } from '../composables/useCopyFeedback'
import Section from './ui/Section.vue'
import Icon from './ui/Icon.vue'

const actions = [
  { label: '访问仓库', icon: 'github', href: SITE.repo, primary: true },
  { label: '贡献指南', icon: 'code', href: SITE.contributing, primary: false },
  { label: '点个 Star', icon: 'star', href: SITE.repo, primary: false },
] as const

const { copiedText, copyText } = useCopyFeedback()
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

    <div class="mx-auto mt-6 max-w-3xl rounded-2xl border border-scu/10 bg-scu/5 p-6 dark:border-white/10 dark:bg-neutral-900 sm:p-8">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div class="max-w-xl">
          <p class="text-sm font-semibold tracking-wider text-scu uppercase dark:text-scu-accent">更轻松地参与</p>
          <h3 class="mt-2 text-xl font-semibold text-scu-dark dark:text-white">加入 QQ 交流群</h3>
          <p class="mt-2 text-sm leading-relaxed text-scu-gray dark:text-neutral-400">
            不熟悉 GitHub，或者想用更方便的方式参与？欢迎加入交流群，直接与开发者和其他用户交流。你可以反馈 Bug、提出功能建议，也能及时了解版本更新和各平台进展。
          </p>
          <ul class="mt-4 flex flex-wrap gap-2 text-xs font-medium text-scu dark:text-neutral-300" aria-label="群聊用途">
            <li class="rounded-full bg-white px-3 py-1.5 shadow-sm dark:bg-neutral-800">直接交流</li>
            <li class="rounded-full bg-white px-3 py-1.5 shadow-sm dark:bg-neutral-800">Bug 反馈</li>
            <li class="rounded-full bg-white px-3 py-1.5 shadow-sm dark:bg-neutral-800">功能建议</li>
            <li class="rounded-full bg-white px-3 py-1.5 shadow-sm dark:bg-neutral-800">版本动态</li>
          </ul>
        </div>

        <div class="flex shrink-0 items-center gap-3 rounded-xl border border-black/5 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-neutral-800">
          <div>
            <p class="text-xs text-scu-gray2 dark:text-neutral-400">QQ 群号</p>
            <p class="mt-0.5 text-lg font-semibold tracking-wide text-scu-dark dark:text-white">{{ SITE.groupNumber }}</p>
          </div>
          <button
            type="button"
            class="ml-auto inline-flex w-[4.5rem] items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-scu-accent transition-colors hover:bg-scu-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scu-accent"
            :aria-label="`复制 QQ 群号 ${SITE.groupNumber}`"
            @click="copyText(SITE.groupNumber)"
          >
            <Icon :name="copiedText === SITE.groupNumber ? 'check' : 'copy'" :size="14" />
            <span>{{ copiedText === SITE.groupNumber ? '已复制' : '复制' }}</span>
          </button>
        </div>
      </div>
    </div>
  </Section>
</template>
