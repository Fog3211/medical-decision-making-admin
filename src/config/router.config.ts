import { Demo, Test } from '@pages/index'

export interface routeConfigType {
  path?: string
  exact?: boolean
  name?: string
  redirect?: string
  template?: React.ComponentClass | React.FC
  children?: Array<any>
  key?: string
}

const routes: routeConfigType[] = [
  // {
  //   name: '父级菜单',
  //   key: 'father',
  //   children: [
  //     {
  //       path: '/child',
  //       template: Child,
  //       name: '子级菜单',
  //       breadCrumb: true,
  //       exact: true,
  //       key: 'child'
  //     }
  //   ]
  // },
  {
    path: '/demo',
    template: Demo,
    name: 'demo',
    exact: true,
    key: 'demo'
  },
  {
    path: '/test',
    template: Test,
    name: 'test',
    exact: true,
    key: 'demo'
  },
  {
    path: '/',
    exact: true,
    redirect: '/demo'
  }
]

export { routes }
