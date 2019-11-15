
import { dynamicWrapper, createRoute } from '@/utils/core';

export const routeConfig = {
  path: '/bankCard',
  name: '银行卡模块',
  title: '银行卡模块',
  sort: 6
}
const routesConfig = app => (
  {
    ...routeConfig,
    ...{
      component: dynamicWrapper(app, [import('../User/model'), import('./model')], () => import('./components'))
    }
  });

export default app => createRoute(app, routesConfig)