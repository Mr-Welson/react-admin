import { observable } from 'mobx'
import _ from 'lodash';
import StoreEnhancer from './StoreEnhancer';
import userModel from './userModel'


// const indexRoute = {
//   icon: 'UserOutlined',
//   key: 'home',
//   name: '首页',
//   pathname: '/home',
//   location: {
//     pathname: '/home',
//     query: {},
//     search: '',
//     state: undefined,
//     hash: ''
//   }
// }

class TabModel extends StoreEnhancer {

  constructor() {
    // 定义需要缓存的数据
    const cacheList = [
      { key: 'tabList', cacheKey: 'zf_tab_list', type: 'local', default: [] },
    ];
    super(cacheList)
  }

  // 保存路由的 history 对象
  history = {}
  @observable tabList = []
  @observable activeTab = {}

  getIndexRoute() {
    return userModel.indexRoute
  }

  initTabList = () => {
    const list = this.tabList.slice();
    const indexRoute = this.getIndexRoute();
    !list.length && list.unshift({ ...indexRoute })
    this._setData({ tabList: list })
  }

  // 点击 Tab
  onTabClick = (tabItem) => {
    if (this.activeTab.pathname !== tabItem.pathname) {
      this._setData({ activeTab: tabItem })
      this.history.push(tabItem.location)
    }
  }

  // 新增 Tab 
  addTab = (tabItem) => {
    const index = this.tabList.findIndex(v => v.pathname === tabItem.pathname);
    if (index === -1) {
      // 新增
      let tabList = [...this.tabList, tabItem]
      const indexRoute = this.getIndexRoute();
      if (tabItem.pathname === indexRoute.pathname) {
        tabList = [tabItem, ...this.tabList]
      }
      return this._setData({ tabList });
    }
    const item = this.tabList[index];
    if (!_.isEqual(item, tabItem)) {
      // 更新
      return this.updateTabItem(tabItem, index)
    }
  }

  // 更新 Tab
  updateTabItem = (tabItem, index) => {
    index = index || this.tabList.findIndex(v => v.pathname === tabItem.pathname);
    this.tabList.splice(index, 1, tabItem)
    this._setData({ tabList: this.tabList });
  }

  // 关闭当前 往前推一个
  closeTab = (tabItem) => {
    if (tabItem.pathname === this.activeTab.pathname) {
      const index = this.tabList.findIndex((v) => v.pathname === tabItem.pathname);
      const newTab = index === 0 ? this.tabList[index + 1] : this.tabList[index - 1];
      this.history.push(newTab.location.pathname)
    }
    const tabList = this.tabList.filter((v) => v.pathname !== tabItem.pathname);
    this._setData({ tabList });

  }

  // 关闭其他
  closeOther = (tabItem) => {
    const tabList = [tabItem];
    const indexRoute = this.getIndexRoute();
    if (tabItem.pathname !== indexRoute.pathname) {
      tabList.unshift({ ...indexRoute })
    }
    if (tabItem.pathname !== this.activeTab.pathname) {
      this.history.push(tabItem.location.pathname)
    }
    this._setData({ tabList });
  }

  // 关闭所有
  closeAll = () => {
    const indexRoute = this.getIndexRoute();
    const tabList = [{ ...indexRoute }]
    this._setData({ tabList });
    this.history.push(indexRoute.pathname)
  }

  setTabStore = (object) => {
    this._setData(object)
  }
}

export default new TabModel()