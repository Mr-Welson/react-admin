import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Button } from 'antd';
import style from './index.module.less';
// import BreadcrumbsView from './BreadcrumbsView';
import ThemeMenu from './ThemeMenu'
import AvatarDropdown from './AvatarDropdown';
import { inject, observer } from 'mobx-react'

const GlobalHeader = ({ collapsed, dispatch, ...rest }) => {

  console.log('===  rest ===', rest.user);
  console.log('===  rest ===', rest.user.isLogin);

  const { isLogin, setIsLogin } = rest.user

  const setCollapsed = (collapsed) => {
    return dispatch({
      type: 'settings/setCollapsed',
      payload: { collapsed },
    })
  }
  return (
    <Layout.Header className={style['global-header']}>
      <div className={style["left-content"]}>
        <span className={style["trigger"]} onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span>
        {/* <BreadcrumbsView></BreadcrumbsView> */}
      </div>
      <div>
        {isLogin ? '登录' : '未登录'}
        <Button onClick={() => rest.user.setIsLogin(!isLogin)}> 切换 </Button>
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

export default inject('user')(observer(GlobalHeader));