import React from 'react';
import { Layout } from 'antd';
import style from './index.module.less';
import BreadcrumbsView from './BreadcrumbsView';
import ThemeMenu from './ThemeMenu'
import HeaderDropdown from './HeaderDropdown';

const GlobalHeader = ({ hasBreadcrumb = true, leftExtraContent = null, rightExtraContent = null, children }) => {

  return (
    <Layout.Header className={style['global-header']}>
      <div className={style["left-content"]}>
        {leftExtraContent}
        {hasBreadcrumb && <BreadcrumbsView />}
      </div>
      <div className={style['middle-content']}>
        {children}
      </div>
      <div className={style['right-content']}>
        {rightExtraContent}
        <div className={style['header-action']}>
          <ThemeMenu />
        </div>
        <div className={style['header-action']}>
          <HeaderDropdown />
        </div>
      </div>
    </Layout.Header>
  )
}

export default GlobalHeader;