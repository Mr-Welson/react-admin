import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { withModel, toJS } from '@/store/withModel'

const LayoutSetting = ({ appModel }) => {
  const { setAppStore } = appModel
  const settings = toJS(appModel.settings)
  return (
    <div className={'header-action'}>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item>
              <div onClick={() => setAppStore({ settings: { ...settings, layout: 'side' } })}>
                侧边菜单
          </div>
            </Menu.Item>
            <Menu.Item>
              <div onClick={() => setAppStore({ settings: { ...settings, layout: 'top' } })}>
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