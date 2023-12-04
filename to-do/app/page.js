'use client'
import ManageTask from "@/components/managetask";
import RenderTaskData from "@/components/renderTaskData";
import {  Add } from "@mui/icons-material";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { createContext, useReducer, useRef, useState } from "react";

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

    case 'toggleComplete':
      return state.map(task => ({
        ...task,
        completed:task.timeStamp===action.timeStamp ? !task.completed : task.completed  
      }))
  }
}
const initial = [
  {title: 'dcdcdcdhdhdhdhdhhdhdhdh', desc: 'dcdcdcdhdhhdhd hhdhdhdhdcdcdcdhdhdhdhdhhdhdhdhdcdcdcdhdhdhd hdhhdhdhdhdcdcdcdhdhdhdhdhhdhdhdhdcdcdcdhdhdhdhdhhdhdhdhdcd cdcdhdhddhdhdhhdhdhd hdcdcdcdhdhdhdhdhhdhdhdhdcdc…dhdc dcdcdhdhdhdhdhhdh dhdhdcdcdcdhdhdhdhdhhdhdh dhd', deadlineDate: '2023-12-13', deadlineTime: '08:23', timeStamp:new Date(),completed:true},
  {title: 'Match day for real mfs', desc: '', deadlineDate: '2023-12-01', deadlineTime: '', timeStamp:new Date(),completed:false},
  {title: 'we are venom', desc: 'dcdcdcdhdhhdhdhhdhdhdhdc dcdcdhdhdhdhdhhdhdhdhdcdcdcdhdhdhdhdhhdhdhdhdcdcdcdh dhdhdhdhhdhdhdhdcdcdcdhdhdhdhdhhdhdhdhdcdcdcdhdhddh dhdhhdhdhdhdcdcdcdhdhd hdhdhhdhdhdhdcdc…dhdcdcdcdhdhdh dhdhhdhdhdhdcdcdcdh dhdhdhdhhdhdhdhd', deadlineDate: '', deadlineTime: '', timeStamp:new Date(),completed:false},
  {title: 'he is spiderman', desc: '', deadlineDate: '', deadlineTime: '08:23', timeStamp:new Date(),completed:false},
  {title: 'i am batman', desc: 'dcdcdcdhdhhdhdhhdhdhdhdcd cdcdhdhdhdhdhhdhdhdhdcdcdcdhdhdhdhdhhdhdhdhdcdcdcdhdhd hdhdhhdhdhdhdcdcdcdhdhdhdhdhhdhdhdhdcdcdcdhdhddh dhdhhdhdhdhdcdcdcdhdhdhd hdhhdhdhdhdcdc…dhdcdcdcdhdhdh dhdhhdhdhdhdcdcdcdhdh dhdhdhhdhdhdhd', deadlineDate: '2023-12-13', deadlineTime: '', timeStamp:new Date(),completed:true},
]

export default function Home() {
  const statusRef = useRef(null)
  const [taskData, dispatchTaskData] = useReducer(reduceTaskData, initial)
  const [openManageTask,setOpenManageTask] = useState({open:false,mode:'add',originalData:{}})
  const [status, setStatus] = useState('pending')
  const statusList = ['pending','completed']

  const toggleStatus = () => {
    setStatus(prev => prev=== 'pending' ? 'completed' : 'pending')
    const direction = status === 'pending' ? 1 : -1
    statusRef.current.scrollTo({ 
      left:direction * statusRef.current.clientWidth,
      behavior : "smooth" 
    })
  }

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

      <div className="w-[95%] max-w-[900px]  mx-10 my-10 rounded-t-xl">
       
        <ToggleButtonGroup fullWidth exclusive value={status} onChange={(_,val)=>val && toggleStatus()}>
        {statusList.map(ele => 
          <ToggleButton 
            key={ele} value={ele}
            sx={{
              borderRadius: '12px 12px 0 0',
              fontSize:'110%',
              '&.Mui-selected':({palette:{primary}}) => ({
                background: 'linear-gradient(to bottom right, #175732, #4dc7af, #2ea043)',
                color:'white',
                ':hover':{backgroundColor:primary.main+'80'}
              }),
              ':hover' :({palette:{primary}}) => ({
                backgroundColor:'#d6f7ca80',
                borderColor: primary.dark,
                boxShadow:`0px 0px 2px 1px ${primary.dark}`,
              }),
            }}
          >
            {ele}
          </ToggleButton>
        )}
        </ToggleButtonGroup>

        <div 
          ref={statusRef}
          className="flex px-2 lg:px-4 overflow-hidden md:space-x-5 space-x-3" 
        >
          {statusList.map(ele => 
            <RenderTaskData 
              key={ele}
              taskData={taskData} 
              status={ele}
              className={'flex-none w-full'}
              style={{scrollSnapType:''}}
            />
          )}
        </div>
      </div>
      <ManageTask {...openManageTask} onClose={()=>handleOpenManageTask('close')} />

    </TaskDataContext.Provider>
    </div>
  )
}
