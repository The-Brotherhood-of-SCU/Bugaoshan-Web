<script setup lang="ts">
import Section from './ui/Section.vue'
import Icon from './ui/Icon.vue'
</script>

<template>
  <Section id="disclaimer" eyebrow="Disclaimer" title="免责声明" dark>
    <div role="note" class="mx-auto max-w-3xl rounded-2xl border border-scu-accent/60 bg-scu-accent/10 p-8 text-center">
      <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-scu-accent/15 text-scu-accent">
        <Icon name="shield" :size="24" />
      </div>
      <p class="text-lg font-semibold text-white">本应用为非官方第三方应用，与四川大学不存在隶属、授权或认可关系。</p>
      <p class="mt-3 text-sm text-gray-300">
        This is an unofficial third-party application and is not affiliated with or endorsed by Sichuan University.
      </p>
    </div>
  </Section>
</template>
