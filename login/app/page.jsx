'use client'
import { DbContext } from '@/components/database'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'

const Home = () => {
    const {loggedUser,setLoggedUser} = useContext(DbContext)
    const router = useRouter()

    useEffect(() => {
      if (!loggedUser)  router.push('/authenticate') 
    })

  return ( loggedUser &&
    <div className='flex flex-col space-y-5 justify-center items-center min-h-screen'>
        <p className='text-2xl font-bold'>Welcome home {loggedUser}</p> 
        <Button onClick={() => setLoggedUser('')} color='error'>Logout</Button>
    </div>
  )
}

export default Home