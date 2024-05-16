import React, { useEffect } from 'react'
import Login from '../common/Login'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const login = () => {
  let token=localStorage.getItem('user')
  const navigate=useNavigate()
  async function isValid(){
    if(token){

      try{
        
        const response=await axios.get('http://localhost:3000/valid',{
          headers: {
            Authorization: `${token}`,
          }
        })
        navigate('/home')
      }catch(error){
        console.log(error);
        navigate('/')
  
      }
    }
 }

useEffect(()=>{
 console.log('count');
 isValid()
},[token,navigate])
  return (

    <Login head={"user"} />

  )
}

export default login