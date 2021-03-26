import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router'
import { Menu, Dropdown, Avatar } from 'antd';
import { withModel } from '@/store';

const MenuHeaderDropdown = ({ userModel }) => {
  const history = useHistory()
  const loginOut = useCallback(() => {
    userModel.setToken(undefined);
    history.replace('/login')
  }, [])
  return (
    <Menu>
      <Menu.Item key="center">
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
        个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={loginOut}>
        <LogoutOutlined />
      退出登录
    </Menu.Item>
    </Menu>
  )
};

const MenuHeaderDropdownWithModel = withModel(MenuHeaderDropdown, 'userModel')

const AvatarDropdown = () => {
  return (
    <Dropdown overlay={<MenuHeaderDropdownWithModel />}>
      <span>
        <Avatar size="small" src={'assets/avatar.jpg'} alt="avatar" />
        <span> 测试 </span>
      </span>
    </Dropdown>
  )
}

export default AvatarDropdown;