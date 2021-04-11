import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { withModel } from '@/store/withModel'

const ThemeMenu = ({ appModel }) => {
  const { updateAppStore } = appModel

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item>
            <div onClick={() => updateAppStore({ theme: 'dark' })}>
              暗黑
          </div>
          </Menu.Item>
          <Menu.Item>
            <div onClick={() => updateAppStore({ theme: 'light' })}>
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