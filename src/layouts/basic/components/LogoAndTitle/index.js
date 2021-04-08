import React from 'react';
import classNames from 'classnames';
import style from './index.module.less';
import { withModel } from '@/store/withModel'

const LogoAndTitle = ({ collapsed, appModel }) => {

  const { theme } = appModel;

  return (
    <div className={style.logo}>
      <img alt='logo' src='/assets/logo.png' />
      {!collapsed && <h1>中台系统</h1>}
    </div>
  )
}

export default withModel(LogoAndTitle, 'appModel');