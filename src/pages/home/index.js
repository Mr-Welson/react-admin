import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, DatePicker } from 'antd';


const Home = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  return (
    <div className='home-container'>
      首页
      <h2>
        {loading ? '加载中...' : '加载完成！'}
      </h2>
      <Button onClick={() => setLoading(loading => !loading)}>
        loading
      </Button>
      <Button>
        <Link to="/about"> 无效路由 </Link>
      </Button>
      <DatePicker />
      <br />
      <br />
      <img src="assets/avatar.jpg"></img>
    </div>
  );
};

export default Home;
