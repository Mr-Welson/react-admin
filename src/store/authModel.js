import { observable, computed, toJS } from 'mobx'
import StoreEnhancer from './StoreEnhancer';
import Utils from '@/utils';
import { pageRoutes, localAuthList } from '@/routes';

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
  // 可访问路由
  @observable routeList = []
  // 可访问按钮
  @observable authList = []
  // 可访问菜单
  @observable menuList = []
  // 当前路径匹配的路由
  @observable matchRoutes = []
  // 控制页面强制刷新
  @observable pageKey = 1


  // 展开后的一维路由
  @computed
  get flatRoutes() {
    let routes = Utils.flattenRoutes(toJS(this.routeList));
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

  // 合成用户菜单
  generateMenuList = (authRouteList) => {
    const menuList = this.filterHiddenRoute(authRouteList);
    // console.log('==menuList==', menuList);
    this._setData({ menuList })
  }

  // 根据权限过滤路由
  updateRouteList = (remoteRouteList) => {
    const flatRemoteRoutes = Utils.flattenRoutes(remoteRouteList, 'children')
    let routeList = [];
    pageRoutes.forEach(v => {
      if (v.unAuth) {
        return routeList.push(v)
      }
      if (process.env.NODE_ENV !== 'production' && v.isLocal) {
        return routeList.push(v)
      }
      let remoteRoute = flatRemoteRoutes.find(x => x.name === v.key);
      if (!remoteRoute) {
        return
      }
      let route = {
        ...v,
        name: remoteRoute.meta.title,
        icon: remoteRoute.meta.icon,
        routes: undefined
      }
      if (v.routes && v.routes.length) {
        route.routes = []
        let subRoute = {}
        v.routes.forEach(sub => {
          let remoteRoute = flatRemoteRoutes.find(x => x.name === sub.key);
          if (remoteRoute) {
            subRoute = {
              ...sub,
              name: remoteRoute.meta.title,
              icon: remoteRoute.meta.icon,
              routes: undefined
            }
            route.routes.push(subRoute)
          }
        })
      }
      routeList.push(route)
    })
    // console.log('==routeList==', routeList);
    this._setData({ routeList })
    return Promise.resolve(routeList)
  }

  // 根据权限过滤路由
  updateAuthList = (remoteAuthList) => {
    const authList = localAuthList.filter(v => remoteAuthList.find(x => v.authKey === x.action))
    this._setData({ authList })
  }

  updateIndexRoute = (indexRoute) => {
    this._setData({ indexRoute })
  }

  updateAuthStore = (object) => {
    this._setData(object)
  }
}

export default new AuthModel()