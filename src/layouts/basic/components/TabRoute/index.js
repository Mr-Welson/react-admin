import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tabs, Dropdown, Button } from 'antd';
import { withModel, toJS } from '@/store/withModel'
import { CloseOutlined } from '@ant-design/icons';
import Utils from '@/utils';

const { TabPane } = Tabs;

const TabRoute = ({ authModel, tabModel }) => {

  const location = useLocation();
  // fix 点击刷新 Dropdown 不隐藏的bug 
  const [refreshKey, setRefreshKey] = useState(1);
  const contextMenuRef = useRef();
  const [matchs, setMatchs] = useState([]);
  const { matchRoutes, indexRoute } = authModel;
  const { tabList, activeTab, initTabList, addTab, closeTab, closeOther, closeAll, updateTabStore } = tabModel;

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
    updateTabStore({ activeTab: tabItem })
  }, [matchs])

  const onTabClose = (e, tabItem) => {
    e.stopPropagation();
    e.preventDefault();
    closeTab(tabItem);
  };

  const onContextMenu = (e, item) => {
    e.preventDefault();
    contextMenuRef.current = item;
  }

  const onRefresh = () => {
    contextMenuRef.current = null;
    setRefreshKey(Utils.uuid())
    updateTabStore({ refreshKey: Utils.uuid() })
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

  const closeAble = useMemo(() => tabList.length > 1, [tabList.length]);

  return (
    <Tabs activeKey={activeTab.pathname} className="app-tab-list">
      {tabList.map((v) => {
        const isHomePage = v.key === indexRoute.key;
        const isErrorPage = v.pathname === '/404'
        return (
          <TabPane
            key={v.pathname}
            tab={
              <Dropdown
                key={refreshKey}
                overlay={
                  <div className="tab-context-menu">
                    <Button type="link" block className="context-item" disabled={activeTab.pathname !== v.pathname || isErrorPage} onClick={onRefresh}>刷新</Button>
                    <Button type="link" block className="context-item" disabled={isHomePage || !closeAble} onClick={onClose}>关闭</Button>
                    <Button type="link" className="context-item" disabled={!closeAble || isErrorPage} onClick={onCloseOther}>关闭其他</Button>
                    <Button type="link" className="context-item" disabled={isHomePage || !closeAble || isErrorPage} onClick={closeAll}>关闭所有</Button>
                  </div>
                }
                placement="bottomLeft"
                trigger={['contextMenu']}
              >
                <Link to={v.location} onContextMenu={(e) => onContextMenu(e, v)} >
                  <div className="app-tab-item" >
                    <span>{v.name}</span>
                    {closeAble && !isHomePage && (
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

export default withModel(TabRoute, 'authModel', 'tabModel');

