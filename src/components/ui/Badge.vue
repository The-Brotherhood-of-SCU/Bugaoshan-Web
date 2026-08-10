<script setup lang="ts">
import type { Status } from '../../data/downloads'

defineProps<{ status: Status }>()

const styles: Record<Status, string> = {
  released: 'border-[var(--wine)] text-[var(--wine)]',
  group: 'border-[var(--line-strong)] text-[var(--muted)]',
}
const labels: Record<Status, string> = {
  released: '已发布',
  group: '加群了解',
}
</script>

<template>
  <span :class="`editorial-label inline-flex items-center border px-3 py-1.5 ${styles[status]}`">
    {{ labels[status] }}
  </span>
</template>
