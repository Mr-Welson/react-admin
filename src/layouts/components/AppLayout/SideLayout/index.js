import React, { useMemo } from 'react';
import { Layout } from 'antd';
import GlobalHeader from '@/layouts/components/GlobalHeader';
import { WebAppMenu } from '@/layouts/components/SiderMenu';
import SiderTrigger from '@/layouts/components/SiderTrigger';
import AppContent from '../AppContent';
import BreadcrumbsView from '../../BreadcrumbsView';

// 左右布局： 侧边通栏导航 + 右边内容区布局
const SideLayout = ({ collapsedWidth, siderWidth, collapsed, setCollapsed, MemoPageRouter }) => {
  const sideWidth = useMemo(() => (collapsed ? collapsedWidth : siderWidth), [collapsed]);
  const headerWidth = useMemo(() => `calc(100% - ${sideWidth}px)`, [sideWidth]);

  return (
    <Layout className='app-layout app-side-layout'>
      <WebAppMenu collapsedWidth={collapsedWidth} siderWidth={siderWidth} collapsed={collapsed} />
      <Layout className='app-side-layout-content' style={{ paddingLeft: sideWidth }}>
        <GlobalHeader headerWidth={headerWidth} leftExtraContent={<SiderTrigger collapsed={collapsed} setCollapsed={setCollapsed} />}>
          <BreadcrumbsView></BreadcrumbsView>
        </GlobalHeader>
        <AppContent>{MemoPageRouter}</AppContent>
      </Layout>
    </Layout>
  );
};

export default SideLayout;
