import React from 'react';
import style from './index.module.less';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const SiderTrigger = ({ collapsed, setCollapsed }) => (
  <span
    className={style["trigger"]}
    onClick={() => setCollapsed(collapsed => !collapsed)}
  >
    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
  </span>
)

export default SiderTrigger