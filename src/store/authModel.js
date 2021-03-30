import { observable, computed } from 'mobx'
import StoreEnhancer from './StoreEnhancer';
import Utils from '@/utils';

class AuthModel extends StoreEnhancer {

  // constructor() {
  //   const cacheList = [
  //     { key: 'token', cacheKey: 'zf_token', type: 'session', default: undefined },
  //     { key: 'userInfo', type: 'session', default: {} },
  //   ];
  //   super(cacheList)
  // }

  // 保存路由的 history 对象
  history = {}
  // 主页路由
  @observable indexRoute = {}
  // 有权限的路由
  @observable routeList = []
  // 可见菜单
  @observable menuList = []
  // 当前路径匹配的路由
  @observable matchRoutes = []

  // 展开后的一维路由
  @computed
  get flatRoutes() {
    let routes = Utils.flattenRoutes(this.routeList.slice());
    // routes = routes.filter(v => v.key && v.path);
    return routes
  }

  // 根据 pathname 匹配路由
  onPathNameChange = (pathname, flatRoutes) => {
    const matchRoutes = Utils.matchPathRoutes(pathname, flatRoutes)
    if (matchRoutes.length === 1 && pathname !== '/') {
      return this.history.replace('/404')
    }
    this._setData({ matchRoutes })
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

  // TODO: 根据权限过滤菜单
  filterNoAuthRoute(routes) {
    return routes
  }

  // 合成用户菜单
  generateMenuList = (pageRoutes) => {
    const authRoutes = this.filterNoAuthRoute(pageRoutes);
    const menuList = this.filterHiddenRoute(authRoutes);
    this._setData({ menuList })
  }

  // TODO: 根据权限过滤路由
  setAuthRoute = (routeList) => {
    this._setData({ routeList })
  }

  setIndexRoute = (indexRoute) => {
    this._setData({ indexRoute })
  }

  setAuthStore = (object) => {
    this._setData(object)
  }
}

export default new AuthModel()