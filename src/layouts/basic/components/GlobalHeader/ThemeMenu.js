import React from 'react';
import { Menu, Dropdown, Button } from 'antd';

const ThemeMenu = ({ dispatch }) => {
  const setTheme = (theme) => {
    dispatch({
      type: 'settings/setTheme',
      payload: { theme }
    })
  }
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item>
            <div onClick={() => setTheme('dark')}>
              暗黑
          </div>
          </Menu.Item>
          <Menu.Item>
            <div onClick={() => setTheme('light')}>
              亮白
          </div>
          </Menu.Item>
        </Menu>
      }
      placement="bottomRight"
    >
      <Button type="primary">主题</Button>
    </Dropdown>

  )
};


export default ThemeMenu;