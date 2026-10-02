// 站点级常量：站名、仓库、外链
export const SITE = {
  name: '不高山上',
  nameEn: 'Bugaoshan',
  tagline: '川大学生专属校园助手',
  license: 'AGPL-3.0',
  org: 'The-Brotherhood-of-SCU',
  repo: 'https://github.com/The-Brotherhood-of-SCU/Bugaoshan',
  docs: 'https://bugaoshan-docs.scubro.dev/',
  repoName: 'The-Brotherhood-of-SCU/Bugaoshan',
  releases: 'https://github.com/The-Brotherhood-of-SCU/Bugaoshan/releases/latest',
  // GitHub 下载加速镜像(gh-proxy)前缀:完整 GitHub 下载链接直接拼在其后
  mirrorPrefix: 'https://v4.gh-proxy.org/',
  // 官方 QQ 群号（取自 App 的 EULA：1102483776）。仅展示群号，不跳转。
  groupNumber: '1102483776',
  // QQ 群二维码内容（一键加群链接）
  groupUrl: 'https://qm.qq.com/q/aTufDyVwnS',
  contributing:
    'https://github.com/The-Brotherhood-of-SCU/Bugaoshan/blob/main/CONTRIBUTING.md',
  licenseUrl:
    'https://github.com/The-Brotherhood-of-SCU/Bugaoshan/blob/main/LICENSE',
  appstream: 'io.github.the_brotherhood_of_scu.bugaoshan',
} as const
