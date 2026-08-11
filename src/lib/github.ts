// GitHub Releases API 封装:类型定义与最新 release 拉取

export interface Asset {
  name: string
  browser_download_url: string
  size: number
}

export interface Release {
  tag_name: string
  name: string | null
  published_at: string
  body: string | null
  assets: Asset[]
}

/** 拉取最新 release;网络失败或响应异常时返回 null */
export async function fetchLatestRelease(repoName: string): Promise<Release | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repoName}/releases/latest`)
    if (res.ok) {
      return (await res.json()) as Release
    }
  } catch {
    // 网络失败
  }
  return null
}
