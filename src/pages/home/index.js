import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, DatePicker } from 'antd';

const Home = () => {
  const [loading, setLoading] = useState(true);

  const loadingStart = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadingStart();
  }, []);

  return (
    <div className='home-container' style={{ height: '1500px', width: '1000px' }}>
      首页
      <h2>{loading ? '加载中...' : '加载完成！'}</h2>
      <Button onClick={loadingStart}>loading</Button>
      <Button>
        <Link to='/about'> 无效路由 </Link>
      </Button>
      <DatePicker />
      <br />
      <br />
      <img src='assets/avatar.jpg'></img>
    </div>
  );
};

export default Home;
