export interface Feature {
  id: string
  title: string
  desc: string
  icon: string
}

export const features: Feature[] = [
  {
    id: 'study',
    title: '学业助手',
    desc: '课表、成绩、日历导出与培养方案，集中管理学习进度。',
    icon: 'calendar',
  },
  {
    id: 'campus',
    title: '校园查询',
    desc: '考表、体测、空闲教室与校园网设备，随时查询。',
    icon: 'search',
  },
  {
    id: 'life',
    title: '校园生活',
    desc: '校园卡、网费与电费余额，一处查看历史变化。',
    icon: 'wallet',
  },
  {
    id: 'personal',
    title: '信息与个性',
    desc: '聚合校园通知，并提供主题、字体与 Dock 定制。',
    icon: 'palette',
  },
]
