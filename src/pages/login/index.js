import React, { useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input, Button, message } from 'antd'
import './login.less'
import Service from '@/service'
import Utils from '@/utils';
import { withModel } from '@/store';


const LoginForm = ({ history, userModel }) => {

  useEffect(() => {
    Utils.setCache('zf_token', undefined, 'session')
  }, [])

  // 触发登录方法
  const onFinish = async (values) => {
    const { username, password } = values
    if (username !== 'admin' && password !== '123456') {
      message.error('用户名或密码错误')
      return
    }
    const [result] = await Service.user.login(values)
    console.log(result);
    Utils.setCache('zf_token', result.token, 'session')
    userModel.setToken(result.token)
    userModel.setUserInfo(result.userInfo)
    history.push('/')
  }

  return (
    <div className="login-layout">
      <div className="logo-box">
        <span className="logo-name">中台系统</span>
      </div>
      <Form className="login-form" name="login-form" onFinish={onFinish}>
        <Form.Item
          name="username"
          initialValue="admin"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="用户名" prefix={<UserOutlined />} size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          initialValue="123456"
          rules={[{ required: true, message: '请输入密码' }]}
          extra="用户名：admin 密码：123456"
        >
          <Input.Password
            placeholder="密码"
            prefix={<LockOutlined />}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="login-form-button"
            htmlType="submit"
            size="large"
            type="primary"
          >
            登录
        </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default withModel(LoginForm, 'userModel')
