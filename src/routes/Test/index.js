import { dynamicWrapper, createRoute } from '@/utils/core';

export const routeConfig = {
  path: '/test',
  name: '测试',
  title: '测试标题',
  sort: 3
}

const routesConfig = app => ({
  ...routeConfig,
  ...{
    component: dynamicWrapper(app, [import('./model')], () => import('./components'))
  }
});

export default app => createRoute(app, routesConfig);
