import { observable, action, computed, toJS } from 'mobx'
import { matchPath } from 'react-router-dom';
import Utils from '@/utils';

class UserModel {

  @observable routeList = [] // 有权限的路由
  @observable menuList = [] // 可见菜单
  @observable matchRoutes = [] // 当前路径匹配的路由

  // 展开后的路由
  @computed
  get flatRoutes() {
    let routes = Utils.flattenRoutes(toJS(this.routeList));
    // routes = routes.filter(v => v.key && v.path);
    return routes
  }

  // 根据 pathname 匹配路由
  onPathNameChange = (pathname, flatRoutes) => {
    const matchRoutes = flatRoutes.filter(v => {
      const matchInfo = matchPath(pathname, {
        path: v.path,
        exact: v.exact,
        strict: v.strict
      });
      return matchInfo
    })
    console.log('== matchRoutes ==', matchRoutes);
    if (matchRoutes[matchRoutes.length - 1]?.needRedirect) {
      // 当匹配到的路由为重定向路由时，直接跳过
      return
    }
    this.setMatchRoutes(matchRoutes)
  }

  // 过滤隐藏菜单
  filterHiddenRoute = (routeList) => {
    let list = [];
    list = routeList.filter(v => {
      if (v.routes?.length) {
        v.routes = this.filterHiddenRoute(v.routes);
        return !v.hideInMenu || v.routes.length
      } else {
        return !v.hideInMenu && v.key
      }
    })
    return list
  }

  // TODO: 合并本地菜单
  filterNoAuthRoute(routes) {
    return routes
  }

  generateMenuList = (pageRoutes) => {
    const authRoutes = this.filterNoAuthRoute(pageRoutes);
    const menuList = this.filterHiddenRoute(authRoutes);
    this.setMenuList(menuList)
  }

  @action
  setRouteList = (routeList = []) => {
    this.routeList = routeList
  }

  @action
  setMenuList = (menuList = []) => {
    this.menuList = menuList
  }

  @action
  setMatchRoutes = (matchRoutes) => {
    this.matchRoutes = matchRoutes
  }
}

export default new UserModel()