export const menus = [
  {
    path: '/data',
    name: '数据管理',
    icon: 'dashboard',
    children: [
      { path: '/data_statistic', name: '数据统计', icon: 'chart', exact: true, },
      { path: '/disease_data', name: '疾病数据', icon: 'smile', exact: true, },
      { path: '/ttt', name: '医院数据', icon: 'smile', exact: true, },
    ],
  },
  {
    path: '/person',
    name: '人员管理',
    icon: 'team',
    children: [
      { path: '/user_manage', name: '用户管理', icon: 'user', exact: true, },
      { path: '/auth_manage', name: '权限管理', icon: 'smile', exact: true, },
    ],
  },
  {
    path: '/push',
    name: '推送管理',
    icon: 'smile',
    children: [
      { path: '/', name: '医学信息推送', icon: 'smile', exact: true, },
      { path: '/医学信息推送', name: 'two', icon: 'smile', exact: true, },
    ],
  },
  {
    path: '/person_setting',
    name: '个人设置',
    icon: 'setting',
    children: [
      { path: '/personal_account', name: '个人账户', icon: 'password', exact: true, },
      { path: '/lang_setting', name: '多语言支持', icon: 'global', exact: true, },
      { path: '/theme_setting', name: '自定义主题', icon: 'theme', exact: true, },
    ],
  },
]