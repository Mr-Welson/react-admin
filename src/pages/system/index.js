import React from 'react';

const SystemContainer = ({ children }) => {
  return (
    <div>
      <h2>this is system container</h2>
      <div style={{ padding: '40px' }}>{children}</div>
    </div>
  );
};

export default SystemContainer;
