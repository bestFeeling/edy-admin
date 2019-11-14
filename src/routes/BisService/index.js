
import { dynamicWrapper, createRoute } from '@/utils/core';

export const routeConfig = {
  path: '/bisService',
  name: '商品服务模块',
  title: '商品服务模块',
  sort: 3
}
const routesConfig = app => (
  {
    ...routeConfig,
    ...{
      component: dynamicWrapper(app, [import('./model')], () => import('./components'))
    }
  });

export default app => createRoute(app, routesConfig)