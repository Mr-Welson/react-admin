import React from 'react';
import { Layout } from 'antd';
import GlobalHeader from '@/layouts/components/GlobalHeader';
import LayoutSetting from '@/layouts/components/LayoutSetting';
import { MobileAppMenu } from '@/layouts/components/SiderMenu';
import { MLogo } from '@/layouts/components/LogoAndTitle';
import SiderTrigger from '@/layouts/components/SiderTrigger';
import AppContent from '../AppContent';

// 移动端布局: 顶部通栏, 侧边弹出式导航
/**
 * 移动端布局说明：
 * 1. 顶部导航栏不生效
 * 2. 自动屏蔽面包屑和多页签
 * 3. Header 自动添加小Logo 和 SiderTrigger
 */
const MobileLayout = ({ setCollapsed, collapsedWidth, collapsed, siderWidth, MemoPageRouter, headerWidth }) => {
  return (
    <Layout className='app-layout app-mobile-layout'>
      <MobileAppMenu isMobile collapsedWidth={collapsedWidth} siderWidth={siderWidth} collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout className='app-mobile-layout-content'>
        <GlobalHeader
          leftExtraContent={
            <>
              <MLogo />
              <SiderTrigger collapsed={collapsed} setCollapsed={setCollapsed} />
            </>
          }
        />
        <AppContent>{MemoPageRouter}</AppContent>
      </Layout>
    </Layout>
  );
};

export default MobileLayout;
