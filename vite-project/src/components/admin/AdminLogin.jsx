import React,{useEffect} from 'react'
import Login from '../common/Login'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  let token=localStorage.getItem('admin')
  const navigate=useNavigate()
  async function isValid(){
    if(token){

      try{
        
        const response=await axios.get('http://localhost:3000/admin/valid',{
          headers: {
            Authorization: `${token}`,
          }
        })
        console.log('count');
        navigate('/admin/dashboard')
      }catch(error){
        console.log(error);
        navigate('/admin')
  
      }
    }
 }

useEffect(()=>{
 isValid()
},[token,navigate])
  return (

    <Login  head={"admin"} />
    
  )
}

export default AdminLogin