<script setup lang="ts">
import { downloads } from '../data/downloads'
import { useCopyFeedback } from '../composables/useCopyFeedback'
import Section from './ui/Section.vue'
import Badge from './ui/Badge.vue'
import Icon from './ui/Icon.vue'

const { copiedText: copiedNumber, copyText: copyNumber } = useCopyFeedback()
</script>

<template>
  <Section id="downloads" eyebrow="01 / Download" title="从这里出发" description="下载公开版本，或加入内测交流群。">
    <div class="grid gap-5 lg:grid-cols-2">
      <template v-for="(platform, index) in downloads" :key="platform.name">
        <article v-if="platform.status === 'group'" class="download-ticket editorial-card min-h-72 p-6 sm:p-8">
          <div class="relative z-10 flex h-full flex-col">
            <div class="flex items-start justify-between gap-4 border-b border-dashed border-[var(--line)] pb-6">
              <div>
                <p class="editorial-label text-[var(--faint)]">Ticket / 0{{ index + 1 }}</p>
                <h3 class="display-serif mt-3 text-3xl text-[var(--ink)] sm:text-4xl">{{ platform.name }}</h3>
              </div>
              <Badge :status="platform.status" />
            </div>
            <p class="mt-6 max-w-md text-sm leading-7 text-[var(--muted)]">{{ platform.note }}</p>
            <div class="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
              <div>
                <p class="editorial-label text-[var(--faint)]">QQ Group</p>
                <p class="mt-2 text-2xl font-semibold tracking-[0.08em] text-[var(--ink)]">{{ platform.groupNumber }}</p>
              </div>
              <button
                type="button"
                class="focus-editorial inline-flex min-h-11 items-center gap-2 border border-[var(--line-strong)] px-4 text-sm font-bold text-[var(--wine)] transition-colors hover:bg-[var(--paper-deep)]"
                :aria-label="`复制 QQ 群号 ${platform.groupNumber}`"
                @click="copyNumber(platform.groupNumber)"
              >
                <Icon :name="copiedNumber === platform.groupNumber ? 'check' : 'copy'" :size="16" />
                <span aria-live="polite">{{ copiedNumber === platform.groupNumber ? '已复制' : '复制群号' }}</span>
              </button>
            </div>
          </div>
        </article>

        <a
          v-else
          :href="platform.href"
          target="_blank"
          rel="noopener noreferrer"
          class="download-ticket editorial-card editorial-card-interactive focus-editorial min-h-72 p-6 sm:p-8"
        >
          <div class="relative z-10 flex h-full flex-col">
            <div class="flex items-start justify-between gap-4 border-b border-dashed border-[var(--line)] pb-6">
              <div>
                <p class="editorial-label text-[var(--faint)]">Ticket / 0{{ index + 1 }}</p>
                <h3 class="display-serif mt-3 text-3xl text-[var(--ink)] sm:text-4xl">{{ platform.name }}</h3>
              </div>
              <Badge :status="platform.status" />
            </div>
            <p class="mt-6 max-w-md text-sm leading-7 text-[var(--muted)]">{{ platform.note }}</p>
            <span class="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold text-[var(--wine)]">
              前往 Releases <Icon name="external" :size="16" />
            </span>
          </div>
        </a>
      </template>
    </div>
  </Section>
</template>
