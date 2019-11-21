import { dynamicWrapper, createRoute } from '@/utils/core';

export const routeConfig = {
  path: '/push',
  name: '消息模块',
  title: '消息模块',
  sort: 8
}
const routesConfig = app => ({
    ...routeConfig,
    ...{
      component: dynamicWrapper(app, [import('./model')], () => import('./components'))
    }
  });

export default app => createRoute(app, routesConfig);