import React from 'react';
import { Layout } from 'antd';
import classNames from 'classnames';
import BreadcrumbsView from '../BreadcrumbsView';
import HeaderActions from "./HeaderActions";
import './index.less';

const GlobalHeader = ({ layout, fixedHeader, theme, hasBreadcrumb = true, leftExtraContent = null, rightExtraContent = null, children }) => {

  return (
    <Layout.Header className={classNames("global-header", "global-header-".concat(theme), { "global-header-fixed": fixedHeader })}>
      <div className={classNames({ 'root-header': layout === 'side' }, { 'top-nav-header': layout === 'top' })}>
        <div className="left-content">
          {leftExtraContent}
          {hasBreadcrumb && <BreadcrumbsView />}
        </div>
        <div className='middle-content'>
          {children}
        </div>
        <div className='right-content'>
          {rightExtraContent}
          <HeaderActions />
        </div>
      </div>
    </Layout.Header>
  )
}

export default GlobalHeader;