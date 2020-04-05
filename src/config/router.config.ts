import {
  DataStatistic, DiseaseData,
  UserManage, AuthManage,
  NotFound, Home
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
    path: '/home',
    template: Home,
    name: '主页',
    exact: true,
    key: 'home'
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
    redirect: '/404'
  }
]

export { routes }
