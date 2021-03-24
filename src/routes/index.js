// 路由配置项
/**
    path 前端路由访问地址
    exact 是否严格匹配
    redirect 路由重定向
    component 前端路由对应的组件路径
      绝对路径: '@/pages/index'
      相对路径（会从 src/pages 开始找起）: 'index'
    routes 配置子路由
    wrappers (Type: string[]) 配置路由的高阶组件封装：比如，可以用于路由级别的权限校验
    name: 路由标题
    icon: 菜单图标
    key: 路由的唯一标识符
    isLocal: 是否只在开发环境显示，如：Test 路由或临时路由
    hideInMenu: 是否显示在菜单，如详情页路由不需要显示在菜单
    needRedirect: 是否要重定向
 */

import Login from '@/pages/login'
import Layout from '@/layouts/basic'
import SystemLayout from '@/layouts/system'
import Home from '@/pages/home'
import Test from '@/pages/test'
import User from '@/pages/system/user'
import Role from '@/pages/system/role'

export const routes = [
  {
    path: '/login',
    key: 'login',
    name: '登录',
    hideInMenu: true,
    component: Login,
  },
  {
    path: '/',
    key: 'login',
    name: '布局',
    // hideInMenu: true,
    component: Layout,
    routes: [
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
        name: '关于',
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
            path: '/system/role',
            key: 'systemRole',
            name: '角色管理',
            icon: 'UserOutlined',
            component: Role,
          },
          // {
          //   path: '/system/menu',
          //   key: 'systemMenu',
          //   component: '@/pages/system/menu',
          //   name: '菜单管理',
          //   icon: 'UserOutlined',
          // },
          // {
          //   path: '/system/depart',
          //   key: 'systemDepart',
          //   component: '@/pages/system/depart',
          //   name: '部门管理',
          //   icon: 'UserOutlined',
          // },
          // {
          //   path: '/system/dict',
          //   key: 'systemDict',
          //   component: '@/pages/system/dict',
          //   name: '字典管理',
          //   icon: 'UserOutlined',
          // },
        ]
      },
    ]
  }
]

export const pageRoutes = [
  {
    path: '/',
    redirect: '/home',
    exact: true,
  },
  {
    path: '/home',
    key: 'home',
    component: '@/pages/home',
    name: '首页',
    icon: 'UserOutlined',
  },
  {
    path: '/system',
    key: 'system',
    // component: '@/pages/system',
    name: '系统管理',
    icon: 'UserOutlined',
    needRedirect: true,
    routes: [
      // {
      //   path: '/system',
      //   redirect: '/system/user',
      //   exact: true,
      // },
      {
        path: '/system/user',
        key: 'systemUser',
        component: '@/pages/system/user',
        name: '用户管理',
        icon: 'UserOutlined',
      },
      {
        path: '/system/role',
        key: 'systemRole',
        component: '@/pages/system/role',
        name: '角色管理',
        icon: 'UserOutlined',
      },
      {
        path: '/system/menu',
        key: 'systemMenu',
        component: '@/pages/system/menu',
        name: '菜单管理',
        icon: 'UserOutlined',
      },
      {
        path: '/system/depart',
        key: 'systemDepart',
        component: '@/pages/system/depart',
        name: '部门管理',
        icon: 'UserOutlined',
      },
      {
        path: '/system/dict',
        key: 'systemDict',
        component: '@/pages/system/dict',
        name: '字典管理',
        icon: 'UserOutlined',
      },
      {
        // component: '@/pages/404',
        redirect: '/system/user',
        hideInMenu: true,
      },
    ]
  },
  {
    path: '/test',
    key: 'test',
    isLocal: true,
    component: '@/pages/test',
    name: '关于',
    icon: 'VideoCameraOutlined',
  },
  {
    path: '/nested',
    component: '@/layouts/nested',
    key: 'nested',
    name: '嵌套',
    icon: 'UploadOutlined',
    needRedirect: true,
    routes: [
      {
        path: '/nested',
        redirect: '/nested/menu-1/menu-1-1',
        exact: true,
      },
      {
        path: '/nested/menu-1',
        key: 'menu-1',
        name: 'menu-1',
        icon: 'VideoCameraOutlined',
        needRedirect: true,
        routes: [
          {
            path: '/nested/menu-1',
            redirect: '/nested/menu-1/menu-1-1',
            exact: true,
          },
          {
            path: '/nested/menu-1/menu-1-1',
            key: 'menu-1-1',
            component: '@/pages/nested/menu-1/menu-1-1',
            name: 'menu-1-1',
            icon: 'VideoCameraOutlined',
            // routes: [
            //   {
            //     此种配置暂不生效，待完善
            //     path: '/nested/menu-1/menu-1-1/:id',
            //     key: 'menu-1-1-detail',
            //     component: '@/pages/nested/menu-1/menu-1-1-detail',
            //     name: 'menu-1-1 详情',
            //     icon: 'VideoCameraOutlined',
            //     hideInMenu: true,
            //   },
            // ],
          },
          {
            path: '/nested/menu-1/menu-1-1/:id',
            key: 'menu-1-1-detail',
            component: '@/pages/nested/menu-1/menu-1-1-detail',
            name: 'menu-1-1 详情',
            icon: 'VideoCameraOutlined',
            hideInMenu: true
          },
          {
            path: '/nested/menu-1/menu-1-2',
            key: 'menu-1-2',
            component: '@/pages/nested/menu-1/menu-1-2',
            name: 'menu-1-2',
            icon: 'VideoCameraOutlined',
          },
        ]
      },
      {
        path: '/nested/menu-2',
        key: 'menu-2',
        component: '@/pages/nested/menu-2',
        name: 'menu-2',
        icon: 'VideoCameraOutlined',
      },
      {
        path: '/nested/menu-2-detail/:id?',
        key: 'menu-2-detail',
        component: '@/pages/nested/menu-2/menu-2-detail',
        name: 'menu 2 详情页',
        icon: 'VideoCameraOutlined',
        hideInMenu: true,
        activeMenuName: 'menu-2'
      }
    ],
  },
  {
    component: '@/pages/404',
    hideInMenu: true,
  },
]

export default routes