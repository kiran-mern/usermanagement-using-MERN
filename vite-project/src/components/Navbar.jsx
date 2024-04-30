import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
    const navigate=useNavigate()
    const[user,setUser]=useState('')

    useEffect(()=>{
        try{
            const fetchData=async()=>{
                const token=localStorage.getItem('token')
                if(token){
                    const response=await axios.get('http://localhost:3000/home',{
                        headers:{
                            Authorisation:`${token}`
                        }
                    })
                    if(response.status==200){
                        setUser(response.data.name)
                    }
                }
            }
            fetchData();

        }
        catch(error){
            console.log(error);

        }

        const logOut=()=>{
            localStorage.removeItem('token')
            setUser('')
            navigate('/')
        }
    })
  return (
    <div>Navbar</div>
  )
}

export default Navbar