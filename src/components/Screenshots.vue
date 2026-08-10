<script setup lang="ts">
import { ref } from 'vue'
import { screenshots, type Screenshot } from '../data/screenshots'
import { asset } from '../lib/asset'
import Section from './ui/Section.vue'
import Icon from './ui/Icon.vue'

const dialogRef = ref<HTMLDialogElement | null>(null)
const active = ref<Screenshot | null>(null)

function open(screenshot: Screenshot) {
  active.value = screenshot
  dialogRef.value?.showModal()
}
</script>

<template>
  <Section id="screenshots" eyebrow="03 / Visual Notes" title="从界面，看见日常" description="点击画面查看应用细节。">
    <div class="flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-7 sm:grid sm:grid-cols-3 sm:gap-7 sm:overflow-visible sm:px-0 sm:pb-0">
      <button
        v-for="(screenshot, index) in screenshots"
        :key="screenshot.src"
        type="button"
        class="shot-frame focus-editorial group min-w-[78%] snap-center text-left sm:min-w-0"
        :aria-label="`放大查看：${screenshot.title}`"
        @click="open(screenshot)"
      >
        <div class="overflow-hidden bg-[var(--stone)]">
          <img
            :src="asset(screenshot.src)"
            :alt="screenshot.alt"
            loading="lazy"
            class="aspect-[9/16] w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
          />
        </div>
        <div class="flex items-center justify-between gap-3 px-2 pb-1 pt-4">
          <span class="font-bold text-[var(--ink)]">{{ screenshot.title }}</span>
          <span class="editorial-label text-[var(--faint)]">Plate 0{{ index + 1 }}</span>
        </div>
      </button>
    </div>

    <dialog ref="dialogRef" class="m-auto max-h-[92vh] max-w-[92vw] bg-transparent p-0 backdrop:bg-[#171411]/80" @close="active = null">
      <div v-if="active" class="relative border border-white/25 bg-[#211e1b] p-2 shadow-2xl sm:p-3">
        <img :src="asset(active.src)" :alt="active.alt" class="max-h-[84vh] max-w-[86vw] object-contain" />
        <button
          type="button"
          class="focus-editorial absolute right-4 top-4 inline-flex min-h-11 items-center gap-2 bg-[#211e1b]/90 px-4 text-sm font-semibold text-white"
          @click="dialogRef?.close()"
        ><Icon name="close" :size="17" /> 关闭</button>
      </div>
    </dialog>
  </Section>
</template>
