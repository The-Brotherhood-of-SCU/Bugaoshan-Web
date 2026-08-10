<script setup lang="ts">
import { onMounted, ref } from 'vue'
import QRCode from 'qrcode'
import { downloads } from '../data/downloads'
import { SITE } from '../data/site'
import { useCopyFeedback } from '../composables/useCopyFeedback'
import Section from './ui/Section.vue'
import Badge from './ui/Badge.vue'
import Icon from './ui/Icon.vue'

const { copiedText: copiedNumber, copyText: copyNumber } = useCopyFeedback()

function downloadWindows() {
  if (winUrl.value) {
    window.open(winUrl.value, '_blank', 'noopener')
  }
}

const isMobile = ref(false)
// 最新 Release 中 arm64-v8a APK 的直链；获取失败时回退到 Releases 页面
const apkUrl = ref<string | null>(null)
const winUrl = ref<string | null>(null)
const qrDataUrl = ref<string | null>(null)
const groupQrDataUrl = ref<string | null>(null)

const qrOptions = {
  margin: 1,
  width: 224,
  color: { dark: '#211e1b', light: '#00000000' },
} as const

onMounted(async () => {
  isMobile.value = /Android|iPhone|iPad|HarmonyOS|Mobile/i.test(navigator.userAgent)

  if (!isMobile.value) {
    groupQrDataUrl.value = await QRCode.toDataURL(SITE.groupUrl, qrOptions)
  }

  let qrTarget: string = SITE.releases
  try {
    const res = await fetch(`https://api.github.com/repos/${SITE.repoName}/releases/latest`)
    if (res.ok) {
      const data = (await res.json()) as {
        assets?: { name: string; browser_download_url: string }[]
      }
      const apk = data.assets?.find((a) => a.name.endsWith('_arm64-v8a.apk'))
      if (apk) {
        apkUrl.value = apk.browser_download_url
        qrTarget = apk.browser_download_url
      }
      const win = data.assets?.find((a) => a.name.endsWith('_windows_x64.zip'))
      if (win) {
        winUrl.value = win.browser_download_url
      }
    }
  } catch {
    // 网络失败时二维码仍指向 Releases 页面
  }

  if (!isMobile.value) {
    qrDataUrl.value = await QRCode.toDataURL(qrTarget, qrOptions)
  }
})
</script>

<template>
  <Section id="downloads" eyebrow="01 / Download" title="从这里出发" description="下载公开版本，或加入内测交流群。">
    <div class="grid gap-5 lg:grid-cols-2">
      <template v-for="(platform, index) in downloads" :key="platform.name">
        <article v-if="platform.status === 'group'" class="download-ticket editorial-card min-h-72 p-6 sm:p-8">
          <div class="relative z-10 flex h-full flex-col">
            <div class="flex items-start justify-between gap-4 border-b border-dashed border-(--line) pb-6">
              <div>
                <p class="editorial-label text-(--faint)">Ticket / 0{{ index + 1 }}</p>
                <h3 class="display-serif mt-3 text-3xl text-(--ink) sm:text-4xl">{{ platform.name }}</h3>
              </div>
              <Badge :status="platform.status" />
            </div>
            <p class="mt-6 max-w-md text-sm leading-7 text-(--muted)">{{ platform.note }}</p>
            <div class="mt-6 flex flex-1 flex-wrap items-center justify-between gap-6">
              <div>
                <p class="editorial-label text-(--faint)">QQ Group</p>
                <p class="mt-2 text-2xl font-semibold tracking-[0.08em] text-(--ink)">{{ platform.groupNumber }}</p>
              </div>
              <button
                type="button"
                class="focus-editorial inline-flex min-h-11 items-center gap-2 border border-(--line-strong) px-4 text-sm font-bold text-(--wine) transition-colors hover:bg-(--paper-deep) sm:hidden"
                :aria-label="`复制 QQ 群号 ${platform.groupNumber}`"
                @click="copyNumber(platform.groupNumber)"
              >
                <Icon :name="copiedNumber === platform.groupNumber ? 'check' : 'copy'" :size="16" />
                <span aria-live="polite">{{ copiedNumber === platform.groupNumber ? '已复制' : '复制群号' }}</span>
              </button>
              <span v-if="groupQrDataUrl" class="hidden flex-col items-center gap-2 sm:flex">
                <img :src="groupQrDataUrl" alt="扫码加入 QQ 内测群" class="h-32 w-32" />
                <span class="editorial-label text-(--faint)">扫码加群</span>
              </span>
            </div>
          </div>
        </article>

        <a
          v-else
          :href="isMobile && apkUrl ? apkUrl : platform.href"
          target="_blank"
          rel="noopener noreferrer"
          class="download-ticket editorial-card editorial-card-interactive focus-editorial min-h-72 p-6 sm:p-8"
        >
          <div class="relative z-10 flex h-full flex-col">
            <div class="flex items-start justify-between gap-4 border-b border-dashed border-(--line) pb-6">
              <div>
                <p class="editorial-label text-(--faint)">Ticket / 0{{ index + 1 }}</p>
                <h3 class="display-serif mt-3 text-3xl text-(--ink) sm:text-4xl">{{ platform.name }}</h3>
              </div>
              <Badge :status="platform.status" />
            </div>
            <p class="mt-6 max-w-md text-sm leading-7 text-(--muted)">{{ platform.note }}</p>
            <div class="mt-6 flex flex-1 items-center justify-between gap-6">
              <div class="flex flex-col items-start gap-4">
                <span class="inline-flex items-center gap-2 text-sm font-bold text-(--wine)">
                  <template v-if="isMobile">下载安装包 <Icon name="download" :size="16" /></template>
                  <template v-else>前往 Releases <Icon name="external" :size="16" /></template>
                </span>
                <button
                  v-if="winUrl"
                  type="button"
                  class="focus-editorial hidden min-h-11 items-center gap-2 border border-(--line-strong) px-4 text-sm font-bold text-(--wine) transition-colors hover:bg-(--paper-deep) sm:inline-flex"
                  @click.prevent.stop="downloadWindows"
                >
                  <Icon name="download" :size="16" /> 下载 Windows 版
                </button>
              </div>
              <span
                v-if="qrDataUrl"
                class="flex flex-col items-center gap-2"
                @click.prevent.stop
              >
                <img :src="qrDataUrl" alt="扫码下载 Android 安装包" class="h-32 w-32" />
                <span class="editorial-label text-(--faint)">扫码下载安卓版</span>
              </span>
            </div>
          </div>
        </a>
      </template>
    </div>
  </Section>
</template>
