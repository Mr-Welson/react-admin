import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'antd';


const FrontEnd = (props) => {
  const history = useHistory()
  const linkToDetail = (pathname, pageTitle) => {
    history.push({
      pathname,
      state: { pageTitle }
    })
  }
  return (
    <div>
      <h2> menu-1-1 </h2>
      <Button onClick={() => linkToDetail("/nested/menu-1/menu-1-2", '1')
      }> menu-1-2 </Button>
      <Button onClick={() => linkToDetail("/nested/menu-1/menu-1-1/2", '2')
      }> menu-1-1/2 </Button>
      <Link to="/"> 首页 </Link>
    </div>
  )
}

export default FrontEnd;