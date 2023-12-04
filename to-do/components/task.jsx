import {  
    Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogTitle, IconButton,
    List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, useMediaQuery, 
    useTheme 
} from '@mui/material'
import React, { useContext, useState } from 'react'
import { getAbsoluteDate, getRelativeTime } from './utility'
import { Check, CheckCircleOutlined, Delete, Edit, MoreVert, Replay, ReportOutlined } from '@mui/icons-material'
import { TaskDataContext } from '@/app/page'

const Task = (props) => {
    const {dispatchTaskData,handleOpenManageTask} = useContext(TaskDataContext)
    const {title,desc,deadlineDate,deadlineTime,timeStamp,completed} = props
    const [openDetailTask, setOpenDetailTask] = useState(false)
    const [openTaskAction,setOpenTaskAction] = useState(false)
    const deadlineDateString = deadlineDate+' '+deadlineTime
    const theme = useTheme();
    const smallDevice = useMediaQuery(theme.breakpoints.down('md'))
    
    const actionButtonList = [
        completed 
            ? {icon:Replay,label:"Mark as incomplete",color:'#CF954D',onClick:()=>dispatchTaskData({type:'toggleComplete',timeStamp})}
            : {icon:Check,label:"Mark as completed",color:'green',onClick:()=>dispatchTaskData({type:'toggleComplete',timeStamp})} ,
        {icon:Edit,label:"Edit",color:'black',onClick:() => handleOpenManageTask('edit',props)},
        {icon:Delete,label:"Delete",color:'#C62828',onClick:()=>dispatchTaskData({type:'delete',timeStamp})},
    ]

  return (
    <div>
    <div 
        className='p-2 shadow-md rounded-md border-yellow-700 border hover:scale-[1.02] transition-all cursor-pointer' 
        onClick={() => setOpenDetailTask(true)}
    >

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
                    onClick={(e) => {
                        e.stopPropagation()
                        ele.onClick()
                    }}
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

    
    <Dialog open={openDetailTask} onClose={() => setOpenDetailTask(false)} fullWidth>
        <DialogTitle className='!pb-0 flex justify-between items-center'>
            <p>{title.toUpperCase()}</p>

            <Tooltip
                open = {openTaskAction}
                arrow
                title={
                    <List sx={{color:"white"}}>
                        {actionButtonList.map(ele =>
                        <ListItem disablePadding dense key={ele.label} >
                        <ListItemButton onClick={ele.onClick}>
                            <ListItemIcon sx={{minWidth:'30px',color:'white'}}><ele.icon fontSize='inherit'/></ListItemIcon>
                            <ListItemText  primary={ele.label} />
                        </ListItemButton>
                        </ListItem> )}
                    </List>
                }
            >
                <IconButton onClick={(e) => setOpenTaskAction(prev => !prev)}>
                    <MoreVert fontSize='inherit' />
                </IconButton>    
            </Tooltip>
            
        </DialogTitle>

        <DialogContent className=' space-y-1'>
            <p className='mb-4'>
                Status : {completed  
                ?  <span className='text-green-600'>Completed <CheckCircleOutlined fontSize='inherit'/></span> 
                :  <span className='text-red-600'>Pending... <ReportOutlined fontSize='inherit'/></span>
            }
            </p>
            {desc && <p className=' overflow-hidden !mb-5 '>{desc}</p>}
            <p className='text-sm'>Task created on : {getAbsoluteDate(timeStamp)}</p>
            <p className='text-sm text-red-700'>
                {deadlineDate? `Deadline set on : ${getAbsoluteDate(deadlineDateString)}` : 'Task has no deadline'}
            </p>
        </DialogContent>

        <DialogActions>
            <Button onClick={() => setOpenDetailTask(false)} variant='outlined'>Cancel</Button>
        </DialogActions>
    </Dialog>

    </div>
  )
}

export default Task