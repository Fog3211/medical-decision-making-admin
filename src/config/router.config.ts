import {
  DataStatistic, DiseaseData,
  UserManage, AuthManage,
  Login
} from '@pages/index'

export interface routeConfigType {
  path?: string
  exact?: boolean
  name?: string
  redirect?: string
  template?: React.ComponentClass | React.FC
  children?: any[]
  key?: string
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
    path: '/login',
    template: Login,
    name: '登录界面',
    exact: true,
    key: 'login'
  },
  {
    path: '/',
    exact: true,
    redirect: '/home'
  }
]

export { routes }
