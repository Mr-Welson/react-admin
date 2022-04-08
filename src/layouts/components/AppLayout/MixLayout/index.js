import React from 'react';
import { Layout } from 'antd';
import GlobalHeader from '@/layouts/components/GlobalHeader';
import { WebAppMenu } from '@/layouts/components/SiderMenu';
import LogoAndTitle from '@/layouts/components/LogoAndTitle';
import AppContent from '../AppContent';
import BreadcrumbsView from '../../BreadcrumbsView';
import SiderTrigger from '@/layouts/components/SiderTrigger';

// 顶部通栏 + 侧边栏导航布局
const MixLayout = ({ theme, collapsedWidth, siderWidth, collapsed, setCollapsed, MemoPageRouter }) => {
  return (
    <Layout className='app-layout app-mix-layout'>
      <GlobalHeader
        leftExtraContent={
          <>
            <LogoAndTitle theme={theme} />
            <SiderTrigger collapsed={collapsed} setCollapsed={setCollapsed} />
          </>
        }
      >
        <BreadcrumbsView></BreadcrumbsView>
      </GlobalHeader>
      <Layout className='app-mix-layout-content'>
        <WebAppMenu collapsedWidth={collapsedWidth} siderWidth={siderWidth} collapsed={collapsed} hasLogo={false} />
        <AppContent>{MemoPageRouter}</AppContent>
      </Layout>
    </Layout>
  );
};

export default MixLayout;
