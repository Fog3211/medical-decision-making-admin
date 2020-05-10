// 左侧菜单
export const menus = [
  {
    path: '/data',
    name: '数据管理',
    icon: 'dashboard',
    children: [
      // { path: '/statistic', name: '数据统计', icon: 'chart', exact: true, },
      { path: '/disease', name: '疾病数据', icon: 'experiment', exact: true, },
      { path: '/hospital', name: '医院数据', icon: 'medicine', exact: true, },
    ],
  },
  {
    path: '/person',
    name: '人员管理',
    icon: 'team',
    children: [
      { path: '/user', name: '用户管理', icon: 'user', exact: true, },
      { path: '/adminer', name: '后台人员管理', icon: 'grade', exact: true, },
    ],
  },
  {
    path: '/decision',
    name: '决策管理',
    icon: 'profile',
    children: [
      { path: '/audit', name: '决策审核', icon: 'audit', exact: true, }
    ],
  },
]
