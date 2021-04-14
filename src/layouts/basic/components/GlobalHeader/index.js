import React from 'react';
import classNames from 'classnames';
import { Layout } from 'antd';
import { withModel } from '@/store/withModel'
import BreadcrumbsView from '../BreadcrumbsView';
import HeaderActions from "./HeaderActions";
import './index.less';

const GlobalHeader = ({ appModel, hasBreadcrumb = true, leftExtraContent = null, rightExtraContent = null, headerWidth, children }) => {

  const { theme, settings } = appModel;
  const { layout, fixedHeader } = settings;

  return (
    <>
      {fixedHeader && <Layout.Header className="global-header-shadow" />}
      <Layout.Header
        className={classNames("global-header", "global-header-".concat(theme), { "global-header-fixed": fixedHeader })}
        style={{ width: headerWidth }}
      >
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
    </>
  )
}

export default withModel(GlobalHeader, 'appModel');