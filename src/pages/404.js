import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const Page404 = () => {
  console.log('=== 404 ===');
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，你访问的页面不存在"
      extra={
        <Link to="/home" replace>
          <Button type="primary">返回首页</Button>
        </Link>
      }
    />
  );
}

export default Page404
