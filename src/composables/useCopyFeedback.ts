import { onBeforeUnmount, ref } from 'vue'

export function useCopyFeedback(resetDelay = 2000) {
  const copiedText = ref<string | null>(null)
  let resetTimer: ReturnType<typeof setTimeout> | undefined

  async function copyText(text: string | undefined) {
    if (!text) return

    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // 非安全上下文下使用临时 textarea 兼容复制。
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
    }

    copiedText.value = text
    if (resetTimer) clearTimeout(resetTimer)
    resetTimer = setTimeout(() => (copiedText.value = null), resetDelay)
  }

  onBeforeUnmount(() => {
    if (resetTimer) clearTimeout(resetTimer)
  })

  return { copiedText, copyText }
}
