import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { withModel } from '@/store/withModel'

const LayoutSetting = ({ appModel }) => {
  const { updateSetting } = appModel
  return (
    <div className={'header-action'}>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item>
              <div onClick={() => updateSetting({ layout: 'side' })}>
                侧边菜单
          </div>
            </Menu.Item>
            <Menu.Item>
              <div onClick={() => updateSetting({ layout: 'top' })}>
                顶部菜单
          </div>
            </Menu.Item>
          </Menu>
        }
        placement="bottomRight"
      >
        <Button>导航模式</Button>
      </Dropdown>
    </div >

  )
};


export default withModel(LayoutSetting, 'appModel');