import {
  DataStatistic, DiseaseData,
  UserManage, AuthManage,
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
    path: '/data_statistic',
    template: DataStatistic,
    name: '数据统计',
    exact: true,
    key: 'data_statistic'
  },
  {
    path: '/disease_data',
    template: DiseaseData,
    name: '疾病数据',
    exact: true,
    key: 'disease_data'
  },
  {
    path: '/hospital_data',
    template: HospitalData,
    name: '医院数据',
    exact: true,
    key: 'hospital_data'
  },
  {
    path: '/user_manage',
    template: UserManage,
    name: '用户管理',
    exact: true,
    key: 'user_manage'
  },
  {
    path: '/auth_manage',
    template: AuthManage,
    name: '权限管理',
    exact: true,
    key: 'auth_manage'
  },
  {
    path: '/news_push',
    template: NewsPush,
    name: '医学知识推送',
    exact: true,
    key: 'news_push'
  },
  {
    path: '/decision_audit',
    template: DecisionAudit,
    name: '决策审核',
    exact: true,
    key: 'decision_audit'
  },
  {
    path: '/decision_setting',
    template: DecisionSetting,
    name: '决策管理',
    exact: true,
    key: 'decision_setting'
  },
  {
    path: '/home',
    template: Home,
    name: '主页',
    exact: true,
    key: 'home'
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
