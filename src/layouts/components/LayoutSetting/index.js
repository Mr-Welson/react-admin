import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { PicCenterOutlined } from '@ant-design/icons';
import { withModel } from '@/store/withModel';

const LayoutSetting = ({ appModel }) => {
  const { updateSettings } = appModel;
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item>
            <div onClick={() => updateSettings({ layout: 'side' })}>侧边菜单</div>
          </Menu.Item>
          <Menu.Item>
            <div onClick={() => updateSettings({ layout: 'top' })}>顶部菜单</div>
          </Menu.Item>
          <Menu.Item>
            <div onClick={() => updateSettings({ layout: 'mix' })}>混合菜单</div>
          </Menu.Item>
        </Menu>
      }
      placement='bottomRight'
    >
      <Button type='default' shape='circle' icon={<PicCenterOutlined />}></Button>
    </Dropdown>
  );
};

export default withModel(LayoutSetting, 'appModel');
