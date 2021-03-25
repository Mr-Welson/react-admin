import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { withModel } from '@/store'

const ThemeMenu = ({ appModel }) => {

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item>
            <div onClick={() => appModel.setTheme('dark')}>
              暗黑
          </div>
          </Menu.Item>
          <Menu.Item>
            <div onClick={() => appModel.setTheme('light')}>
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


export default withModel(ThemeMenu, 'appModel');