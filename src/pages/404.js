import React, { useCallback } from 'react';
import { Result, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { withModel } from '@/store/withModel';

const Page404 = ({ tabModel }) => {

  const history = useHistory();
  const linkToIndex = useCallback(() => {
    tabModel.closeTab()
    history.replace('/')
  }, [])

  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，你访问的页面不存在"
      extra={
        <Link to="/" replace>
          <Button type="primary" onClick={linkToIndex}>返回首页</Button>
        </Link>
      }
    />
  );
}

export default withModel(Page404, 'tabModel')
