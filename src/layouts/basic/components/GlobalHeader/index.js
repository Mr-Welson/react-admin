import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import style from './index.module.less';
import BreadcrumbsView from './BreadcrumbsView';
import ThemeMenu from './ThemeMenu'
import AvatarDropdown from './AvatarDropdown';

const GlobalHeader = ({ collapsed, setCollapsed }) => {

  return (
    <Layout.Header className={style['global-header']}>
      <div className={style["left-content"]}>
        <span className={style["trigger"]} onClick={() => setCollapsed(collapsed => !collapsed)}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span>
        <BreadcrumbsView></BreadcrumbsView>
      </div>
      <div className={style['right-content']}>
        <div className={style['header-action']}>
          <ThemeMenu />
        </div>
        <div className={style['header-action']}>
          <AvatarDropdown />
        </div>
      </div>
    </Layout.Header>
  )
}

export default GlobalHeader;