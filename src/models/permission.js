import { useState } from 'react';
import { matchPath } from 'react-router-dom';
import _ from 'lodash';
import Utils from '@/utils';

import allRoutes, { pageRoutes } from '../../config/routes'

export default function permissionModel() {
  // 扁平化路由
  const [flatRoutes, setFlatRoutes] = useState([]);
  // 菜单
  const [menuList, setMenuList] = useState([]);
  // 当前匹配的路由
  const [matchRoutes, setMatchRoutes] = useState([])

  // 根据 pathname 匹配路由
  function onPathNameChange(pathname, flatRoutes) {
    const matchRoutes = flatRoutes.filter(v => {
      const matchInfo = matchPath(pathname, {
        path: v.path,
        exact: v.exact,
        strict: v.strict
      });
      return matchInfo
    })
    // console.log('== matchRoutes ==', matchRoutes);
    if (matchRoutes[matchRoutes.length - 1]?.needRedirect) {
      // 当匹配到的路由为重定向路由时，直接跳过
      return
    }
    setMatchRoutes(matchRoutes)
  }

  // 初始化路由数据
  function initRoutes() {
    let flatRoutes = Utils.flattenRoutes(_.cloneDeep(allRoutes));
    flatRoutes = flatRoutes.filter(v => v.key && v.path);
    setFlatRoutes(flatRoutes)
  }

  // 过滤隐藏菜单
  function filterHiddenRoute(routeList) {
    let list = [];
    list = routeList.filter(v => {
      if (v.routes?.length) {
        v.routes = filterHiddenRoute(v.routes);
        return !v.hideInMenu || v.routes.length
      } else {
        return !v.hideInMenu && v.key
      }
    })
    return list
  }

  // TODO: 过滤后台权限
  function filterNoAuthRoute(routes) {
    return routes
  }

  // 生成菜单
  function generateMenuList() {
    // console.log('routes==', pageRoutes);
    const layoutRoutes = pageRoutes;
    const authRoutes = filterNoAuthRoute(layoutRoutes);
    const menuList = filterHiddenRoute(authRoutes);
    setMenuList(menuList)
  }

  return {
    flatRoutes,
    menuList,
    matchRoutes,
    generateMenuList,
    initRoutes,
    onPathNameChange,
  }
} 