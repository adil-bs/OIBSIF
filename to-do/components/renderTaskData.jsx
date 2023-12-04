import React from 'react'
import Task from './task'
import { AccessTime } from '@mui/icons-material'

const RenderTaskData = (props) => {
    const {taskData,status,className} = props
    const renderTaskDatas = taskData
      .filter(ele => status==='pending' ?  !ele.completed : ele.completed)
      .map(ele => <Task key={ele.timeStamp} {...ele}/>)
  return (
    renderTaskDatas.length > 0 ?
    <div className={'py-3 space-y-5 '+className}>
        {renderTaskDatas}
    </div>
    :
    <div className={'text-gray-500 flex flex-col items-center pb-5 '+className}>
        <p className='text-[100px]'><AccessTime fontSize='inherit'/></p>
        <p>You have no {status} tasks right now.</p>
    </div>
  )
}

export default RenderTaskData