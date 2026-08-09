<script setup lang="ts">
import type { Status } from '../../data/downloads'

defineProps<{ status: Status }>()

const styles: Record<Status, string> = {
  released: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  group: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
}
const labels: Record<Status, string> = {
  released: '已发布',
  group: '加群了解',
}
</script>

<template>
  <span :class="`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`">
    {{ labels[status] }}
  </span>
</template>
