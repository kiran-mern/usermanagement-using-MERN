import React, {useContext,useState,createContext} from "react";

const UserContext=createContext();
export const useUser=()=>useContext(UserContext)
 
export const UserProvider=({children})=>{
    const [user,setUser]=useState(null)

    const logoutUser=()=>{
        localStorage.removeItem('user')
        setUser(null)
    }
    return(
       <UserContext.Provider value={{user,logoutUser}}>
        {children}
       </UserContext.Provider>
    )

}
