import { observable, action } from 'mobx'
import { createBrowserHistory, createHashHistory } from "history";
import Utils from '@/utils';
import _ from 'lodash';

const historyType = 'browser';
const history = historyType === 'hash' ? createHashHistory() : createBrowserHistory();

const indexRoute = {
  icon: 'UserOutlined',
  key: 'home',
  name: '首页',
  pathname: '/home',
  location: {
    pathname: '/home',
    query: {},
    search: '',
    state: undefined,
    hash: ''
  }
}


class TabModel {

  @observable tabList = []
  @observable activeTab = {}

  @action
  setTabList = (tabList) => {
    this.tabList = tabList
  }

  @action
  setActiveTab = (activeTab) => {
    this.activeTab = activeTab
  }

  initTabList = () => {
    const list = this.getCacheTabList();
    !list.length && list.unshift({ ...indexRoute })
    console.log('==== list', list);
    this.setTabList(list)
  }

  // 同时更新本地缓存和页面数据
  updateTabList = (list) => {
    console.log('=== updateTabList ===');
    this.setTabList(list)
    this.setCacheTabList(list)
  }

  // 获取导航缓存
  getCacheTabList() {
    return Utils.getCache('zf_tab_list') || []
  }

  // 设置导航缓存
  setCacheTabList(list) {
    Utils.setCache('zf_tab_list', list || [])
  }

  // 点击 Tab
  onTabClick = (tabItem) => {
    if (this.activeTab.pathname !== tabItem.pathname) {
      this.setActiveTab(tabItem)
      history.push(tabItem.location)
    }
  }

  // 新增 Tab 
  addTab = (tabItem) => {
    console.log('== tabList ==', this.tabList);
    const index = this.tabList.findIndex(v => v.pathname === tabItem.pathname);
    if (index === -1) {
      // 新增
      return this.updateTabList([...this.tabList, tabItem])
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
    this.updateTabList(this.tabList);
  }

  // 关闭当前 往前推一个
  closeTab = (tabItem) => {
    if (tabItem.pathname === this.activeTab.pathname) {
      const index = this.tabList.findIndex((v) => v.pathname === tabItem.pathname);
      const newTab = index === 0 ? this.tabList[index + 1] : this.tabList[index - 1];
      history.push(newTab.location.pathname)
    }
    const newTabList = this.tabList.filter((v) => v.pathname !== tabItem.pathname);
    this.updateTabList(newTabList);
  }

  // 关闭其他
  closeOther = (tabItem) => {
    const newTabList = [tabItem];
    if (tabItem.pathname !== this.activeTab.pathname) {
      history.push(tabItem.location.pathname)
    }
    this.updateTabList(newTabList);
  }

  // 关闭所有
  closeAll = () => {
    this.updateTabList([{ ...indexRoute }]);
    history.push('/home')
  }
}

export default new TabModel()