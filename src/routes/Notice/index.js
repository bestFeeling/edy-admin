import { dynamicWrapper, createRoute } from '@/utils/core';

export const routeConfig = {
  path: '/notice',
  name: '公告模块',
  title: '公告模块',
  sort: 1
}
const routesConfig = app => (
  {
    ...routeConfig,
    ...{
      component: dynamicWrapper(app, [import('./model')], () => import('./components'))
    }
  });

export default app => createRoute(app, routesConfig);