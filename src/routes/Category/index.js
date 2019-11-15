
import { dynamicWrapper, createRoute } from '@/utils/core';

export const routeConfig = {
  path: '/category',
  name: '分类模块',
  title: '分类模块',
  sort: 5
}
const routesConfig = app => (
  {
    ...routeConfig,
    ...{
      component: dynamicWrapper(app, [import('./model')], () => import('./components'))
    }
  });

export default app => createRoute(app, routesConfig)