import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseContext } from '../contextApi/createContext';

export default function Auth() {
    const naviagte = useNavigate();
    const {setNotification,setToken}  = UseContext()
    useEffect(()=>{
        const search = new URLSearchParams(window.location.search);
        const token = search.get('token')
    
        if(token){
            setToken(token)
            setNotification('login Successfully')
    
        }else{
            setNotification('Token not found sometime is wrong😂')
            naviagte('/login');
        }
    },[naviagte])
  

    
  return (
    <div>loading.......</div>
  )
}
