import { useContext } from "react"
import { DbContext } from "./database"
import crypto from 'crypto'

export function checkForError(value,type,confirmValue='') {
    const {database}=useContext(DbContext)  
    let error=[]

    switch (type) {
        case 'uname' :
            if (value.length<3){
                error.push('Username must be atleast 3 characters long')
            }if (/\s/.test(value)){
                error.push('Whitespaces are not allowed')
            }if (database.some(user => user.uname === value)) {
                error.push('Username already taken')
            }
            return error
        case 'pass':
        case 'newPass':
            if (value.length<8){
                error.push('Password must be atleast 8 characters long')
            }if (! /[A-Z]/.test(value)){
                error.push('Password must alteast have one uppercase letter')
            }if (! /\d/.test(value)){
                error.push('Password must alteast have one digit')
            }
            return error
        case 'confirmPass':
            if (value!==confirmValue){
                error.push("Password doesn't match")
            }
            return error
    }
}

export function hashPassword(password, salt) {
    const hash = crypto.createHash('sha256');
    hash.update(password + salt); 
    return hash.digest('hex'); 
}
  
export function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}