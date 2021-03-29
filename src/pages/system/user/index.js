import React from 'react';
import { Link } from 'react-router-dom'

const SystemUser = () => {
  return (
    <div>
      <h2>用户管理</h2>
      <Link to='/system/user/add'>
        添加用户
      </Link>
      <br />
      <br />
      <Link to='/system/user/view/1'>
        查看用户1
      </Link>
      <br />
      <br />
      <Link to='/system/user/view/2'>
        查看用户2
      </Link>
    </div>
  )
}

export default SystemUser;