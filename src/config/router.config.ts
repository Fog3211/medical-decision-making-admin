import { AuthManage, DataStatistic, DiseaseData } from '@pages/index'

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
    path: '/auth_manage',
    template: AuthManage,
    name: '权限管理',
    exact: true,
    key: 'auth_manage'
  },
  {
    path: '/',
    exact: true,
    redirect: '/home'
  }
]

export { routes }
