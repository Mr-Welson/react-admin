import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const ViewUser = () => {
  const location = useLocation()
  console.log(location);
  const params = useParams()
  return (
    <div>
      ViewUser: {params.id}
    </div>
  )
}

export default ViewUser;