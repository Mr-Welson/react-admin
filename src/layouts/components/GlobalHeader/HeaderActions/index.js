import React from 'react';
import HeaderDropdown from './HeaderDropdown';
import ThemeMenu from './ThemeMenu';
import LayoutSetting from '../../LayoutSetting';
import './index.less';

const HeaderActions = () => {
  return (
    <>
      <div className='header-action'>
        <LayoutSetting />
      </div>
      <div className='header-action'>
        <ThemeMenu />
      </div>
      <div className='header-action'>
        <HeaderDropdown />
      </div>
    </>
  );
};

export default HeaderActions;
