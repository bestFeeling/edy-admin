
import { dynamicWrapper, createRoute } from '@/utils/core';

export const routeConfig = {
  path: '/user',
  name: '用户模块',
  title: '用户模块',
  sort: 4
}
const routesConfig = app => (
  {
    ...routeConfig,
    ...{
      component: dynamicWrapper(app, [import('./model')], () => import('./components'))
    }
  });

export default app => createRoute(app, routesConfig)