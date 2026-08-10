<script setup lang="ts">
import { SITE } from '../data/site'
import { asset } from '../lib/asset'
import { useCopyFeedback } from '../composables/useCopyFeedback'
import Section from './ui/Section.vue'
import Icon from './ui/Icon.vue'

const { copiedText, copyText } = useCopyFeedback()
</script>

<template>
  <Section id="opensource" eyebrow="04 / Open Source" title="一起把它做好" description="开源，由学生共同维护。" tint>
    <div class="editorial-card grid overflow-hidden md:grid-cols-[1fr_23rem] md:items-stretch">
      <div class="flex items-center gap-5 p-6 sm:p-8">
        <img :src="asset('brotherhood-of-scu.png')" alt="The-Brotherhood-of-SCU 组织 Logo" class="h-16 w-16 shrink-0 border border-[var(--line)] bg-white object-cover" />
        <div>
          <h3 class="text-lg font-bold text-[var(--ink)]">{{ SITE.org }}</h3>
          <p class="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">项目基于 {{ SITE.license }} 协议开放，欢迎提交建议与代码。</p>
          <div class="mt-4 flex flex-wrap gap-5 text-sm font-bold">
            <a :href="SITE.repo" target="_blank" rel="noopener noreferrer" class="focus-editorial inline-flex items-center gap-2 text-[var(--wine)]"><Icon name="github" :size="16" /> 访问仓库</a>
            <a :href="SITE.contributing" target="_blank" rel="noopener noreferrer" class="focus-editorial text-[var(--wine)]">贡献指南</a>
          </div>
        </div>
      </div>

      <div class="border-t border-[var(--line)] bg-[var(--paper-raised)] p-6 md:border-l md:border-t-0 md:p-8">
        <div>
          <p class="editorial-label text-[var(--faint)]">Community</p>
          <p class="mt-2 font-bold text-[var(--ink)]">加入 QQ 交流群</p>
          <p class="mt-2 text-sm leading-6 text-[var(--muted)]">不熟悉 GitHub 也没关系。来和开发者及其他用户聊聊，反馈问题、提出想法，也可以及时了解版本与平台进展。</p>
          <div class="mt-4 inline-flex h-11 items-stretch border border-[var(--line-strong)]">
            <p class="inline-flex items-center px-4 text-sm font-semibold tracking-[0.06em] text-[var(--ink)]">{{ SITE.groupNumber }}</p>
            <button
              type="button"
              class="focus-editorial grid w-11 shrink-0 place-items-center border-l border-[var(--line-strong)] text-[var(--wine)] transition-colors hover:bg-[var(--paper-deep)]"
              :aria-label="`复制 QQ 群号 ${SITE.groupNumber}`"
              @click="copyText(SITE.groupNumber)"
            >
              <Icon :name="copiedText === SITE.groupNumber ? 'check' : 'copy'" :size="17" />
              <span class="sr-only" aria-live="polite">{{ copiedText === SITE.groupNumber ? '已复制' : '复制群号' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>
