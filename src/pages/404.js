import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const Page404 = () => {
  // TODO: 返回首页时关闭 404 页签
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，你访问的页面不存在"
      extra={
        <Link to="/" replace>
          <Button type="primary">返回首页</Button>
        </Link>
      }
    />
  );
}

export default Page404
