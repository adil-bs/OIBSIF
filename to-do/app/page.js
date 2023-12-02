'use client'
import ManageTask from "@/components/managetask";
import RenderTaskData from "@/components/renderTaskData";
import {  Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { createContext, useReducer, useState } from "react";

export const TaskDataContext = createContext()

function reduceTaskData (state, action) {
  switch (action.type) {
    case 'add' :
      if (action.data.deadlineTime && !action.data.deadlineDate) {
        action.data.deadlineDate = new Date().toLocaleDateString('en-CA')
      }
      return [{
        ...action.data,
        timeStamp:new Date(),
        completed:false,
      },...state] 

    case 'edit':
      return state.map(task => task.timeStamp === action.data.timeStamp ? action.data : task)

    case 'delete':
      return state.filter(task => task.timeStamp !== action.timeStamp)

    case 'completed':
      return state.map(task => ({
        ...task,
        completed:task.timeStamp===action.timeStamp  
      }))
  }
}
const initial = [
  // {title: 'dcdcdcdhdhdhdhdhhdhdhdh', desc: 'dcdcdcdhdhhdhd hhdhdhdhdcdcdcdhdhdhdhdhhdhdhdhdcdcdcdhdhdhd hdhhdhdhdhdcdcdcdhdhdhdhdhhdhdhdhdcdcdcdhdhdhdhdhhdhdhdhdcd cdcdhdhddhdhdhhdhdhd hdcdcdcdhdhdhdhdhhdhdhdhdcdc…dhdc dcdcdhdhdhdhdhhdh dhdhdcdcdcdhdhdhdhdhhdhdh dhd', deadlineDate: '2023-12-13', deadlineTime: '08:23', timeStamp:new Date(),completed:true},
  // {title: 'Match day for real mfs', desc: '', deadlineDate: '2023-12-01', deadlineTime: '', timeStamp:new Date(),completed:false},
  // {title: 'we are venom', desc: 'dcdcdcdhdhhdhdhhdhdhdhdc dcdcdhdhdhdhdhhdhdhdhdcdcdcdhdhdhdhdhhdhdhdhdcdcdcdh dhdhdhdhhdhdhdhdcdcdcdhdhdhdhdhhdhdhdhdcdcdcdhdhddh dhdhhdhdhdhdcdcdcdhdhd hdhdhhdhdhdhdcdc…dhdcdcdcdhdhdh dhdhhdhdhdhdcdcdcdh dhdhdhdhhdhdhdhd', deadlineDate: '', deadlineTime: '', timeStamp:new Date(),completed:false},
  // {title: 'he is spiderman', desc: '', deadlineDate: '', deadlineTime: '08:23', timeStamp:new Date(),completed:false},
  // {title: 'i am batman', desc: 'dcdcdcdhdhhdhdhhdhdhdhdcd cdcdhdhdhdhdhhdhdhdhdcdcdcdhdhdhdhdhhdhdhdhdcdcdcdhdhd hdhdhhdhdhdhdcdcdcdhdhdhdhdhhdhdhdhdcdcdcdhdhddh dhdhhdhdhdhdcdcdcdhdhdhd hdhhdhdhdhdcdc…dhdcdcdcdhdhdh dhdhhdhdhdhdcdcdcdhdh dhdhdhhdhdhdhd', deadlineDate: '2023-12-13', deadlineTime: '', timeStamp:new Date(),completed:true},
]
export default function Home() {
  const [taskData, dispatchTaskData] = useReducer(reduceTaskData, initial)
  const [openManageTask,setOpenManageTask] = useState({open:false,mode:'add',originalData:{}})
  
  const handleOpenManageTask = (mode, originalData={}) =>{
    setOpenManageTask(prev =>({
      open:!prev.open, 
      mode:mode==='close' ? prev.mode : mode,
      originalData,
    }))
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-radial from-green-100 via-pink-100 to-red-100'>
    <TaskDataContext.Provider value={{dispatchTaskData,handleOpenManageTask}}>
      
      <p className="text-5xl font-semibold text-transparent bg-gradient-to-br from-green-800 via-emerald-500 to-teal-200 p-4 bg-clip-text ">To Do</p>

      <Button endIcon={<Add/>} onClick={() => handleOpenManageTask('add')}>Add new Task</Button>

      <div className="border-green-300 border-2 w-[95%]  mx-10 my-5 rounded-t-xl">
        <p className="p-2 pl-8 text-2xl font-medium text-white bg-gradient-to-br from-green-800 via-emerald-500 to-teal-200 rounded-t-xl">Pending</p>

        <RenderTaskData taskData={taskData} />
      </div>
      <ManageTask {...openManageTask} onClose={()=>handleOpenManageTask('close')} />

    </TaskDataContext.Provider>
    </div>
  )
}
