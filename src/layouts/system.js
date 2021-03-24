import React from 'react';

const NestedLayout = (props) => {
  return (
    <div style={{ width: '100%', height: '100%', background: '#f7f7f7' }}>
      <h2> System Header </h2>
      <div>
        {props.children}
      </div>
    </div>
  );
};
export default NestedLayout
