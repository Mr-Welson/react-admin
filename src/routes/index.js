/* eslint-disable camelcase */
/**
 * @description 路由配置项
 * @param {String} path 前端路由访问地址
 * @param {?Boolean} exact true 是否严格匹配
 * @param {?ReactComponentElement} component 前端路由对应的组件路径
 * @param {?Array} routes 配置子路由
 * @param {String} title 路由标题
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
import Layout from '@/layouts';
import Login from '@/pages/login';
const P404 = lazy(() => import('@/pages/404'));
const Home = lazy(() => import('@/pages/home'));
// const SystemLayout = lazy(() => import('@/pages/system'));
// const User = lazy(() => import('@/pages/system/user'));
// const ViewUser = lazy(() => import('@/pages/system/user/viewUser'));
// const EditUser = lazy(() => import('@/pages/system/user/editUser'));
// const AddUser = lazy(() => import('@/pages/system/user/addUser'));
const TableList = lazy(() => import('@/pages/list/table'));
const CardList = lazy(() => import('@/pages/list/card'));
const GroupForm = lazy(() => import('@/pages/form/group'));
const StepForm = lazy(() => import('@/pages/form/step'));
const BasicProfile = lazy(() => import('@/pages/profile/basic'));

// 按钮权限
export const localAuthList = [
  // ---- 用户管理 ----
  {
    key: 'user:view',
    title: '查看用户按钮',
    authKey: 'user:view',
  },
  {
    key: 'user:edit',
    title: '编辑用户',
    authKey: 'user:update',
  },
  // ---- 角色管理 ----
  {
    key: 'role:add',
    title: '添加角色',
    authKey: 'role:update',
  },
  {
    key: 'role:edit',
    title: '编辑角色',
    authKey: 'role:update',
  },
];
// 业务路由
export const pageRoutes = [
  {
    // root路由必须排在第一个
    path: '/',
    key: 'root',
    title: 'root',
    unAuth: true,
    hideInMenu: true,
  },
  {
    path: '/404',
    key: '404',
    title: '404',
    icon: 'UserOutlined',
    hideInMenu: true,
    unAuth: true,
    component: P404,
  },
  {
    path: '/home',
    key: 'home',
    title: '首页',
    icon: 'HomeOutlined',
    component: Home,
  },
  {
    path: '/list',
    key: 'list',
    title: '列表页',
    icon: 'BarsOutlined',
    routes: [
      {
        path: '/list/table',
        key: 'tableList',
        title: '查询表格',
        component: TableList,
      },
      {
        path: '/list/card',
        key: 'cardList',
        title: '卡片列表',
        component: CardList,
      },
    ],
  },
  {
    path: '/form',
    key: 'form',
    title: '表单页',
    icon: 'FormOutlined',
    routes: [
      {
        path: '/form/group',
        key: 'groupForm',
        title: '分组表单',
        component: GroupForm,
      },
      {
        path: '/form/step',
        key: 'stepForm',
        title: '分步表单',
        component: StepForm,
      },
    ],
  },
  {
    path: '/profile',
    key: 'profile',
    title: '详情页',
    icon: 'ProfileOutlined',
    routes: [
      {
        path: '/profile/basic',
        key: 'basicProfile',
        title: '基础详情页',
        component: BasicProfile,
      },
    ],
  },
  // {
  //   path: '/system',
  //   key: 'system',
  //   title: '系统管理',
  //   icon: 'UserOutlined',
  //   component: SystemLayout,
  //   routes: [
  //     {
  //       path: '/system/user',
  //       key: 'systemUser',
  //       title: '用户管理',
  //       icon: 'UserOutlined',
  //       component: User,
  //     },
  //     {
  //       path: '/system/user/view/:id',
  //       key: 'systemUserView',
  //       title: '查看用户',
  //       icon: 'UserOutlined',
  //       hideInMenu: true,
  //       authKey: 'user:view',
  //       component: ViewUser,
  //     },
  //     {
  //       path: '/system/user/add',
  //       key: 'systemUserAdd',
  //       title: '添加用户',
  //       icon: 'UserOutlined',
  //       hideInMenu: true,
  //       authKey: 'user:update',
  //       component: AddUser,
  //     },
  //   ],
  // },
];

// 静态路由和根路由
export const staticRoutes = [
  {
    path: '/login',
    exact: true,
    key: 'login',
    title: '登录',
    hideInMenu: true,
    component: Login,
  },
  {
    path: '/',
    exact: false,
    key: 'root',
    title: '布局',
    hideInMenu: true,
    component: Layout,
  },
];
