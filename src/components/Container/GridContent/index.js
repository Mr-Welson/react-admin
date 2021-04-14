import React from 'react';
import classNames from 'classnames';
import './index.less';

const GridContent = ({ className, contentWidth, children }) => {

  return (
    <div className={classNames('grid-content', className, { wide: contentWidth === 'center' })}>
      {children}
    </div>
  )
}

export default GridContent;