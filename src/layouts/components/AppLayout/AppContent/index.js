import React from 'react';
import { Layout } from 'antd';
import TabRoute from '@/layouts/components/TabRoute';
import GlobalFooter from '@/layouts/components/GlobalFooter';
import './index.less';

const AppContent = ({ children }) => {
  return (
    <Layout className='app-content-wrapper'>
      <TabRoute />
      <div className='app-content-container'>
        <Layout.Content className='app-content'>{children}</Layout.Content>
        <GlobalFooter />
      </div>
    </Layout>
  );
};

export default AppContent;
