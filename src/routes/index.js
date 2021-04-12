/* eslint-disable camelcase */
/**
 * @description 路由配置项
 * @param {String} path 前端路由访问地址
 * @param {?Boolean} exact true 是否严格匹配
 * @param {?ReactComponentElement} component 前端路由对应的组件路径
 * @param {?Array} routes 配置子路由
 * @param {String} name 路由标题
 * @param {?String} icon 路由图标
 * @param {String} key 路由的唯一标识符(不能重复)
 * @param {?String} authKey 按钮权限(可以重复)
 *    同时包含 authKey 、path 和 component 则表示该权限可以通过路由打开
 *    只包含 authKey, 不包含 path 和 component 则表示该权限没有对应路由
 * @param {?Boolean} isLocal 是否只在开发环境显示，如 Test 路由或临时路由
 * @param {?Boolean} hideInMenu 是否在导航菜单中显示，如详情页路由不需要显示在菜单
 * @param {?String} activeMenuKey 手动指定需要激活的菜单
 *    通常直接通过 path 匹配来决定激活的菜单和面包屑
 *    如 /system/user/add 会同时匹配 /system 、/system/user、/system/user/add 3个菜单
 * @param {?Boolean} unAuth 是否不需要通过权限校验，如 404 路由不需要权验证
 */
import { lazy } from 'react';
import Layout from '@/layouts/basic'
import Login from '@/pages/login'
// import Menu_1_1 from '@/pages/nested/menu-1/menu-1-1'
// import Menu_1_2 from '@/pages/nested/menu-1/menu-1-2'
// import Menu_2 from '@/pages/nested/menu-2'
const P404 = lazy(() => import('@/pages/404'));
const Home = lazy(() => import('@/pages/home'));
const Test = lazy(() => import('@/pages/test'));
const SystemLayout = lazy(() => import('@/layouts/system'));
const User = lazy(() => import('@/pages/system/user'));
const ViewUser = lazy(() => import('@/pages/system/user/viewUser'));
// const EditUser = lazy(() => import('@/pages/system/user/editUser'));
const AddUser = lazy(() => import('@/pages/system/user/addUser'));
const Menu = lazy(() => import('@/pages/system/menu'));
const Role = lazy(() => import('@/pages/system/role'));
const Depart = lazy(() => import('@/pages/system/depart'));
const Dict = lazy(() => import('@/pages/system/dict'));
const Demo = lazy(() => import('@/pages/demo'));

// 按钮权限
export const localAuthList = [
  // ---- 用户管理 ----
  {
    key: 'user:view',
    name: '查看用户按钮',
    authKey: 'user:view',
  },
  {
    key: 'user:edit',
    name: '编辑用户',
    authKey: 'user:update',
  },
  // ---- 角色管理 ----
  {
    key: 'role:add',
    name: '添加角色',
    authKey: 'role:update',
  },
  {
    key: 'role:edit',
    name: '编辑角色',
    authKey: 'role:update',
  },
]
// 业务路由
export const pageRoutes = [
  {
    // root路由必须排在第一个
    path: '/',
    key: 'root',
    name: 'root',
    unAuth: true,
    hideInMenu: true,
  },
  {
    path: '/404',
    key: '404',
    name: '404',
    icon: 'UserOutlined',
    hideInMenu: true,
    unAuth: true,
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
    path: '/demo',
    key: 'demo',
    name: 'demo',
    icon: 'VideoCameraOutlined',
    unAuth: true,
    component: Demo,
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
        path: '/system/user/view/:id',
        key: 'systemUserView',
        name: '查看用户',
        icon: 'UserOutlined',
        hideInMenu: true,
        authKey: 'user:view',
        component: ViewUser,
      },
      {
        path: '/system/user/add',
        key: 'systemUserAdd',
        name: '添加用户',
        icon: 'UserOutlined',
        hideInMenu: true,
        authKey: 'user:update',
        component: AddUser,
      },
      // {
      //   path: '/system/user/edit',
      //   key: 'systemUserEdit',
      //   name: '编辑用户',
      //   icon: 'UserOutlined',
      //   hideInMenu: true,
      //   authKey: 'user:update',
      //   component: EditUser,
      // },
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
        name: '菜单管理',
        icon: 'UserOutlined',
        component: Menu,
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
        name: '字典管理',
        icon: 'UserOutlined',
        component: Dict,
      },
    ]
  },
  // {
  //   path: '/nested',
  //   key: 'nested',
  //   name: '一级菜单',
  //   icon: 'UserOutlined',
  //   routes: [
  //     {
  //       path: '/nested/menu-1',
  //       key: 'menu-1',
  //       name: '二级菜单01',
  //       icon: 'UserOutlined',
  //       routes: [
  //         {
  //           path: '/nested/menu-1/menu-1-1',
  //           key: 'menu-1-1',
  //           name: '三级菜单01',
  //           icon: 'UserOutlined',
  //           component: Menu_1_1,
  //         },
  //         {
  //           path: '/nested/menu-1/menu-1-2',
  //           key: 'menu-1-2',
  //           name: '三级菜单02',
  //           icon: 'UserOutlined',
  //           component: Menu_1_2,
  //         }
  //       ]
  //     },
  //     {
  //       path: '/nested/menu-2',
  //       key: 'menu-2',
  //       name: '二级菜单02',
  //       icon: 'UserOutlined',
  //       component: Menu_2,
  //     },
  //   ]
  // },
]

// 静态路由和根路由
export const staticRoutes = [
  {
    path: '/login',
    exact: true,
    key: 'login',
    name: '登录',
    hideInMenu: true,
    component: Login,
  },
  {
    path: '/',
    exact: false,
    key: 'root',
    name: '布局',
    hideInMenu: true,
    component: Layout,
  }
]