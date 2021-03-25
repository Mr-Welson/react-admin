import React from 'react';
import style from './index.module.less';

const LogoView = ({ collapsed }) => {

  return (
    <div className={style.logo}>
      <img alt='logo' src='assets/logo.png' />
      {!collapsed && <h1>中台系统</h1>}
    </div>
  )
}

export default LogoView;