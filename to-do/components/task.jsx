

import {  ButtonBase, Collapse, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import { getAbsoluteDate, getRelativeTime } from './utility'
import { Check, Delete, Edit } from '@mui/icons-material'
import { TaskDataContext } from '@/app/page'

const Task = (props) => {
    const {dispatchTaskData,handleOpenManageTask} = useContext(TaskDataContext)
    const {title,desc,deadlineDate,deadlineTime,timeStamp,completed} = props
    const deadlineDateString = deadlineDate+' '+deadlineTime
    const theme = useTheme();
    const smallDevice = useMediaQuery(theme.breakpoints.down('md'))
    const actionButtonList = [
        {icon:Check,label:"Mark as completed",color:'green',onClick:()=>dispatchTaskData({type:'completed',timeStamp})},
        {icon:Edit,label:"Edit",color:'black',onClick:() => handleOpenManageTask('edit',props)},
        {icon:Delete,label:"Delete",color:'#C62828',onClick:()=>dispatchTaskData({type:'delete',timeStamp})},
    ]
  return (
    <Collapse in>
    <div className='p-2 shadow-md rounded-md border-yellow-700 border'>

        <div className='flex flex-col'>
            <div className='flex justify-between'>
                <p className='text-lg font-medium truncate'>{title}</p>
                <Tooltip title={'Deadline: '+getAbsoluteDate(deadlineDateString)} arrow className={getAbsoluteDate(deadlineDateString)==='Invalid Date'?'hidden':''}>
                    <span className='text-red-600'>{getRelativeTime(deadlineDateString)}</span>
                </Tooltip>  
            </div>         
            <p className='overflow-hidden text-sm col-span-2 line-clamp-2'>{desc}</p>   
        </div>
        
        <div className='mt-1 p-1 flex items-center justify-between'>
            <p className=' text-gray-500 text-xs '>{getAbsoluteDate(timeStamp)}</p>
            <div className='text-xs space-x-3 md:text-sm'>
            {actionButtonList.map((ele,i) => 
                <ButtonBase 
                    key={i} 
                    onClick={ele.onClick}
                    {... smallDevice ? {component:Tooltip, title:ele.label} :{} } 
                    sx={{
                        color:ele.color,
                        borderColor:ele.color,
                        border: 1,
                        borderColor: 'black',
                        background: 'linear-gradient(to right, #E6F1E6, transparent)',
                        padding:'5px',
                        paddingX:{md:1},
                        spaceX:'23px',
                        borderRadius:{xs:25,md:3},
                        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s', 
                        '&:hover': {
                            transform: 'scale(1.06)',
                            background: 'linear-gradient(to right, #D4DFD4, transparent)',
                        },
                    }}
                > 
                    <p className='text-[0.8em] mr-2 max-md:hidden'>{ele.label}</p>
                    <ele.icon fontSize='inherit'/> 
                </ButtonBase>
            )}
            </div>
        </div>

    </div>
    </Collapse>
  )
}

export default Task