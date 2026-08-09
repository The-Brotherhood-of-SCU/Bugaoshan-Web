<script setup lang="ts">
import { ref } from 'vue'
import { screenshots, type Screenshot } from '../data/screenshots'
import { asset } from '../lib/asset'
import Section from './ui/Section.vue'

const dialogRef = ref<HTMLDialogElement | null>(null)
const active = ref<Screenshot | null>(null)

function open(s: Screenshot) {
  active.value = s
  dialogRef.value?.showModal()
}
</script>

<template>
  <Section id="screenshots" eyebrow="Preview" title="功能截图" description="课表、校园服务与桌面小组件，看看它长什么样。" tint>
    <div class="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
      <button
        v-for="s in screenshots"
        :key="s.src"
        type="button"
        @click="open(s)"
        class="group min-w-[80%] snap-center overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scu-accent sm:min-w-0 dark:border-white/10 dark:bg-neutral-900"
      >
        <img :src="asset(s.src)" :alt="s.alt" loading="lazy" class="aspect-[9/16] w-full object-cover" />
        <p class="px-4 py-3 text-center text-sm font-medium text-scu-dark dark:text-white">{{ s.title }}</p>
      </button>
    </div>

    <dialog
      ref="dialogRef"
      @close="active = null"
      class="m-auto max-w-[90vw] rounded-2xl bg-transparent backdrop:bg-black/70"
    >
      <div v-if="active" class="relative">
        <img :src="asset(active.src)" :alt="active.alt" class="max-h-[85vh] rounded-2xl object-contain shadow-2xl" />
        <button
          type="button"
          @click="dialogRef?.close()"
          class="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-sm text-white hover:bg-black/80"
        >关闭</button>
      </div>
    </dialog>
  </Section>
</template>
