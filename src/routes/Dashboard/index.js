import { dynamicWrapper, createRoute } from '@/utils/core';


export const routeConfig = {
  path: '/dashboard',
  name: '仪表盘',
  title: '仪表盘',
  sort: 10
}


const routesConfig = app => ({
  ...routeConfig,
  ...{
    component: dynamicWrapper(app, [import('./model')], () => import('./components'))
  }
});

export default app => createRoute(app, routesConfig);
