import React from 'react';
import classNames from 'classnames';
import { withModel } from '@/store/withModel'

const LogoAndTitle = ({ collapsed, appModel }) => {

  const { theme } = appModel;

  return (
    <div className={classNames('app-logo', 'app-logo-'.concat(theme))}>
      <img alt='logo' src='/assets/logo.png' />
      {!collapsed && <h1>中台系统</h1>}
    </div>
  )
}

export default withModel(LogoAndTitle, 'appModel');