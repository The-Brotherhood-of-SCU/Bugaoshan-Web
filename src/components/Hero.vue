<script setup lang="ts">
import { SITE } from '../data/site'
import { asset } from '../lib/asset'
import Button from './ui/Button.vue'
import Icon from './ui/Icon.vue'
</script>

<template>
  <section id="top" class="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-scu-dark via-scu to-scu-accent py-16 sm:py-20">
    <div class="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
    <div class="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
    <div class="relative mx-auto max-w-3xl px-6 text-center">
      <img :src="asset('favicon.svg')" alt="不高山上 Logo" class="mx-auto mb-5 h-16 w-16 rounded-2xl shadow-lg sm:h-20 sm:w-20" />
      <h1 class="text-4xl font-bold text-white drop-shadow-sm sm:text-5xl">{{ SITE.name }}</h1>
      <p class="mt-2 text-lg font-medium tracking-wide text-white/90">{{ SITE.nameEn }}</p>
      <p class="mt-3 text-base text-white/80 sm:text-lg">{{ SITE.tagline }}</p>
      <div class="mt-7 flex flex-wrap items-center justify-center gap-4">
        <Button href="#downloads" variant="light">
          <Icon name="arrowDown" :size="18" /> 立即下载
        </Button>
        <Button :href="SITE.repo" variant="outline" external>
          <Icon name="github" :size="18" /> GitHub
        </Button>
      </div>
      <p class="mt-6 text-sm text-white/60">开源 {{ SITE.license }} · Flutter 跨平台</p>
    </div>
  </section>
</template>
