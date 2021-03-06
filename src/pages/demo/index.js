import React, { useEffect } from 'react';
import Service from '@/service'
import { withModel } from '@/store/withModel'

const Demo = ({ demoModel }) => {

  const { count, updateDemoStore } = demoModel
  useEffect(() => {
    const fetchData = async () => {
      const [result, error] = await Service.demo.fetchData()
      updateDemoStore({count: result})
    }
    fetchData()
  }, [])
  
  return (
    <h2>
      Demo
      <br />
      {count}
    </h2>
  )
}

export default withModel(Demo, 'demoModel');