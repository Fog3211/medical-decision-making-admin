export const menus = [
  {
    path: '/',
    name: 'welcome',
    icon: 'smile',
    children: [
      {
        path: '/demo',
        name: 'two',
        icon: 'smile',
        exact: true,
      },
    ],
  },
  {
    path: '/test',
    name: 'test',
    icon: 'heart',
  },
]