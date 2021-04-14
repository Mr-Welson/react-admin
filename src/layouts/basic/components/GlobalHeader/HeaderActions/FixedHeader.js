import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { withModel } from '@/store/withModel'

const FixedHeader = ({ appModel }) => {
  const { updateSetting } = appModel

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item>
            <div onClick={() => updateSetting({ fixedHeader: true })}>
              固定
          </div>
          </Menu.Item>
          <Menu.Item>
            <div onClick={() => updateSetting({ fixedHeader: false })}>
              不固定
          </div>
          </Menu.Item>
        </Menu>
      }
      placement="bottomRight"
    >
      <Button type="primary">Header</Button>
    </Dropdown>

  )
};


export default withModel(FixedHeader, 'appModel');