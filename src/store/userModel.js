import { observable, action, computed, toJS, autorun } from 'mobx'
import { matchPath } from 'react-router-dom';
import Utils from '@/utils';

class UserModel {

  // 保存路由的 history 对象
  history = {}


  @observable token = false
  @observable userInfo = {}
  // 跟路由
  @observable indexRoute = {}
  // 有权限的路由
  @observable routeList = []
  // 可见菜单
  @observable menuList = []
  // 当前路径匹配的路由
  @observable matchRoutes = []

  // 展开后的路由
  @computed
  get flatRoutes() {
    let routes = Utils.flattenRoutes(toJS(this.routeList));
    // routes = routes.filter(v => v.key && v.path);
    return routes
  }

  setHistory = (history) => {
    this.history = history
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
    if (matchRoutes.length === 1 && pathname !== '/') {
      return this.history.replace('/404')
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
  setIndexRoute = (indexRoute = {}) => {
    this.indexRoute = indexRoute
  }

  @action
  setMenuList = (menuList = []) => {
    this.menuList = menuList
  }

  @action
  setMatchRoutes = (matchRoutes) => {
    this.matchRoutes = matchRoutes
  }
  @action
  setToken = (token) => {
    this.token = token;
    Utils.setCache('token', token, 'session')
  }

  @action
  setUserInfo = (userInfo) => {
    this.userInfo = userInfo
  }

  constructor() {
    autorun(() => {
      const token = Utils.getCache('token', 'session')
      const userInfo = Utils.getCache('userInfo', 'session') || {}
      this.setToken(token)
      this.setUserInfo(userInfo)
    })
  }
}

export default new UserModel()