// 管理员模块
import { dynamicWrapper, createRoute } from '@/utils/core';

export const routeConfig = {
  path: '/admin',
  name: '管理员模块',
  title: '管理员模块',
  sort: 5
}
const routesConfig = app => ({
    ...routeConfig,
    ...{
      component: dynamicWrapper(app, [import('./model')], () => import('./components'))
    }
  });

export default app => createRoute(app, routesConfig);