import React from 'react';
import { Link } from 'react-router-dom';
import { withModel, toJS } from '@/store/withModel';
import { Breadcrumb } from 'antd';
import * as AntIcon from '@ant-design/icons';

const BreadcrumbsView = ({ authModel }) => {
  const { matchRoutes, indexRoute } = authModel;
  const IndexIcon = AntIcon[indexRoute.icon];
  const routes = toJS(matchRoutes);
  routes.shift();

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to={indexRoute.path}>
          <IndexIcon style={{ marginRight: '4px' }} />
          {indexRoute.title}
        </Link>
      </Breadcrumb.Item>
      {!!routes.length &&
        routes[0].key !== 'home' &&
        routes.map((v, k) => {
          const linkable = !v.routes && v.path && k !== routes.length - 1;
          return <Breadcrumb.Item key={v.key}>{linkable ? <Link to={v.path}>{v.title}</Link> : v.title}</Breadcrumb.Item>;
        })}
    </Breadcrumb>
  );
};

export default withModel(BreadcrumbsView, 'authModel');
