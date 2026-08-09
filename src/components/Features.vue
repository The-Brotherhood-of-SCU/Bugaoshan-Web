<script setup lang="ts">
import { features } from '../data/features'
import Section from './ui/Section.vue'
import Icon from './ui/Icon.vue'
</script>

<template>
  <Section id="features" eyebrow="Features" title="核心特性" description="一站式聚合川大校园服务，把分散在各个系统的功能收进一个 App。">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="f in features"
        :key="f.id"
        class="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-neutral-900"
      >
        <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-scu/10 text-scu">
          <Icon :name="f.icon" :size="24" />
        </div>
        <h3 class="mb-2 text-lg font-semibold text-scu-dark dark:text-white">{{ f.title }}</h3>
        <p class="text-sm leading-relaxed text-scu-gray dark:text-neutral-400">{{ f.desc }}</p>
      </div>
    </div>
  </Section>
</template>
