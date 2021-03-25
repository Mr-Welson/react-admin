/* eslint-disable camelcase */
// 路由配置项
/**
    path 前端路由访问地址
    exact 是否严格匹配
    component 前端路由对应的组件路径
      绝对路径: '@/pages/index'
      相对路径（会从 src/pages 开始找起）: 'index'
    routes 配置子路由
    name: 路由标题
    icon: 菜单图标
    key: 路由的唯一标识符
    isLocal: 是否只在开发环境显示，如：Test 路由或临时路由
    hideInMenu: 是否显示在菜单，如详情页路由不需要显示在菜单
    needRedirect: 是否要重定向
    activeMenuKey: 手动指定需要激活的菜单
 */

import Login from '@/pages/login'
import Layout from '@/layouts/basic'
import SystemLayout from '@/layouts/system'
import Home from '@/pages/home'
import Test from '@/pages/test'
import User from '@/pages/system/user'
import Menu from '@/pages/system/menu'
import Dict from '@/pages/system/dict'
import Depart from '@/pages/system/depart'
import AddUser from '@/pages/system/user/addUser'
import ViewUser from '@/pages/system/user/viewUser'
import Role from '@/pages/system/role'
import Menu_1_1 from '@/pages/nested/menu-1/menu-1-1'
import Menu_1_2 from '@/pages/nested/menu-1/menu-1-2'
import Menu_2 from '@/pages/nested/menu-2'
import P404 from '@/pages/404'



export const staticRoutes = [
  {
    path: '/login',
    key: 'login',
    name: '登录',
    hideInMenu: true,
    component: Login,
  },
]
export const pageRoutes = [
  {
    path: '/',
    key: 'index',
    name: '首页',
    hideInMenu: true,
  },
  {
    path: '/404',
    key: '404',
    name: '404',
    icon: 'UserOutlined',
    hideInMenu: true,
    component: P404,
  },
  {
    path: '/home',
    key: 'home',
    name: '首页',
    icon: 'UserOutlined',
    component: Home,
  },
  {
    path: '/test',
    key: 'test',
    isLocal: true,
    name: '测试',
    icon: 'VideoCameraOutlined',
    component: Test,
  },
  {
    path: '/system',
    key: 'system',
    name: '系统管理',
    icon: 'UserOutlined',
    component: SystemLayout,
    routes: [
      {
        path: '/system/user',
        key: 'systemUser',
        name: '用户管理',
        icon: 'UserOutlined',
        component: User,
      },
      {
        path: '/system/user/add',
        key: 'userAdd',
        name: '添加用户',
        icon: 'UserOutlined',
        hideInMenu: true,
        component: AddUser,
      },
      {
        path: '/system/user/view/:id',
        key: 'userView',
        name: '查看用户',
        icon: 'UserOutlined',
        hideInMenu: true,
        component: ViewUser,
      },
      {
        path: '/system/role',
        key: 'systemRole',
        name: '角色管理',
        icon: 'UserOutlined',
        component: Role,
      },
      {
        path: '/system/menu',
        key: 'systemMenu',
        component: Menu,
        name: '菜单管理',
        icon: 'UserOutlined',
      },
      {
        path: '/system/depart',
        key: 'systemDepart',
        component: Depart,
        name: '部门管理',
        icon: 'UserOutlined',
      },
      {
        path: '/system/dict',
        key: 'systemDict',
        component: Dict,
        name: '字典管理',
        icon: 'UserOutlined',
      },
    ]
  },
  {
    path: '/nested',
    key: 'nested',
    name: '一级菜单',
    icon: 'UserOutlined',
    routes: [
      {
        path: '/nested/menu-1',
        key: 'menu-1',
        name: '二级菜单01',
        icon: 'UserOutlined',
        routes: [
          {
            path: '/nested/menu-1/menu-1-1',
            key: 'menu-1-1',
            name: '三级菜单01',
            icon: 'UserOutlined',
            component: Menu_1_1,
          },
          {
            path: '/nested/menu-1/menu-1-2',
            key: 'menu-1-2',
            name: '三级菜单02',
            icon: 'UserOutlined',
            component: Menu_1_2,
          }
        ]
      },
      {
        path: '/nested/menu-2',
        key: 'menu-2',
        name: '二级菜单02',
        icon: 'UserOutlined',
        component: Menu_2,
      },
    ]
  },
]

const routes = [
  ...staticRoutes,
  {
    path: '/',
    key: 'index',
    name: '布局',
    hideInMenu: true,
    component: Layout,
    routes: pageRoutes
  }
]

export default routes