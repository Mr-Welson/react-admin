import { useState } from "react"
import { useHistory } from 'react-router-dom';
import Utils from '@/utils'
import _ from 'lodash';

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

const useTabModel = (indexRoute) => {

  const history = useHistory();
  const [tabList, setTabList] = useState([]);
  const [activeTab, setActiveTab] = useState({});

  // 页签初始化
  function initTabList() {
    const list = getCacheTabList();
    !list.length && list.unshift({ ...indexRoute })
    setTabList(list)
  }

  // 同时更新本地缓存和页面数据
  function updateTabList(list) {
    setTabList(list)
    setCacheTabList(list)
  }

  // 获取导航缓存
  function getCacheTabList() {
    return Utils.getCache('zf_tab_list') || []
  }

  // 设置导航缓存
  function setCacheTabList(list) {
    Utils.setCache('zf_tab_list', list || [])
  }

  // 点击 Tab
  function onTabClick(tabItem) {
    if (activeTab.pathname !== tabItem.pathname) {
      setActiveTab(tabItem)
      history.push(tabItem.location)
    }
  }

  // 新增 Tab 
  function addTab(tabItem) {
    const index = tabList.findIndex(v => v.pathname === tabItem.pathname);
    if (index === -1) {
      // 新增
      if (tabItem.pathname === indexRoute.pathname) {
        return updateTabList([tabItem, ...tabList])
      }
      return updateTabList([...tabList, tabItem])
    }
    const item = tabList[index];
    if (!_.isEqual(item, tabItem)) {
      // 更新
      return updateTabItem(tabItem, index)
    }
  }

  // 更新 Tab
  function updateTabItem(tabItem, index) {
    index = index || tabList.findIndex(v => v.pathname === tabItem.pathname);
    tabList.splice(index, 1, tabItem)
    updateTabList(tabList);
  }

  // 关闭当前 往前推一个
  function closeTab(tabItem) {
    if (tabItem.pathname === activeTab.pathname) {
      const index = tabList.findIndex((v) => v.pathname === tabItem.pathname);
      const newTab = index === 0 ? tabList[index + 1] : tabList[index - 1];
      history.push(newTab.location.pathname)
    }
    const newTabList = tabList.filter((v) => v.pathname !== tabItem.pathname);
    updateTabList(newTabList);
  }

  // 关闭其他
  function closeOther(tabItem) {
    const newTabList = [tabItem];
    if (tabItem.pathname !== indexRoute.pathname) {
      newTabList.unshift({ ...indexRoute })
    }
    if (tabItem.pathname !== activeTab.pathname) {
      history.push(tabItem.location.pathname)
    }
    updateTabList(newTabList);
  }

  // 关闭所有
  function closeAll() {
    updateTabList([{ ...indexRoute }]);
    history.push(indexRoute.pathname)
  }

  return {
    tabList,
    addTab,
    activeTab,
    setActiveTab,
    initTabList,
    onTabClick,
    updateTabItem,
    closeTab,
    closeOther,
    closeAll
  }
}

export default useTabModel