'use client'
import { useContext, useEffect, useState } from 'react'
import {
  TextField,IconButton, ToggleButton,ToggleButtonGroup, Button, Divider, 
  Dialog, DialogTitle, DialogContent, DialogActions, Alert, Snackbar, Collapse
} from '@mui/material'
import {VisibilityOff,Visibility} from '@mui/icons-material'
import { checkForError } from '@/components/utility'
import { DbContext } from '@/components/database'
import { useRouter } from 'next/navigation'

export const PasswordInput = (props) => {
  const {error,...theProps} = props
  const [showPass, setShowPass] = useState(false)
  return(
    <TextField 
      type={showPass ? 'text' : 'password'}
      {...theProps}
      error={error.length!==0}
      InputProps={{
        endAdornment:
          <IconButton onClick={() => setShowPass(prev => !prev)} edge='end'>
            {showPass ? <VisibilityOff/> : <Visibility/>}
          </IconButton>
      }}
      helperText={error.map(ele => <span key={ele}>{ele} <br/></span>)}
    />
  )
}

export const AlertArray = ({data,className}) => {
  return(
    <Collapse 
      className={className}
      in={data.length>0}
    >
      <Alert severity='error' variant='outlined'>
        {data.map(ele => <p>{ele}</p>)}
      </Alert>
    </Collapse>
  )
}

export default function Authenticate() {
  const router = useRouter()
  const {handleDatabase,setLoggedUser,loggedUser} = useContext(DbContext)
  const [method,setMethod] = useState('login')
  const [formData, setformData] = useState({
    login:{
        uname:"",
        pass:"",
        forgotPass:{
            newPass:"",
            confirmPass:"",
            errors:{newPass:[],confirmPass:[]}
        },
        commonError:[],
        errors:{uname:[],pass:[]}
    },
    signup:{
        uname:'',
        pass:"",
        confirmPass:"",
        commonError:[],
        errors:{uname:[],pass:[],confirmPass:[]}
    }
  })
  const [showForgetPass,setShowForgetPass] = useState('dont show')
  
  useEffect(()=> {
    if (loggedUser)  router.push('/')
  })

  const handleFormData = (e,forgotPass=false) => {
    const {target:{id,value}} = e
    if (forgotPass) {
      return setformData(prev => {
        let newPrev = {...prev}
        newPrev.login.forgotPass[id] = value
        newPrev.login.forgotPass.errors[id]= checkForError(value,id,id==='confirmPass'?formData.login.forgotPass.newPass:'')
        return newPrev
      })
    }
    
    setformData(prev => {
      let newPrev = {...prev}
      newPrev[method][id] = value  
      if (method === 'signup') {
        newPrev[method].errors[id] = checkForError(value,id,id==='confirmPass'?formData[method].pass:'')
      }
      return newPrev
    })
  }
  const formSubmission = (e,type) => {
    e.preventDefault()
    const {uname,pass} = formData[method]
    try {
      if (type === 'forgotPass') {
        const {newPass} = formData.login.forgotPass
        handleDatabase({type:"change password",data:{uname,pass:newPass}})
        setShowForgetPass('done')
      }else{
        const user = handleDatabase({type:method,data:{uname,pass}})
        setLoggedUser(user)
        router.replace('/home')
      }  
    } catch (err) {

      setformData(prev => {
        const newPrev = {...prev}
        if (type === 'forgotPass') {
          newPrev.login.forgotPass.commonError = err
        } else {
          newPrev[method].commonError = err
        }
        return newPrev
      })
    }
    
  } 
  return ( !loggedUser &&
    <main className="flex flex-col min-h-screen pt-11 items-center transition-all">
      
      <ToggleButtonGroup exclusive value={method} onChange={(_,val)=>val && setMethod(val)} >
      {['login','signup'].map(ele => 
        <ToggleButton 
          key={ele} value={ele}
          sx={{
            borderRadius:4,
            height:70,
            width:100,
            fontSize:'110%',
            '&.Mui-selected':({palette:{primary}}) => ({
              backgroundColor:primary.main,
              boxShadow:`0px 0px 9px 5px ${primary.dark} inset `,
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

      <form 
        className='flex flex-col text-center space-y-7 mt-8 max-sm:px-16 p-4 w-full sm:w-[600px] ' 
        onSubmit={(e) => formSubmission(e,method)}
      >

        <AlertArray data={formData[method].commonError}/>
        <TextField
          required
          label="Username"
          id='uname'
          value={formData[method].uname}
          onChange={handleFormData}
          error={formData[method].errors.uname.length!==0}
          helperText={formData[method].errors.uname?.map(ele => <span key={ele}>{ele}<br/></span>)}
        />

        <span 
            className={`${(method ==='signup' || formData.login.uname==='' )&& 'hidden' } transition-all flex !-mb-7 text-sm text-slate-500 justify-end cursor-pointer hover:text-black hover:underline`}
            onClick={()=>setShowForgetPass('show')}
        > Forgot Password? </span>
        
        <PasswordInput 
            id ='pass' 
            label='Password' 
            value={formData[method].pass }
            onChange={handleFormData}
            error={formData[method].errors.pass}
        />

        <Collapse in={method ==='signup' }>
          <PasswordInput
            label={'Confirm Password'} 
            id={'confirmPass'}
            fullWidth
            value={formData.signup.confirmPass}
            onChange={handleFormData}
            error={formData.signup.errors.confirmPass}
          />
        </Collapse>
       
        <Button 
          variant='contained' 
          size='large'
          disabled={Object.values(formData[method]).some(ele => ele ==='')|| Object.values(formData[method].errors).some(ele => ele?.length!==0)}
          sx={{marginBottom:'1.4rem !important'}}
          type='submit'
        > {method} </Button>

        <Divider>
          {method==='login' ? 'New user? Try signing up' : 'Already a user? Try loging in'}
        </Divider>
        <Button variant='outlined' size='large' color='secondary' onClick={()=>setMethod(prev=> prev==='login'? 'signup':'login')}>
          {method==='login' ? 'Sign Up' : 'Login'} 
        </Button>

      </form>

      <Dialog open={showForgetPass === 'show'} onClose={()=>setShowForgetPass(false)} fullWidth>
        <DialogTitle>New Password</DialogTitle>
        <form onSubmit={(e) => formSubmission(e,'forgotPass')}>
        <DialogContent sx={{paddingTop:'10px !important',display:"flex",flexDirection:"column"}}>
          <AlertArray className='mb-8' data={formData.login.forgotPass.commonError}/>
        {['newPass','confirmPass'].map(ele => 
          <PasswordInput
            key={ele} 
            label={ele ==='newPass' ?'New Password' :'Confirm Password'} 
            id={ele}
            value={formData.login.forgotPass[ele]}
            onChange={(e)=>handleFormData(e,true)}
            error={formData.login.forgotPass.errors[ele]}
            sx={{marginBottom:3}}
          />
        )}
        </DialogContent>
        <DialogActions sx={{padding:'10px 30px 25px 0'}}>
          <Button 
            disabled={Object.values(formData.login.forgotPass.errors).some(ele => ele ==='')|| Object.values(formData.login.forgotPass.errors).some(ele => ele.length!==0)}
            type='submit'
          >
            Confirm
          </Button>
          <Button type='button' color='error' onClick={()=>setShowForgetPass(false)}>Close</Button>
        </DialogActions>
        </form>
      </Dialog>

      <Snackbar 
        open={showForgetPass === 'done'}
        autoHideDuration={3000}
        onClose={() => setShowForgetPass('dont show')}
        message='Password Changed Successfully'
        anchorOrigin={{vertical:"bottom",horizontal:"center"}}
      />
    </main>
  )
}
