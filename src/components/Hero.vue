<script setup lang="ts">
import { SITE } from '../data/site'
import { asset } from '../lib/asset'
import Button from './ui/Button.vue'
import Icon from './ui/Icon.vue'
</script>

<template>
  <section id="top" class="hero-field overflow-hidden border-b border-[var(--line)]">
    <div class="mx-auto grid min-h-[calc(72svh-4.5rem)] max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 lg:min-h-[calc(88svh-4.5rem)] lg:grid-cols-12 lg:py-16">
      <div class="relative z-10 lg:col-span-7">
        <div class="mb-8 flex items-center gap-4">
          <span class="editorial-label border-y border-[var(--wine)] py-2 text-[var(--wine)]">SCU / Student Utility</span>
          <span class="h-px flex-1 bg-[var(--line)]"></span>
        </div>

        <h1 class="display-serif max-w-[9ch] text-[clamp(4.5rem,12vw,9rem)] leading-[0.84] text-[var(--ink)]">
          不高<span class="text-[var(--wine)]">山上</span>
        </h1>
        <p class="mt-4 font-serif text-xl tracking-[0.12em] text-[var(--muted)] sm:text-2xl">{{ SITE.nameEn }} · {{ SITE.tagline }}</p>
        <p class="mt-7 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg">课表、成绩与校园服务，一处抵达。</p>

        <div class="mt-7 flex flex-wrap gap-3">
          <Button href="#downloads" variant="primary">
            <Icon name="arrowDown" :size="18" /> 下载应用
          </Button>
          <Button :href="SITE.repo" variant="secondary" external>
            <Icon name="github" :size="18" /> 浏览源码
          </Button>
        </div>
      </div>

      <div class="hero-art hidden lg:col-span-5 lg:block" aria-hidden="true">
        <img :src="asset('favicon.svg')" alt="" class="hero-logo-svg" />
        <p class="editorial-label absolute bottom-0 left-0 z-10 text-[var(--muted)]">31.5° N / 104.0° E<br />Campus notes, rebuilt.</p>
      </div>
    </div>
  </section>
</template>
