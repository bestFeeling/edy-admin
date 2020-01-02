import { dynamicWrapper, createRoute } from '@/utils/core';

export const routeConfig = {
  path: '/omen',
  name: '风水分类模块',
  title: '风水分类模块',
  sort: 10
}
const routesConfig = app => ({
    ...routeConfig,
    ...{
      component: dynamicWrapper(app, [import('./model')], () => import('./components'))
    }
  });

export default app => createRoute(app, routesConfig);