import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { withModel } from '@/store/withModel'

const ThemeMenu = ({ appModel }) => {
  const { setAppStore } = appModel

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item>
            <div onClick={() => setAppStore({ theme: 'dark' })}>
              暗黑
          </div>
          </Menu.Item>
          <Menu.Item>
            <div onClick={() => setAppStore({ theme: 'light' })}>
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