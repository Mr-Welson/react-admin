import { observable, computed, toJS } from 'mobx'
import { matchPath } from 'react-router-dom';
import StoreEnhancer from './StoreEnhancer';
import Utils from '@/utils';

class UserModel extends StoreEnhancer {

  constructor() {
    // 定义需要缓存的数据
    const cacheList = [
      { key: 'token', type: 'session', default: undefined },
      { key: 'userInfo', type: 'session', default: {} },
    ];
    super(cacheList)
  }

  // 保存路由的 history 对象
  history = {}
  @observable token = false
  @observable userInfo = {}
  // 主页路由
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
    this.setData({ matchRoutes })
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
    this.setData({ menuList })
  }

  setUserStore = (object) => {
    this.setData(object)
  }
}

export default new UserModel()