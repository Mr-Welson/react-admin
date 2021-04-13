import React from 'react';
import ThemeMenu from './ThemeMenu'
import HeaderDropdown from './HeaderDropdown';
import './index.less'

const HeaderActions = () => {
  return (
    <>
      <div className='header-action'>
        <ThemeMenu />
      </div>
      <div className='header-action'>
        <HeaderDropdown />
      </div>
    </>
  )
}

export default HeaderActions;