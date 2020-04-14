// 左侧菜单
export const menus = [
  {
    path: '/data',
    name: '数据管理',
    icon: 'dashboard',
    children: [
      { path: '/data_statistic', name: '数据统计', icon: 'chart', exact: true, },
      { path: '/disease_data', name: '疾病数据', icon: 'smile', exact: true, },
      { path: '/hospital_data', name: '医院数据', icon: 'smile', exact: true, },
    ],
  },
  {
    path: '/person',
    name: '人员管理',
    icon: 'team',
    children: [
      { path: '/user_manage', name: '用户管理', icon: 'user', exact: true, },
      { path: '/auth_manage', name: '权限管理', icon: 'grade', exact: true, },
    ],
  },
  {
    path: '/push',
    name: '推送管理',
    icon: 'smile',
    children: [
      { path: '/news_push', name: '医学信息推送', icon: 'smile', exact: true, },
    ],
  },
  {
    path: '/decision',
    name: '决策管理',
    icon: 'smile',
    children: [
      { path: '/decision_audit', name: '决策审核', icon: 'audit', exact: true, },
      { path: '/decision_setting', name: '决策设置', icon: 'setting', exact: true, },
    ],
  },
]
