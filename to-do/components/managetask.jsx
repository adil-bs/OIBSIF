import { TaskDataContext } from '@/app/page'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

const ManageTask = (props) => {
  const {mode,originalData,...modalProps} = props
  const [data,setData] = useState({title:'',desc:'',deadlineDate:'',deadlineTime:''})
  const [feedback,setFeedback] = useState(false)
  const {dispatchTaskData} = useContext(TaskDataContext)

  useEffect(() => {
    setData(mode==='edit' ? originalData : {title:'',desc:'',deadlineDate:'',deadlineTime:''})
  },[mode,originalData])

  const handleDataChange = ({target:{name,value}}) => {
    setData(prev => ({...prev,[name] : value}))
  }
  function handleSubmit(e) {
    e.preventDefault()
    dispatchTaskData({type:mode , data})
    setData({title:'',desc:'',deadlineDate:'',deadlineTime:''})
    setFeedback(true)
    modalProps.onClose()
  }
  
  return (
    <div>
    <Dialog {...modalProps} fullWidth>
        <DialogTitle sx={{fontSize:'1.7rem',textAlign:'center'}} >{mode.toUpperCase()} TASK</DialogTitle>

        <form onSubmit={handleSubmit}>
        <DialogContent className='flex flex-col space-y-5'>
          <TextField 
            required 
            name='title'
            value={data.title}
            onChange={handleDataChange}
            label='Title'
          />
          <TextField 
            multiline 
            name='desc'
            value={data.desc}
            onChange={handleDataChange}
            placeholder='Optional Description (upto 300 characters)'
            label='Description'
            minRows={4}
            inputProps={{maxLength:300}}  
            error={data.desc?.length === 300 }  
            helperText={data.desc?.length === 300 && 'Description reached maximum length'}     
          />
          <p className='!mt-12'>Set a deadline (optional) </p>

          <div className='flex items-center max-sm:flex-col max-sm:space-y-5 sm:space-x-5 '>
          {[{label:'deadlineDate',type:'date'},{label:'deadlineTime',type:'time'}].map(ele =>
            <TextField
              key={ele.label}
              type={ele.type}
              fullWidth
              name={ele.label}
              value={data[ele.label]}
              onChange={handleDataChange} 
            /> 
          )}  
          </div>
          
        </DialogContent>
   
        <DialogActions>
          <Button variant='outlined' type='submit' disabled={data.title === ''}>{mode}</Button>
          <Button variant='outlined' color='error' type='button' onClick={modalProps.onClose}>Cancel</Button>
        </DialogActions>
        </form>

    </Dialog>

      <Snackbar 
        message={`Task ${mode}ed successfully`} 
        open={feedback} 
        onClose={()=>setFeedback(false)} 
        autoHideDuration={2000}
        anchorOrigin={{horizontal:"center",vertical:"bottom"}}
      />
    </div>
  )
}

export default ManageTask