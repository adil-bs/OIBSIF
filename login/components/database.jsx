'use client'
import React, { createContext, useState } from 'react'
import { generateSalt, hashPassword } from './utility'

export const DbContext = createContext()

const Database = ({children}) => {
    const [database, setDatabase] = useState([])
    const [loggedUser, setLoggedUser] = useState('')

    const handleDatabase = ({type,data}) => {
        const {uname,pass} = data
        let error = []
        switch(type) {
            case 'signup':
                const userSalt = generateSalt()
                setDatabase(prev => prev.concat({
                    uname,
                    userSalt,
                    pass : hashPassword(pass,userSalt),
                }) )
                return uname

            case 'login' :
                const loggedUser = database.find(({uname:username,pass:password,userSalt}) => 
                    uname === username && hashPassword(pass,userSalt) === password
                )
                if (loggedUser) return loggedUser.uname
                else throw ['Credentails does not match !']

            case 'change password' :
                if (database.length === 0) throw ['username is not valid']

                const newDatabase  = database.map((user,i) => {
                    if (user?.uname === uname) {
                        if (user.pass === hashPassword(pass,user.userSalt)) {
                            error.push('New password cannot be same as the old one')
                            return user
                        }else {
                            const userSalt = generateSalt()
                            return {
                                ...user,
                                userSalt,
                                pass:hashPassword(pass,userSalt)
                            }
                        }
                    }else if (i === database.length - 1) {
                        error.push('username is not valid')
                    }else{
                        return user
                    }
                })
                if (error.length > 0) throw error 
                return setDatabase(newDatabase)     
            
        }
    }
  return (
    <DbContext.Provider value={{database,handleDatabase,loggedUser,setLoggedUser}}>
        {children}
    </DbContext.Provider>
  )
}

export default Database