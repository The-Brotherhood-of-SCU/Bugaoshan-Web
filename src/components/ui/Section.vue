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

const bg = computed(() =>
  props.dark
    ? 'bg-scu-dark text-white'
    : props.tint
      ? 'bg-scu/5 text-scu-gray dark:bg-scu/10 dark:text-neutral-300'
      : 'bg-white text-scu-gray dark:bg-neutral-950 dark:text-neutral-300',
)
</script>

<template>
  <section :id="id" :aria-labelledby="`${id}-title`" :class="`py-20 sm:py-24 ${bg} ${className}`">
    <div class="mx-auto max-w-6xl px-6">
      <div class="mx-auto max-w-2xl text-center">
        <p
          v-if="eyebrow"
          :class="`mb-3 text-sm font-semibold tracking-widest uppercase ${dark ? 'text-scu-accent' : 'text-scu dark:text-scu-accent'}`"
        >{{ eyebrow }}</p>
        <h2
          :id="`${id}-title`"
          :class="`text-3xl font-bold sm:text-4xl ${dark ? 'text-white' : 'text-scu-dark dark:text-white'}`"
        >{{ title }}</h2>
        <p v-if="description" class="mt-4 text-base leading-relaxed sm:text-lg">{{ description }}</p>
      </div>
      <div class="mt-14"><slot /></div>
    </div>
  </section>
</template>
