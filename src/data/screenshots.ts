export interface Screenshot {
  src: string
  title: string
  alt: string
}

export const screenshots: Screenshot[] = [
  {
    src: '/screenshot-course.webp',
    title: '课表与小组件',
    alt: '不高山上 App 的课表与 Android 桌面小组件界面截图',
  },
  {
    src: '/screenshot-campus.webp',
    title: '校园服务',
    alt: '不高山上 App 的校园服务查询界面截图',
  },
  {
    src: '/screenshot-widget.webp',
    title: '桌面小组件',
    alt: '不高山上 App 的桌面小组件展示截图',
  },
]
