import React from 'react'
import Task from './task'
import { AccessTime } from '@mui/icons-material'

const RenderTaskData = (props) => {
    const {taskData,mode='pending'} = props
    const renderTaskDatas = taskData
      .filter(ele => mode==='pending' ?  !ele.completed : ele.completed)
      .map(ele => <Task key={ele.timeStamp} {...ele}/>)
  return (
    renderTaskDatas.length > 0 ?
    <div className='py-3 px-1 space-y-5'>
        {renderTaskDatas}
    </div>
    :
    <div className='text-gray-500 flex flex-col items-center pb-5'>
        <p className='text-[100px]'><AccessTime fontSize='inherit'/></p>
        <p>You have no {mode} tasks right now.</p>
    </div>
  )
}

export default RenderTaskData