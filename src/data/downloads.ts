import { SITE } from './site'

export type Status = 'released' | 'group'

export interface Platform {
  name: string
  status: Status
  note: string
  // released: 跳转链接；group: 直接展示群号（不跳转）
  href?: string
  groupNumber?: string
}

export const downloads: Platform[] = [
  {
    name: 'Android / Windows',
    status: 'released',
    note: '前往 GitHub Releases 获取最新安装包。',
    href: SITE.releases,
  },
  {
    name: '鸿蒙 / iOS',
    status: 'group',
    note: '暂未公开发布，请加群了解内测邀测。',
    groupNumber: SITE.groupNumber,
  },
]
