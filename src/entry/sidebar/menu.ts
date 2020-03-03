// books: '读书笔记',
// ones: '随笔',
// aboutme: '关于我',
// musics: '歌单',
// dayreport: '日报',
const MenuConfig = [
  {
    key: 'music',
    title: '歌单管理',
    subMenu: [
      { path: '/musics/list', title: '列表' },
    ]
  }, {
    key: 'dayreport',
    title: '日报管理',
    subMenu: [
      { path: '/dayreport', title: '今日日报' },
    ]
  }
]

export default MenuConfig
