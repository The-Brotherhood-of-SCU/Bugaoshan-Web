<script setup lang="ts">
import { features } from '../data/features'
import Section from './ui/Section.vue'
import Icon from './ui/Icon.vue'
</script>

<template>
  <Section id="features" eyebrow="02 / Field Index" title="校园生活，重新编目" description="四类常用服务，清晰集中。" tint>
    <div class="feature-index">
      <article v-for="(feature, index) in features" :key="feature.id" class="feature-entry">
        <span class="display-serif text-3xl leading-none text-[var(--wine)]">{{ String(index + 1).padStart(2, '0') }}</span>
        <div>
          <h3 class="text-lg font-bold text-[var(--ink)] sm:text-xl">{{ feature.title }}</h3>
          <p class="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">{{ feature.desc }}</p>
        </div>
        <span class="grid h-10 w-10 place-items-center border border-[var(--line)] text-[var(--wine)]" aria-hidden="true">
          <Icon :name="feature.icon" :size="19" />
        </span>
      </article>
    </div>
  </Section>
</template>
