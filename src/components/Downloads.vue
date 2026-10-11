<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import QRCode from 'qrcode'
import { SITE } from '../data/site'
import { useCopyFeedback } from '../composables/useCopyFeedback'
import { fetchLatestRelease, type Asset, type Release } from '../lib/github'
import Section from './ui/Section.vue'
import Badge from './ui/Badge.vue'
import Icon from './ui/Icon.vue'

const { copiedText: copiedNumber, copyText: copyNumber } = useCopyFeedback()

// 最新 release
const latestRelease = ref<Release | null>(null)
const apkQrDataUrl = ref<string | null>(null)
const appStoreQrDataUrl = ref<string | null>(null)
const groupQrDataUrl = ref<string | null>(null)
const dialogRef = ref<HTMLDialogElement | null>(null)

// 二维码主题配置
const qrOptions = {
  margin: 1,
  width: 140,
  color: { dark: '#211e1b', light: '#f2eee6' },
} as const

// release 说明(body)用 marked 渲染
const renderedBody = computed(() => {
  const body = latestRelease.value?.body
  if (!body) return ''
  return DOMPurify.sanitize(marked.parse(body, { async: false }))
})

// GitHub 镜像加速工具
function toMirrorUrl(url: string) {
  return SITE.mirrorPrefix + url
}

// 挑选 Android 安装包 (优先 arm64-v8a, 其次 universal, 其次任意 apk)
const androidAsset = computed<Asset | null>(() => {
  const list = latestRelease.value?.assets ?? []
  return (
    list.find((a) => a.name.endsWith('_arm64-v8a.apk')) ??
    list.find((a) => a.name.endsWith('_universal.apk')) ??
    list.find((a) => a.name.endsWith('.apk')) ??
    null
  )
})

const androidUrl = computed(() => androidAsset.value?.browser_download_url ?? SITE.releases)
const androidMirrorUrl = computed(() => (androidAsset.value ? toMirrorUrl(androidUrl.value) : null))

// 挑选 Windows 安装包
const windowsAsset = computed<Asset | null>(() => {
  const list = latestRelease.value?.assets ?? []
  return (
    list.find((a) => a.name.endsWith('_windows_x64.zip')) ??
    list.find((a) => a.name.endsWith('.zip')) ??
    null
  )
})

const windowsUrl = computed(() => windowsAsset.value?.browser_download_url ?? SITE.releases)
const windowsMirrorUrl = computed(() => (windowsAsset.value ? toMirrorUrl(windowsUrl.value) : null))

// 挑选 Linux 安装包
const linuxAsset = computed<Asset | null>(() => {
  const list = latestRelease.value?.assets ?? []
  return (
    list.find((a) => a.name.endsWith('_linux_x64.tar.gz')) ??
    list.find((a) => a.name.endsWith('.tar.gz')) ??
    null
  )
})

const linuxUrl = computed(() => linuxAsset.value?.browser_download_url ?? SITE.releases)

function downloadAndroid() {
  window.open(androidUrl.value, '_blank', 'noopener')
}

function downloadAndroidMirror() {
  if (androidMirrorUrl.value) {
    window.open(androidMirrorUrl.value, '_blank', 'noopener')
  }
}

function downloadWindows() {
  window.open(windowsUrl.value, '_blank', 'noopener')
}

function downloadWindowsMirror() {
  if (windowsMirrorUrl.value) {
    window.open(windowsMirrorUrl.value, '_blank', 'noopener')
  }
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
  appStoreQrDataUrl.value = await QRCode.toDataURL(SITE.appStore, qrOptions)

  let qrTarget: string = SITE.releases
  const data = await fetchLatestRelease(SITE.repoName)
  if (data) {
    latestRelease.value = data
    const apk =
      data.assets.find((a) => a.name.endsWith('_arm64-v8a.apk')) ??
      data.assets.find((a) => a.name.endsWith('.apk'))
    if (apk) qrTarget = apk.browser_download_url
  }

  apkQrDataUrl.value = await QRCode.toDataURL(qrTarget, qrOptions)
})
</script>

<template>
  <Section id="downloads" eyebrow="01 / Download" title="全平台支持与下载" description="清晰选择适合你设备的版本，或加入内测交流群。">
    <!-- 主平台卡片网格 -->
    <div class="grid gap-6 lg:grid-cols-2">
      <!-- 1. Android 卡片 -->
      <article
        id="platform-android"
        class="editorial-card scroll-mt-24 p-6 sm:p-8 flex flex-col justify-between"
      >
        <div>
          <div class="flex items-start justify-between gap-4 border-b border-dashed border-[var(--line)] pb-5">
            <div class="flex items-center gap-3.5">
              <span class="grid h-12 w-12 place-items-center border border-[var(--line)] bg-[var(--paper)] text-[var(--wine)]">
                <Icon name="android" :size="26" />
              </span>
              <div>
                <h3 class="display-serif text-3xl text-[var(--ink)] sm:text-4xl">Android</h3>
                <p class="editorial-label mt-1 text-[var(--faint)]">安卓客户端 · 官方稳定版</p>
              </div>
            </div>
            <Badge status="released" />
          </div>

          <p class="mt-5 text-sm leading-7 text-[var(--muted)]">
            支持 Android 8.0 及以上版本。内置全天课表桌面小组件、倒计时与校园网无感认证。
          </p>

          <div class="mt-4 flex flex-wrap gap-2">
            <span class="editorial-label border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 text-[0.68rem] text-[var(--faint)]">ARM64-v8a</span>
            <span class="editorial-label border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 text-[0.68rem] text-[var(--faint)]">通用 APK</span>
            <span class="editorial-label border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 text-[0.68rem] text-[var(--faint)]">桌面小组件</span>
          </div>
        </div>

        <div class="mt-7 flex flex-wrap items-center justify-between gap-5 border-t border-dashed border-[var(--line)] pt-6">
          <div class="flex flex-wrap items-center gap-3">
            <button
              type="button"
              class="focus-editorial inline-flex min-h-11 items-center gap-2 border border-[var(--wine)] bg-[var(--wine)] px-5 text-sm font-bold text-[#fffaf2] transition-colors hover:bg-[var(--wine-deep)]"
              @click="downloadAndroid"
            >
              <Icon name="download" :size="16" /> 下载 APK
            </button>
            <button
              v-if="androidMirrorUrl"
              type="button"
              class="focus-editorial inline-flex min-h-11 items-center gap-2 border border-[var(--line-strong)] px-4 text-sm font-bold text-[var(--wine)] transition-colors hover:bg-[var(--paper-deep)]"
              title="国内高速镜像加速"
              @click="downloadAndroidMirror"
            >
              <Icon name="download" :size="16" /> 镜像加速
            </button>
            <button
              type="button"
              class="focus-editorial inline-flex min-h-11 items-center gap-1.5 border border-[var(--line)] px-3 text-xs font-bold text-[var(--muted)] transition-colors hover:bg-[var(--paper-deep)] hover:text-[var(--wine)]"
              @click="openAllDownloads"
            >
              更多版本 <Icon name="arrowDown" :size="14" />
            </button>
          </div>

          <div v-if="apkQrDataUrl" class="hidden sm:flex flex-col items-center gap-1.5">
            <img :src="apkQrDataUrl" alt="扫码下载 Android APK" class="h-24 w-24 border border-[var(--line)]" />
            <span class="editorial-label text-[0.62rem] text-[var(--faint)]">手机扫码直下</span>
          </div>
        </div>
      </article>

      <!-- 2. Windows 卡片 -->
      <article
        id="platform-windows"
        class="editorial-card scroll-mt-24 p-6 sm:p-8 flex flex-col justify-between"
      >
        <div>
          <div class="flex items-start justify-between gap-4 border-b border-dashed border-[var(--line)] pb-5">
            <div class="flex items-center gap-3.5">
              <span class="grid h-12 w-12 place-items-center border border-[var(--line)] bg-[var(--paper)] text-[var(--wine)]">
                <Icon name="windows" :size="26" />
              </span>
              <div>
                <h3 class="display-serif text-3xl text-[var(--ink)] sm:text-4xl">Windows</h3>
                <p class="editorial-label mt-1 text-[var(--faint)]">桌面客户端 · 免安装便携版</p>
              </div>
            </div>
            <Badge status="released" />
          </div>

          <p class="mt-5 text-sm leading-7 text-[var(--muted)]">
            支持 64 位 Windows 10 / 11 操作系统。绿色便携包，解压即可运行，大屏课表与教务查询更舒心。
          </p>

          <div class="mt-4 flex flex-wrap gap-2">
            <span class="editorial-label border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 text-[0.68rem] text-[var(--faint)]">x64 架构</span>
            <span class="editorial-label border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 text-[0.68rem] text-[var(--faint)]">免安装 ZIP</span>
            <span class="editorial-label border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 text-[0.68rem] text-[var(--faint)]">原生窗口</span>
          </div>
        </div>

        <div class="mt-7 flex flex-wrap items-center justify-between gap-5 border-t border-dashed border-[var(--line)] pt-6">
          <div class="flex flex-wrap items-center gap-3">
            <button
              type="button"
              class="focus-editorial inline-flex min-h-11 items-center gap-2 border border-[var(--wine)] bg-[var(--wine)] px-5 text-sm font-bold text-[#fffaf2] transition-colors hover:bg-[var(--wine-deep)]"
              @click="downloadWindows"
            >
              <Icon name="download" :size="16" /> 下载 Windows 版
            </button>
            <button
              v-if="windowsMirrorUrl"
              type="button"
              class="focus-editorial inline-flex min-h-11 items-center gap-2 border border-[var(--line-strong)] px-4 text-sm font-bold text-[var(--wine)] transition-colors hover:bg-[var(--paper-deep)]"
              title="国内高速镜像加速"
              @click="downloadWindowsMirror"
            >
              <Icon name="download" :size="16" /> 镜像加速
            </button>
            <button
              type="button"
              class="focus-editorial inline-flex min-h-11 items-center gap-1.5 border border-[var(--line)] px-3 text-xs font-bold text-[var(--muted)] transition-colors hover:bg-[var(--paper-deep)] hover:text-[var(--wine)]"
              @click="openAllDownloads"
            >
              版本详情 <Icon name="arrowDown" :size="14" />
            </button>
          </div>
        </div>
      </article>

      <!-- 3. iOS / iPadOS 卡片 -->
      <article
        id="platform-ios"
        class="editorial-card scroll-mt-24 p-6 sm:p-8 flex flex-col justify-between"
      >
        <div>
          <div class="flex items-start justify-between gap-4 border-b border-dashed border-[var(--line)] pb-5">
            <div class="flex items-center gap-3.5">
              <span class="grid h-12 w-12 place-items-center border border-[var(--line)] bg-[var(--paper)] text-[var(--wine)]">
                <Icon name="apple" :size="26" />
              </span>
              <div>
                <h3 class="display-serif text-3xl text-[var(--ink)] sm:text-4xl">iOS / iPadOS</h3>
                <p class="editorial-label mt-1 text-[var(--faint)]">苹果客户端 · App Store 官方版</p>
              </div>
            </div>
            <Badge status="released" />
          </div>

          <p class="mt-5 text-sm leading-7 text-[var(--muted)]">
            已正式上架 Apple App Store。原生流畅体验，支持锁屏与灵动岛实时活动、课表桌面小组件，完美适配 iPhone 与 iPad。
          </p>

          <div class="mt-4 flex flex-wrap gap-2">
            <span class="editorial-label border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 text-[0.68rem] text-[var(--faint)]">App Store</span>
            <span class="editorial-label border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 text-[0.68rem] text-[var(--faint)]">灵动岛 / 实时活动</span>
            <span class="editorial-label border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 text-[0.68rem] text-[var(--faint)]">支持 iOS 16.1+</span>
          </div>
        </div>

        <div class="mt-7 flex flex-wrap items-center justify-between gap-5 border-t border-dashed border-[var(--line)] pt-6">
          <div class="flex flex-wrap items-center gap-3">
            <a
              :href="SITE.appStore"
              target="_blank"
              rel="noopener noreferrer"
              class="focus-editorial inline-flex min-h-11 items-center gap-2 border border-[var(--wine)] bg-[var(--wine)] px-5 text-sm font-bold text-[#fffaf2] transition-colors hover:bg-[var(--wine-deep)]"
            >
              <Icon name="apple" :size="16" /> App Store 下载
            </a>
            <button
              type="button"
              class="focus-editorial inline-flex min-h-11 items-center gap-2 border border-[var(--line-strong)] px-4 text-sm font-bold text-[var(--wine)] transition-colors hover:bg-[var(--paper-deep)]"
              :aria-label="`复制 App Store 链接`"
              @click="copyNumber(SITE.appStore)"
            >
              <Icon :name="copiedNumber === SITE.appStore ? 'check' : 'copy'" :size="16" />
              <span>{{ copiedNumber === SITE.appStore ? '链接已复制' : '复制商店链接' }}</span>
            </button>
          </div>

          <div v-if="appStoreQrDataUrl" class="hidden sm:flex flex-col items-center gap-1.5">
            <img :src="appStoreQrDataUrl" alt="扫码前往 App Store 下载" class="h-24 w-24 border border-[var(--line)]" />
            <span class="editorial-label text-[0.62rem] text-[var(--faint)]">相机扫码直达</span>
          </div>
        </div>
      </article>

      <!-- 4. HarmonyOS 卡片 -->
      <article
        id="platform-harmonyos"
        class="editorial-card scroll-mt-24 p-6 sm:p-8 flex flex-col justify-between"
      >
        <div>
          <div class="flex items-start justify-between gap-4 border-b border-dashed border-[var(--line)] pb-5">
            <div class="flex items-center gap-3.5">
              <span class="grid h-12 w-12 place-items-center border border-[var(--line)] bg-[var(--paper)] text-[var(--wine)]">
                <Icon name="harmonyos" :size="26" />
              </span>
              <div>
                <h3 class="display-serif text-3xl text-[var(--ink)] sm:text-4xl">HarmonyOS</h3>
                <p class="editorial-label mt-1 text-[var(--faint)]">鸿蒙客户端 · NEXT 适配中</p>
              </div>
            </div>
            <Badge status="adapting" />
          </div>

          <p class="mt-5 text-sm leading-7 text-[var(--muted)]">
            正在面向 HarmonyOS NEXT 纯血鸿蒙进行底层与组件适配。欢迎加入官方群了解技术进展、参与尝鲜体验。
          </p>

          <div class="mt-4 flex flex-wrap gap-2">
            <span class="editorial-label border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 text-[0.68rem] text-[var(--faint)]">HarmonyOS NEXT</span>
            <span class="editorial-label border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 text-[0.68rem] text-[var(--faint)]">纯血鸿蒙</span>
            <span class="editorial-label border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 text-[0.68rem] text-[var(--faint)]">内测群同步</span>
          </div>
        </div>

        <div class="mt-7 flex flex-wrap items-center justify-between gap-5 border-t border-dashed border-[var(--line)] pt-6">
          <div class="flex flex-col items-start gap-3">
            <div>
              <p class="editorial-label text-[var(--faint)]">官方交流群</p>
              <p class="mt-1 text-2xl font-semibold tracking-wider text-[var(--ink)]">{{ SITE.groupNumber }}</p>
            </div>
            <button
              type="button"
              class="focus-editorial inline-flex min-h-11 items-center gap-2 border border-[var(--line-strong)] px-4 text-sm font-bold text-[var(--wine)] transition-colors hover:bg-[var(--paper-deep)]"
              :aria-label="`复制 QQ 群号 ${SITE.groupNumber}`"
              @click="copyNumber(SITE.groupNumber)"
            >
              <Icon :name="copiedNumber === SITE.groupNumber ? 'check' : 'copy'" :size="16" />
              <span>{{ copiedNumber === SITE.groupNumber ? '群号已复制' : '复制 QQ 群号' }}</span>
            </button>
          </div>

          <div v-if="groupQrDataUrl" class="hidden sm:flex flex-col items-center gap-1.5">
            <img :src="groupQrDataUrl" alt="扫码加入 QQ 交流群" class="h-24 w-24 border border-[var(--line)]" />
            <span class="editorial-label text-[0.62rem] text-[var(--faint)]">扫码申请加群</span>
          </div>
        </div>
      </article>

      <!-- 5. Linux 卡片 -->
      <article
        id="platform-linux"
        class="editorial-card scroll-mt-24 p-6 sm:p-8 lg:col-span-2 flex flex-col justify-between"
      >
        <div class="grid gap-6 md:grid-cols-12 md:items-center">
          <div class="md:col-span-8">
            <div class="flex items-start justify-between gap-4 border-b border-dashed border-[var(--line)] pb-5">
              <div class="flex items-center gap-3.5">
                <span class="grid h-12 w-12 place-items-center border border-[var(--line)] bg-[var(--paper)] text-[var(--wine)]">
                  <Icon name="linux" :size="26" />
                </span>
                <div>
                  <h3 class="display-serif text-3xl text-[var(--ink)] sm:text-4xl">Linux</h3>
                  <p class="editorial-label mt-1 text-[var(--faint)]">桌面客户端 · 开源 Releases</p>
                </div>
              </div>
              <Badge status="released" />
            </div>

            <p class="mt-5 text-sm leading-7 text-[var(--muted)]">
              支持主流 Linux 桌面发行版（Ubuntu / Arch / Debian / Fedora 等）。可通过 GitHub Releases 获取发布包或自行编译构建。
            </p>

            <div class="mt-4 flex flex-wrap gap-2">
              <span class="editorial-label border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 text-[0.68rem] text-[var(--faint)]">x64 架构</span>
              <span class="editorial-label border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 text-[0.68rem] text-[var(--faint)]">GitHub Releases</span>
              <span class="editorial-label border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 text-[0.68rem] text-[var(--faint)]">源码开放</span>
            </div>
          </div>

          <div class="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center items-start md:items-end">
            <a
              :href="linuxUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="focus-editorial inline-flex min-h-11 w-full sm:w-auto md:w-full items-center justify-center gap-2 border border-[var(--wine)] bg-[var(--wine)] px-5 text-sm font-bold text-[#fffaf2] transition-colors hover:bg-[var(--wine-deep)]"
            >
              <Icon name="download" :size="16" /> 下载 Linux 版
            </a>
            <a
              :href="SITE.releases"
              target="_blank"
              rel="noopener noreferrer"
              class="focus-editorial inline-flex min-h-11 w-full sm:w-auto md:w-full items-center justify-center gap-2 border border-[var(--line-strong)] px-4 text-sm font-bold text-[var(--wine)] transition-colors hover:bg-[var(--paper-deep)]"
            >
              <Icon name="external" :size="16" /> 前往 Releases 页面
            </a>
          </div>
        </div>
      </article>
    </div>

    <!-- 底部版本与资产总览条 -->
    <div class="editorial-card mt-6 p-6 sm:p-7 flex flex-wrap items-center justify-between gap-6 border-t border-[var(--line)] bg-[var(--paper-deep)]/40">
      <div class="flex items-center gap-4">
        <span class="grid h-10 w-10 shrink-0 place-items-center border border-[var(--line)] bg-[var(--paper-raised)] text-[var(--wine)]">
          <Icon name="sparkles" :size="20" />
        </span>
        <div>
          <p class="editorial-label text-[var(--faint)]">Latest Release / 最新版本</p>
          <p class="display-serif mt-0.5 text-xl font-bold text-[var(--ink)]">
            {{ latestRelease ? latestRelease.tag_name : 'v2.5.3' }}
            <span v-if="latestRelease" class="font-sans text-xs font-normal text-[var(--muted)] ml-2">({{ formatDate(latestRelease.published_at) }})</span>
          </p>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <button
          type="button"
          class="focus-editorial inline-flex min-h-11 items-center gap-2 border border-[var(--wine)] px-5 text-sm font-bold text-[var(--wine)] transition-colors hover:bg-[var(--wine)] hover:text-[#fffaf2]"
          @click="openAllDownloads"
        >
          <Icon name="download" :size="16" /> 查看所有安装包与更新日志
        </button>
        <a
          :href="SITE.releases"
          target="_blank"
          rel="noopener noreferrer"
          class="focus-editorial inline-flex min-h-11 items-center gap-2 border border-[var(--line-strong)] px-4 text-sm font-bold text-[var(--muted)] transition-colors hover:bg-[var(--paper-deep)] hover:text-[var(--ink)]"
        >
          <Icon name="external" :size="16" /> GitHub Releases
        </a>
      </div>
    </div>

    <!-- 更多下载与更新日志弹窗 -->
    <dialog
      ref="dialogRef"
      class="m-auto max-h-[90vh] w-[min(94vw,60rem)] bg-transparent p-0 backdrop:bg-[#171411]/80"
      @click="onDialogClick"
    >
      <div class="editorial-card flex max-h-[90vh] flex-col p-6 sm:p-10">
        <header class="flex items-start justify-between gap-4 border-b border-dashed border-[var(--line)] pb-6">
          <div>
            <p class="editorial-label text-[var(--faint)]">Latest Release / Assets</p>
            <h3 class="display-serif mt-2 text-3xl text-[var(--ink)] sm:text-4xl">版本安装包与更新说明</h3>
          </div>
          <button
            type="button"
            class="focus-editorial inline-flex min-h-11 items-center gap-2 border border-[var(--line-strong)] px-4 text-sm font-bold text-[var(--wine)] transition-colors hover:bg-[var(--paper-deep)]"
            @click="dialogRef?.close()"
          >
            <Icon name="close" :size="17" /> 关闭
          </button>
        </header>

        <p v-if="!latestRelease" class="flex flex-1 items-center justify-center py-16 text-center text-sm text-[var(--muted)]">
          版本信息加载失败，请前往 GitHub Releases 查看。
        </p>

        <template v-if="latestRelease">
          <!-- 安装包清单 -->
          <div class="mt-6 shrink-0">
            <p class="editorial-label text-[var(--faint)]">Assets / 所有架构安装包</p>
            <ul class="mt-3 max-h-80 divide-y divide-[var(--line)] overflow-y-auto border border-[var(--line)]">
              <li v-for="asset in latestRelease.assets" :key="asset.name" class="flex items-stretch">
                <a
                  :href="asset.browser_download_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="focus-editorial flex min-w-0 flex-1 items-center justify-between gap-4 px-4 py-2.5 transition-colors hover:bg-[var(--paper-deep)]"
                >
                  <span class="inline-flex min-w-0 items-center gap-2.5 text-sm font-bold text-[var(--wine)]">
                    <Icon name="download" :size="15" class="shrink-0" />
                    <span class="truncate">{{ asset.name }}</span>
                  </span>
                  <span class="editorial-label shrink-0 tabular-nums text-[var(--faint)]">{{ formatSize(asset.size) }}</span>
                </a>
                <a
                  :href="toMirrorUrl(asset.browser_download_url)"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="经 gh-proxy 镜像加速下载"
                  :aria-label="`镜像下载 ${asset.name}`"
                  class="focus-editorial flex shrink-0 items-center gap-1.5 border-l border-[var(--line)] px-3 text-xs font-bold text-[var(--muted)] transition-colors hover:bg-[var(--paper-deep)] hover:text-[var(--wine)]"
                >
                  镜像加速
                </a>
              </li>
            </ul>
          </div>

          <!-- 更新日志 markdown -->
          <div class="mt-6 min-h-0 flex-1 overflow-y-auto border-t border-dashed border-[var(--line)] pt-6">
            <div class="flex flex-wrap items-baseline justify-between gap-3">
              <h4 class="display-serif text-2xl text-[var(--ink)] sm:text-3xl">{{ latestRelease.tag_name }}</h4>
              <span class="editorial-label text-[var(--faint)]">{{ formatDate(latestRelease.published_at) }}</span>
            </div>
            <div v-if="renderedBody" class="markdown-body mt-5 text-sm leading-7 text-[var(--muted)]" v-html="renderedBody" />
          </div>
        </template>
      </div>
    </dialog>
  </Section>
</template>
