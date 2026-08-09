<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    href: string
    variant?: 'primary' | 'secondary' | 'ghost' | 'light' | 'outline'
    external?: boolean
    className?: string
  }>(),
  { variant: 'primary', external: false, className: '' },
)

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scu-accent focus-visible:ring-offset-2'

const variants: Record<string, string> = {
  primary: 'bg-scu text-white hover:bg-scu-dark',
  secondary:
    'border border-scu text-scu hover:bg-scu hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-scu-dark',
  ghost: 'text-scu hover:bg-scu/10 dark:text-white dark:hover:bg-white/10',
  light: 'bg-white text-scu hover:bg-white/90',
  outline: 'border border-white text-white hover:bg-white/10',
}

const externalAttrs = computed(() =>
  props.external ? { target: '_blank', rel: 'noopener noreferrer' } : {},
)
</script>

<template>
  <a :href="href" :class="`${base} ${variants[variant]} ${className}`" v-bind="externalAttrs">
    <slot />
  </a>
</template>
