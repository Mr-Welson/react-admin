import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { AlertOutlined, AlertFilled } from '@ant-design/icons';
import { withModel } from '@/store/withModel';


const ThemeMenu = ({ appModel }) => {
  const {
    settings: { theme },
    updateSettings,
  } = appModel;

  return (
    <Button shape='circle' icon={theme === 'dark' ? <AlertOutlined /> : <AlertFilled />} onClick={() => updateSettings({ theme: theme === 'dark' ? 'light' : 'dark' })}></Button>
  );
};

export default withModel(ThemeMenu, 'appModel');
