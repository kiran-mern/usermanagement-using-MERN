import React, { useEffect } from 'react'
import Login from '../common/Login'
import axios from 'axios'

const login = () => {
  return (
    <Login head={"User"} redirectPath={'/home'}/>
  )
}

export default login