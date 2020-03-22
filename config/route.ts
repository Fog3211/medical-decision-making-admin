export const routes = [
  {
    path: '/welcome',
    component: '@/pages/index',
    layout: {
      hideNav: true,
    },
    access: 'canRead',
  },
];
