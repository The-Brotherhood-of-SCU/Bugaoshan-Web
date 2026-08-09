<script setup lang="ts">
import { ref } from 'vue'
import { downloads } from '../data/downloads'
import { SITE } from '../data/site'
import Section from './ui/Section.vue'
import Badge from './ui/Badge.vue'
import Icon from './ui/Icon.vue'

const copiedNumber = ref<string | null>(null)
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copyNumber(num: string | undefined) {
  if (!num) return
  try {
    await navigator.clipboard.writeText(num)
  } catch {
    // 降级方案：非安全上下文（http）下用临时 textarea 复制
    const ta = document.createElement('textarea')
    ta.value = num
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }
  copiedNumber.value = num
  if (resetTimer) clearTimeout(resetTimer)
  resetTimer = setTimeout(() => (copiedNumber.value = null), 2000)
}
</script>

<template>
  <Section id="downloads" eyebrow="Download" title="多平台下载" description="已发布平台前往 GitHub Releases，其他平台请加群了解。">
    <div class="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
      <template v-for="p in downloads" :key="p.name">
        <div
          v-if="p.status === 'group'"
          class="flex flex-col gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-neutral-900"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold text-scu-dark dark:text-white">{{ p.name }}</h3>
            <Badge :status="p.status" />
          </div>
          <p class="text-sm text-scu-gray dark:text-neutral-400">{{ p.note }}</p>
          <div class="mt-auto flex items-center gap-2 rounded-xl bg-scu/5 px-4 py-3 dark:bg-scu/10">
            <span class="text-sm text-scu-gray2 dark:text-neutral-400">QQ 群</span>
            <span class="text-lg font-semibold tracking-wide text-scu-dark dark:text-white">{{ p.groupNumber }}</span>
            <button
              type="button"
              class="ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-scu-accent transition-colors hover:bg-scu-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scu-accent dark:text-scu-accent"
              :aria-label="`复制 QQ 群号 ${p.groupNumber}`"
              @click="copyNumber(p.groupNumber)"
            >
              <Icon :name="copiedNumber === p.groupNumber ? 'check' : 'copy'" :size="14" />
              <span>{{ copiedNumber === p.groupNumber ? '已复制' : '复制' }}</span>
            </button>
          </div>
        </div>
        <a
          v-else
          :href="p.href"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-col gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scu-accent dark:border-white/10 dark:bg-neutral-900"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold text-scu-dark dark:text-white">{{ p.name }}</h3>
            <Badge :status="p.status" />
          </div>
          <p class="text-sm text-scu-gray dark:text-neutral-400">{{ p.note }}</p>
          <span class="mt-auto inline-flex items-center gap-1 text-sm font-medium text-scu-accent">
            前往 GitHub Releases
            <Icon name="external" :size="16" />
          </span>
        </a>
      </template>
    </div>
    <p class="mt-8 text-center text-xs text-scu-gray2 dark:text-neutral-500">发布页：{{ SITE.repoName }} · Releases</p>
  </Section>
</template>
