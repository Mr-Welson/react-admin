import React from 'react';
import classNames from 'classnames';
import { Layout } from 'antd';
import { withModel } from '@/store/withModel';
// import LogoAndTitle from '@/layouts/components/LogoAndTitle';
import HeaderActions from './HeaderActions';
import './index.less';

const GlobalHeader = ({ appModel, leftExtraContent = null, rightExtraContent = null, headerWidth = '100%', children }) => {
  const { settings } = appModel;
  const { layout, fixedHeader = true } = settings;

  return (
    <>
      {fixedHeader && <div className='global-header-shadow' />}
      <Layout.Header className={classNames('global-header-wrapper', { 'global-header-wrapper-fixed': fixedHeader })} style={{ width: headerWidth }}>
        <div className={classNames('global-header', { 'side-nav-header': layout !== 'top' }, { 'top-nav-header': layout === 'top' })}>
          <div className='left-content'>
            {/* <LogoAndTitle></LogoAndTitle> */}
            {leftExtraContent}
          </div>
          <div className='middle-content'>{children}</div>
          <div className='right-content'>
            {rightExtraContent}
            <HeaderActions />
          </div>
        </div>
      </Layout.Header>
    </>
  );
};

export default withModel(GlobalHeader, 'appModel');
