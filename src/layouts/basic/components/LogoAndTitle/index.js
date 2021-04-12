import React from 'react';
import classNames from 'classnames';
import { withModel } from '@/store/withModel'

const LogoAndTitle = ({ collapsed, theme, userModel }) => {

  const { systemConfig } = userModel;

  return (
    <div className={classNames('app-logo', 'app-logo-'.concat(theme))}>
      <img alt='logo' src={process.env.PUBLIC_URL + '/assets/logo.png'} />
      {!collapsed && <h1>{systemConfig.systemName || '管理系统'}</h1>}
    </div>
  )
}

export const MLogo = () => (
  <div className='m-app-logo'>
    <img alt='logo' src={process.env.PUBLIC_URL + '/assets/logo.png'} />
  </div>
)

export default withModel(LogoAndTitle, 'userModel');