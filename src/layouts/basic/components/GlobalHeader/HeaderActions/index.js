import React from 'react';
import HeaderDropdown from './HeaderDropdown';
import ThemeMenu from './ThemeMenu'
import FixedHeader from './FixedHeader'
import './index.less'

const HeaderActions = () => {
  return (
    <>
      <div className='header-action'>
        <FixedHeader />
      </div>
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