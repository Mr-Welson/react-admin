import React from 'react';
import { Link } from 'react-router-dom';
import { Button, DatePicker } from 'antd';

const Home = () => {
  return (
    <div className='home-container'>
      首页
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
