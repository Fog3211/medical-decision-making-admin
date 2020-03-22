import { defineConfig } from 'umi';

export default defineConfig({
  base: '/',
  publicPath: '/',
  hash: false,
  history: {
    type: 'browser',
  },
  antd: {
    // dark: true,
  },
  lessLoader: { javascriptEnabled: true },
  layout: {
    name: '辅助医疗决策后台',
    // locale: true,
    // logo: './src/assets/logo.svg',
    moveMock: false,
    moveService: false,
    modifyRequest: true,
    autoAddMenu: true,
  },
  // routes: [
  //     { exact: true, path: '/', component: '@/pages/index' },
  //     { exact: true, path: '/user', component: '@/pages/user/index' },
  // ],
  routes: [
    {
      exact: true,
      path: '/',
      component: '@/pages/index',
      menu: {
        name: '欢迎', // 兼容此写法
        icon: 'testicon',
      },
    },
    {
      exact: true,
      path: '/user',
      component: '@/pages/user/index',
      menu: {
        name: 'user', // 兼容此写法
        //   icon: 'testicon',
      },
    },
  ],
});
