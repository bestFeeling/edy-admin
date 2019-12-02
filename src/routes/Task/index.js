
import { dynamicWrapper, createRoute } from '@/utils/core';

export const routeConfig = {
  path: '/task',
  name: '任务模块',
  title: '任务模块',
  sort: 9
}
const routesConfig = app => (
  {
    ...routeConfig,
    ...{
      component: dynamicWrapper(app, [import('./model')], () => import('./components'))
    }
  });

export default app => createRoute(app, routesConfig)