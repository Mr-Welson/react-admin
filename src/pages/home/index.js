import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, DatePicker } from 'antd';

const Home = (props) => {

  console.log('=== Home ===', props);

  return (
    <div className='home-container'>
      首页
      <Button>
        <Link to="/about"> 关于 </Link>
      </Button>
      <Button>
        <Link to="/post/frontEnd"> 文章列表 </Link>
      </Button>
      <DatePicker />
      <br />
      <br />
      <img src="static/avatar.jpg"></img>
    </div>
  );
};

@withRouter
class HomeClass extends React.Component {
  render() {
    console.log(this.props);

    return '首页'
  }
}

export default HomeClass;
