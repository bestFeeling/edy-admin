// 管理员模块
import { dynamicWrapper, createRoute } from '@/utils/core';

export const routeConfig = {
  path: '/level',
  name: '用户星级模块',
  title: '用户星级模块',
  sort: 4
}
const routesConfig = app => ({
    ...routeConfig,
    ...{
      component: dynamicWrapper(app, [import('./model')], () => import('./components'))
    }
  });

export default app => createRoute(app, routesConfig);