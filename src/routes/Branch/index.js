
import { dynamicWrapper, createRoute } from '@/utils/core';

export const routeConfig = {
  path: '/branch',
  name: '分会模块',
  title: '分会模块',
  sort: 2
}
const routesConfig = app => (
  {
    ...routeConfig,
    ...{
      component: dynamicWrapper(app, [import('./model')], () => import('./components'))
    }
  });

export default app => createRoute(app, routesConfig)