import React from 'react';
import { Link } from 'react-router-dom';
import { withModel, toJS } from '@/store'
import { Breadcrumb } from 'antd';
import * as AntIcon from '@ant-design/icons';


const BreadcrumbsView = ({ userModel }) => {

  const { matchRoutes, indexRoute } = userModel;
  const IndexIcon = AntIcon[indexRoute.icon];
  const routes = toJS(matchRoutes);
  routes.shift()

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to={indexRoute.path}><IndexIcon />{indexRoute.name}</Link>
      </Breadcrumb.Item>
      {!!routes.length && routes[0].key !== 'home' && routes.map((v, k) => {
        const linkable = !v.routes && v.path && k !== (routes.length - 1)
        return (
          <Breadcrumb.Item key={v.key}>
            {linkable ? <Link to={v.path}>{v.name}</Link> : v.name}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

export default withModel(BreadcrumbsView, 'userModel');