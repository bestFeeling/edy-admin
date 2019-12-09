import { createRoutes } from '@/utils/core';
import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
import NotFound from './Pages/404';
import Login from './Login';
import Register from './Register';
import Blank from './Blank';
import Notice from './Notice'
import Branch from './Branch'
import BisService from './BisService'
import User from './User'
import Admin from './Admin'
import Test from './Test'
import Category from './Category'
import Bankcard from './Bankcard'
import PushMessage from './PushMessge'
import Task from './Task'
import Dashboard from './Dashboard'

/**
 * 主路由配置
 * 
 * path 路由地址
 * component 组件
 * indexRoute 默认显示路由
 * childRoutes 所有子路由
 * NotFound 路由要放到最下面，当所有路由当没匹配到时会进入这个页面
 */
const routesConfig = app => [
  {
    path: '/sign',
    title: '登录',
    indexRoute: '/sign/login',
    component: UserLayout,
    childRoutes: [
      Login(app),
      Register(app),
      NotFound()
    ]
  },
  {
    path: '/',
    title: '系统中心',
    component: BasicLayout,
    indexRoute: '/notice',
    childRoutes: [
      Blank(app),
      Notice(app),
      Branch(app),
      // BisService(app),
      User(app),
      Test(app),
      Admin(app),
      Category(app),
      Bankcard(app),
      PushMessage(app),
      Task(app),
      Dashboard(app),
      NotFound()
    ]
  }
];

export default app => createRoutes(app, routesConfig);
