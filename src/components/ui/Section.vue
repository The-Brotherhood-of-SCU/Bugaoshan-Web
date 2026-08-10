<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    id: string
    eyebrow?: string
    title: string
    description?: string
    className?: string
    dark?: boolean
    tint?: boolean
  }>(),
  { className: '', dark: false, tint: false },
)

const surface = computed(() =>
  props.dark ? 'section-dark' : props.tint ? 'section-tint' : 'section-surface',
)
</script>

<template>
  <section :id="id" :aria-labelledby="`${id}-title`" :class="`relative py-20 sm:py-28 ${surface} ${className}`">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <header class="grid gap-6 border-t border-[var(--line)] pt-5 md:grid-cols-12 md:items-start">
        <p v-if="eyebrow" class="editorial-label text-[var(--wine)] md:col-span-3">
          {{ eyebrow }}
        </p>
        <div class="md:col-span-5">
          <h2 :id="`${id}-title`" class="display-serif text-4xl leading-[1.05] text-current sm:text-5xl">
            {{ title }}
          </h2>
        </div>
        <p v-if="description" class="max-w-[42rem] text-base leading-7 text-[var(--muted)] md:col-span-4">
          {{ description }}
        </p>
      </header>
      <div class="mt-12 sm:mt-16"><slot /></div>
    </div>
  </section>
</template>
