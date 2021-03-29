import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Tabs, Dropdown, Button } from 'antd';
// import useTabModel from './model';
import { withModel, toJS } from '@/store'
import { CloseOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;


const TabRoute = ({ userModel, tabModel }) => {

  const location = useLocation();
  const history = useHistory();
  const contextMenuRef = useRef();
  const [matchs, setMatchs] = useState([]);
  const { matchRoutes, indexRoute } = userModel;
  const { tabList, activeTab, initTabList, addTab, updateTabItem, closeTab, closeOther, closeAll, setTabStore } = tabModel;

  useEffect(() => {
    initTabList()
  }, [])

  useEffect(() => {
    setMatchs(toJS(matchRoutes))
  }, [matchRoutes])

  // 监听地址栏变化
  useEffect(() => {
    if (!matchs.length) {
      return
    }
    const { icon, key, name } = matchs[matchs.length - 1];
    const tabItem = {
      icon,
      key,
      name: name + (location?.state?.pageTitle || ''),
      // name: location?.state?.pageTitle || name,
      pathname: location.pathname,
      location
    }
    addTab(tabItem)
    setTabStore({ activeTab: tabItem })
  }, [matchs])

  const onTabClose = useCallback((e, tabItem) => {
    e.stopPropagation();
    e.preventDefault();
    closeTab(tabItem);
  }, [tabList, activeTab.pathname]);

  const onContextMenu = (e, item) => {
    e.preventDefault();
    contextMenuRef.current = item;
  }
  const onRefresh = (e) => {
    // TODO: 刷新数据
    e.stopPropagation();
    const item = contextMenuRef.current;
    contextMenuRef.current = null;
    updateTabItem(item)
    const location = {
      ...item.location,
      key: item.location.key + 1
    }
    history.replace(location)
  }

  const onClose = () => {
    const item = contextMenuRef.current;
    contextMenuRef.current = null;
    closeTab(item)
  }

  const onCloseOther = () => {
    const item = contextMenuRef.current;
    contextMenuRef.current = null;
    closeOther(item)
  }
  
  return (
    <Tabs activeKey={activeTab.pathname} className="app-tab-list">
      {tabList.map((v) => {
        const isHomePage = v.key === indexRoute.key;
        const closeAble = tabList.length > 1;
        return (
          <TabPane
            key={v.pathname}
            tab={
              <Dropdown
                overlay={
                  <div className="tab-context-menu">
                    {/* <Button type="link" block className="context-item" disabled={activeTab.pathname !== v.pathname} onClick={onRefresh}>刷新</Button> */}
                    <Button type="link" block className="context-item" disabled={isHomePage || !closeAble} onClick={onClose}>关闭</Button>
                    <Button type="link" className="context-item" disabled={!closeAble} onClick={onCloseOther}>关闭其他</Button>
                    <Button type="link" className="context-item" disabled={isHomePage || !closeAble} onClick={closeAll}>关闭所有</Button>
                  </div>
                }
                placement="bottomLeft"
                trigger={['contextMenu']}
              >
                <Link to={v.location} onContextMenu={(e) => onContextMenu(e, v)}>
                  <div className="app-tab-item" >
                    <span>{v.name}</span>
                    {tabList.length > 1 && !isHomePage && (
                      <CloseOutlined onClick={(e) => onTabClose(e, v)} />
                    )}
                  </div>
                </Link>
              </Dropdown>
            }
          ></TabPane>
        )
      })}
    </Tabs >
  );
};

export default withModel(TabRoute, 'userModel', 'tabModel');

