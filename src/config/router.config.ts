import {
  DataStatistic, DiseaseData,
  UserManage, AdminerManage,
  NotFound, Home, ModifyPassword,
  NewsPush, DecisionSetting, DecisionAudit,
  HospitalData
} from '@pages/index'

export interface routeConfigType {
  path?: string
  exact?: boolean
  name?: string
  redirect?: string
  template?: React.ComponentClass | React.FC
  children?: any[]
  key?: string
  noBread?: boolean
}

const routes: routeConfigType[] = [
  {
    path: '/statistic',
    template: DataStatistic,
    name: '数据统计',
    exact: true,
    key: 'statistic'
  },
  {
    path: '/disease',
    template: DiseaseData,
    name: '疾病数据',
    exact: true,
    key: 'disease'
  },
  {
    path: '/hospital',
    template: HospitalData,
    name: '医院数据',
    exact: true,
    key: 'hospital'
  },
  {
    path: '/user',
    template: UserManage,
    name: '用户管理',
    exact: true,
    key: 'user'
  },
  {
    path: '/adminer',
    template: AdminerManage,
    name: '后台人员管理',
    exact: true,
    key: 'adminer'
  },
  {
    path: '/news',
    template: NewsPush,
    name: '医学知识推送',
    exact: true,
    key: 'news'
  },
  {
    path: '/audit',
    template: DecisionAudit,
    name: '决策审核',
    exact: true,
    key: 'decision_audit'
  },
  {
    path: '/decisionSetting',
    template: DecisionSetting,
    name: '决策管理',
    exact: true,
    key: 'decisionSetting'
  },
  {
    path: '/home',
    template: Home,
    name: '主页',
    exact: true,
    key: 'home',
    noBread: true
  },
  {
    path: '/modifyPassword',
    template: ModifyPassword,
    name: '修改密码',
    exact: true,
    key: 'modifyPassword',
    noBread: true
  },
  {
    path: '/404',
    template: NotFound,
    name: '页面丢失',
    exact: true,
    key: '404',
    noBread: true
  },
  {
    path: '/',
    exact: true,
    redirect: '/home'
  }
]

export { routes }
