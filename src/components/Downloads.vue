<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { MiniGFM } from '@oblivionocean/minigfm'
import QRCode from 'qrcode'
import { downloads } from '../data/downloads'
import { SITE } from '../data/site'
import { useCopyFeedback } from '../composables/useCopyFeedback'
import { fetchLatestRelease, type Asset, type Release } from '../lib/github'
import Section from './ui/Section.vue'
import Badge from './ui/Badge.vue'
import Icon from './ui/Icon.vue'

const { copiedText: copiedNumber, copyText: copyNumber } = useCopyFeedback()

enum Platform {
  Windows = 'windows',
  Android = 'android',
  Linux = 'linux',
  Other = 'other',
}

// 模板中 v-for 已占用 platform 名,这里用 userPlatform 区分
const userPlatform = computed<Platform>(() => {
  const ua = navigator.userAgent
  if (/Windows/i.test(ua)) return Platform.Windows
  // Android UA 也含 "Linux",需先判断 Android
  if (/Android|HarmonyOS/i.test(ua)) return Platform.Android
  if (/Linux/i.test(ua)) return Platform.Linux
  return Platform.Other
})

const buttonText = computed(() => {
  switch (userPlatform.value) {
    case Platform.Windows:
      return '下载 Windows'
    case Platform.Android:
      return '下载 Android'
    case Platform.Linux:
      return '下载 Linux'
    default:
      return '下载安装包'
  }
})

// 最新 release,供「更多下载」弹窗展示
const latestRelease = ref<Release | null>(null)
const qrDataUrl = ref<string | null>(null)
const groupQrDataUrl = ref<string | null>(null)
const dialogRef = ref<HTMLDialogElement | null>(null)

// light 用暖米色而非透明,避免深色模式下二维码看不清
const qrOptions = {
  margin: 1,
  width: 224,
  color: { dark: '#211e1b', light: '#f2eee6' },
} as const

// MiniGFM 默认转义 HTML(防 XSS),GFM 兼容
const minigfm = new MiniGFM()

// release 说明(body)用 MiniGFM 渲染为 markdown
const renderedBody = computed(() =>
  latestRelease.value?.body ? minigfm.parse(latestRelease.value.body) : '',
)

function pickDefaultAsset(list: Asset[]): string | null {
  if (list.length === 0) return null
  switch (userPlatform.value) {
    case Platform.Windows:
      return (
        list.find((a) => a.name.endsWith('_windows_x64.zip')) ??
        list.find((a) => a.name.endsWith('.zip')) ??
        list[0]!
      ).browser_download_url
    case Platform.Android:
      return (
        list.find((a) => a.name.endsWith('_arm64-v8a.apk')) ??
        list.find((a) => a.name.endsWith('.apk')) ??
        list[0]!
      ).browser_download_url
    case Platform.Linux:
      return (
        list.find((a) => a.name.endsWith('_linux_x64.tar.gz')) ??
        list.find((a) => a.name.endsWith('.tar.gz')) ??
        list[0]!
      ).browser_download_url
    default:
      return list[0]!.browser_download_url
  }
}

// 主按钮默认下载目标:最新 release 中按平台挑选,失败时兜底 Releases
const primaryUrl = computed(() => pickDefaultAsset(latestRelease.value?.assets ?? []))

function downloadPrimary() {
  window.open(primaryUrl.value ?? SITE.releases, '_blank', 'noopener')
}

function openAllDownloads() {
  dialogRef.value?.showModal()
}

function onDialogClick(event: MouseEvent) {
  if (event.target === dialogRef.value) {
    dialogRef.value?.close()
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

onMounted(async () => {
  groupQrDataUrl.value = await QRCode.toDataURL(SITE.groupUrl, qrOptions)

  let qrTarget: string = SITE.releases
  const data = await fetchLatestRelease(SITE.repoName)
  if (data) {
    latestRelease.value = data
    const apk = data.assets.find((a) => a.name.endsWith('_arm64-v8a.apk'))
    if (apk) qrTarget = apk.browser_download_url
  }
  // 拉取失败时二维码仍指向 Releases 页面

  qrDataUrl.value = await QRCode.toDataURL(qrTarget, qrOptions)
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
                <h3 class="display-serif mt-3 flex flex-wrap items-baseline gap-x-2 text-3xl text-(--ink) sm:text-4xl">
                  <template v-for="(part, i) in platform.name.split(' / ')" :key="i">
                    <span v-if="i > 0" class="text-(--faint)">/</span>
                    <span>{{ part }}</span>
                  </template>
                </h3>
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
          :href="platform.href"
          target="_blank"
          rel="noopener noreferrer"
          class="download-ticket editorial-card editorial-card-interactive focus-editorial min-h-72 p-6 sm:p-8"
        >
          <div class="relative z-10 flex h-full flex-col">
            <div class="flex items-start justify-between gap-4 border-b border-dashed border-(--line) pb-6">
              <div>
                <p class="editorial-label text-(--faint)">Ticket / 0{{ index + 1 }}</p>
                <h3 class="display-serif mt-3 flex flex-wrap items-baseline gap-x-2 text-3xl text-(--ink) sm:text-4xl">
                  <template v-for="(part, i) in platform.name.split(' / ')" :key="i">
                    <span v-if="i > 0" class="text-(--faint)">/</span>
                    <span>{{ part }}</span>
                  </template>
                </h3>
              </div>
              <Badge :status="platform.status" />
            </div>
            <p class="mt-6 max-w-md text-sm leading-7 text-(--muted)">{{ platform.note }}</p>
            <div class="mt-6 flex flex-1 items-center justify-between gap-6">
              <div class="flex flex-col items-start gap-4">
                <!-- 常驻入口:位于 <a> 内,点击即触发整卡导航 -->
                <span class="inline-flex items-center gap-2 text-sm font-bold text-(--wine)">
                  前往 Releases <Icon name="external" :size="16" />
                </span>
                <!-- 平台化下载按钮 + 更多下载弹窗入口 -->
                <div class="flex flex-wrap items-center gap-3" @click.prevent.stop>
                  <button
                    type="button"
                    class="focus-editorial inline-flex min-h-11 items-center gap-2 border border-(--line-strong) px-4 text-sm font-bold text-(--wine) transition-colors hover:bg-(--paper-deep)"
                    @click="downloadPrimary"
                  >
                    <Icon name="download" :size="16" /> {{ buttonText }}
                  </button>
                  <button
                    type="button"
                    class="focus-editorial inline-flex min-h-11 items-center gap-2 border border-(--line-strong) px-4 text-sm font-bold text-(--wine) transition-colors hover:bg-(--paper-deep)"
                    @click="openAllDownloads"
                  >
                    更多下载 <Icon name="arrowDown" :size="16" />
                  </button>
                </div>
              </div>
              <!-- 二维码按空间显示:窄屏隐藏,宽屏显示 -->
              <span
                v-if="qrDataUrl"
                class="hidden flex-col items-center gap-2 sm:flex"
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

    <dialog
      ref="dialogRef"
      class="m-auto max-h-[90vh] w-[min(94vw,60rem)] bg-transparent p-0 backdrop:bg-[#171411]/80"
      @click="onDialogClick"
    >
      <div class="editorial-card flex max-h-[90vh] flex-col p-6 sm:p-10">
        <header class="flex items-start justify-between gap-4 border-b border-dashed border-(--line) pb-6">
          <div>
            <p class="editorial-label text-(--faint)">Latest Release</p>
            <h3 class="display-serif mt-2 text-3xl text-(--ink) sm:text-4xl">最新版本</h3>
          </div>
          <button
            type="button"
            class="focus-editorial inline-flex min-h-11 items-center gap-2 border border-(--line-strong) px-4 text-sm font-bold text-(--wine) transition-colors hover:bg-(--paper-deep)"
            @click="dialogRef?.close()"
          >
            <Icon name="close" :size="17" /> 关闭
          </button>
        </header>

        <p v-if="!latestRelease" class="flex flex-1 items-center justify-center py-16 text-center text-sm text-(--muted)">
          版本信息加载失败，请前往 GitHub Releases 查看。
        </p>

        <template v-if="latestRelease">
          <!-- 下载选项:始终显示,行式条目 -->
          <div class="mt-6 shrink-0">
            <p class="editorial-label text-(--faint)">Assets / 安装包</p>
            <ul class="mt-3 max-h-80 divide-y divide-(--line) overflow-y-auto border border-(--line)">
              <li v-for="asset in latestRelease.assets" :key="asset.name">
                <a
                  :href="asset.browser_download_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="focus-editorial flex min-w-0 items-center justify-between gap-4 px-4 py-2.5 transition-colors hover:bg-(--paper-deep)"
                >
                  <span class="inline-flex min-w-0 items-center gap-2.5 text-sm font-bold text-(--wine)">
                    <Icon name="download" :size="15" class="shrink-0" />
                    <span class="truncate">{{ asset.name }}</span>
                  </span>
                  <span class="editorial-label shrink-0 tabular-nums text-(--faint)">{{ formatSize(asset.size) }}</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- release info:占用剩余空间,超出可滚动 -->
          <div class="mt-6 min-h-0 flex-1 overflow-y-auto border-t border-dashed border-(--line) pt-6">
            <div class="flex flex-wrap items-baseline justify-between gap-3">
              <h4 class="display-serif text-2xl text-(--ink) sm:text-3xl">{{ latestRelease.tag_name }}</h4>
              <span class="editorial-label text-(--faint)">{{ formatDate(latestRelease.published_at) }}</span>
            </div>
            <!-- release 说明:MiniGFM 渲染的 markdown -->
            <div v-if="renderedBody" class="markdown-body mt-5 text-sm leading-7 text-(--muted)" v-html="renderedBody" />
          </div>
        </template>
      </div>
    </dialog>
  </Section>
</template>
