import React from 'react';
import { Layout } from 'antd';
import GlobalHeader from '@/layouts/components/GlobalHeader';
import LogoAndTitle from '@/layouts/components/LogoAndTitle';
import { WebAppMenu } from '@/layouts/components/SiderMenu';
import AppContent from '../AppContent';
// 顶部导航+内容区布局
const TopLayout = ({ theme, collapsed, collapsedWidth, siderWidth, MemoPageRouter }) => {
  return (
    <Layout className='app-layout app-top-layout'>
      <GlobalHeader leftExtraContent={<LogoAndTitle theme={theme} />}>
        <WebAppMenu />
      </GlobalHeader>
      <AppContent>{MemoPageRouter}</AppContent>
    </Layout>
  );
};

export default TopLayout;
