import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { withModel } from '@/store/withModel'

const EditUser = ({ tabModel }) => {
  const history = useHistory();

  const onSubmit = () => {
    tabModel.closeTab()
    history.push('/system/user')
  }

  return (
    <div>
      EditUser
      <Button onClick={onSubmit}>确定</Button>
    </div>
  )
}

export default withModel(EditUser, 'tabModel');