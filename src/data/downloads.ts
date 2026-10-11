import { SITE } from './site'

export type Status = 'released' | 'beta' | 'adapting' | 'group'

export interface PlatformItem {
  id: 'android' | 'windows' | 'ios' | 'harmonyos' | 'linux'
  name: string
  subName: string
  icon: string
  status: Status
  note: string
  specs: string[]
  // released: 跳转链接；group: QQ群号
  href?: string
  groupNumber?: string
  hasQr?: boolean
}

export const platforms: PlatformItem[] = [
  {
    id: 'android',
    name: 'Android',
    subName: '安卓客户端',
    icon: 'android',
    status: 'released',
    note: '支持 Android 8.0 及以上版本，支持一键课表小组件与校园网无感认证。',
    specs: ['ARM64 / 通用 APK', '自动更新', '桌面小组件'],
    href: SITE.releases,
    hasQr: true,
  },
  {
    id: 'windows',
    name: 'Windows',
    subName: '桌面客户端',
    icon: 'windows',
    status: 'released',
    note: '支持 64 位 Windows 10 及以上系统，便携免安装，解压即用。',
    specs: ['x64 架构', '便携 ZIP 包', '原生桌面体验'],
    href: SITE.releases,
  },
  {
    id: 'ios',
    name: 'iOS / iPadOS',
    subName: '苹果客户端 · App Store',
    icon: 'apple',
    status: 'released',
    note: '已正式上架苹果 App Store，支持灵动岛与实时活动，适配 iPhone 与 iPad。',
    specs: ['App Store 官方版', '实时活动 / 灵动岛', '支持 iOS 16.1+'],
    href: SITE.appStore,
    hasQr: true,
  },
  {
    id: 'harmonyos',
    name: 'HarmonyOS',
    subName: '鸿蒙客户端',
    icon: 'harmonyos',
    status: 'adapting',
    note: '面向 HarmonyOS NEXT 纯血鸿蒙进行适配与测试，欢迎加群了解进度。',
    specs: ['NEXT 架构适配', '内测群专属跟进', '功能同步中'],
    groupNumber: SITE.groupNumber,
  },
  {
    id: 'linux',
    name: 'Linux',
    subName: '桌面客户端',
    icon: 'linux',
    status: 'released',
    note: '支持主流 Linux 桌面发行版，前往 GitHub Releases 获取归档包。',
    specs: ['x64 架构', 'GitHub Releases', '开源透明'],
    href: SITE.releases,
  },
]
