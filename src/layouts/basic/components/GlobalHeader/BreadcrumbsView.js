import React from 'react';
import { Link } from 'react-router';
import { Breadcrumb } from 'antd';
import * as AntIcon from '@ant-design/icons';

const indexRoute = {
  name: '首页',
  path: '/home',
  icon: 'HomeOutlined',
  key: 'home'
}

const BreadcrumbsView = () => {

  // const { matchRoutes } = useModel('permission')
  const IndexIcon = AntIcon[indexRoute.icon]

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to={indexRoute.path}><IndexIcon />{indexRoute.name}</Link>
      </Breadcrumb.Item>
      {/* {!!matchRoutes.length && matchRoutes[0].key !== 'home' && matchRoutes.map((v, k) => {
        const linkable = !v.needRedirect && v.path && k !== (matchRoutes.length - 1)
        return (
          <Breadcrumb.Item key={v.key}>
            {linkable ? <Link to={v.path}>{v.name}</Link> : v.name}
          </Breadcrumb.Item>
        )
      })} */}
    </Breadcrumb>
  )
}

export default BreadcrumbsView;