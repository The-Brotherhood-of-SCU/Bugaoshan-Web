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
  'focus-editorial inline-flex min-h-12 items-center justify-center gap-2 border px-6 py-3 text-sm font-bold tracking-wide transition-[transform,background-color,color,border-color] duration-200 hover:-translate-y-0.5'

const variants: Record<string, string> = {
  primary: 'border-[var(--wine)] bg-[var(--wine)] text-[#fffaf2] hover:border-[var(--wine-deep)] hover:bg-[var(--wine-deep)]',
  secondary:
    'border-[var(--line-strong)] bg-transparent text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]',
  ghost: 'border-transparent text-[var(--wine)] hover:border-[var(--line)] hover:bg-[var(--paper-raised)]',
  light: 'border-[#fffaf2] bg-[#fffaf2] text-[#57262a] hover:bg-transparent hover:text-[#fffaf2]',
  outline: 'border-[#fffaf2]/60 bg-transparent text-[#fffaf2] hover:border-[#fffaf2] hover:bg-[#fffaf2]/10',
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
