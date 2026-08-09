export interface Feature {
  id: string
  title: string
  desc: string
  icon: string
}

export const features: Feature[] = [
  {
    id: 'timetable',
    title: '课表管理',
    desc: '多来源导入课表，支持 Android 桌面小组件随时查看。',
    icon: 'calendar',
  },
  {
    id: 'export',
    title: '课表导出',
    desc: '一键导出 ICS，导入系统日历，永不错过课程。',
    icon: 'download',
  },
  {
    id: 'grades',
    title: '成绩与通过率',
    desc: '自定义统计与通过率分析，直观掌握学业情况。',
    icon: 'chart',
  },
  {
    id: 'plan',
    title: '培养方案',
    desc: '查询修读情况与培养方案，清晰了解学习进度。',
    icon: 'book',
  },
  {
    id: 'campus',
    title: '校园查询',
    desc: '考表、体测、空闲教室、校园网设备一应俱全。',
    icon: 'search',
  },
  {
    id: 'balance',
    title: '余额管理',
    desc: '校园卡 / 网费 / 电费一键查，历史趋势一目了然。',
    icon: 'wallet',
  },
  {
    id: 'notice',
    title: '通知公告',
    desc: '聚合教务处、学工部、青春川大最新动态。',
    icon: 'bell',
  },
  {
    id: 'custom',
    title: '个性定制',
    desc: '主题色、字体、自定义 Dock，打造专属体验。',
    icon: 'palette',
  },
]
