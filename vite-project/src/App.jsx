//
import "./App.css";
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { UserProvider } from "./context/userContext";
import RegisterPage from "./pages/Register";
import Home from './pages/Home'
import AdminLogin from "./components/admin/AdminLogin";
import DashBoard from './pages/Dashboard'
import AddUser from './components/admin/adminAddUser'
import ErrorPage from './components/common/error'
import UserRouter from './routes/userRouter'
import AdminRouter from './routes/adminRouter'

function App() {

  return (
    <UserProvider>
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/admin'  element ={<AdminLogin/>}/>
          <Route path='/admin/dashboard' element={<DashBoard/>}/>
          <Route path='/admin/addUser' element ={<AddUser/>}/>
          <Route path='*' element={<ErrorPage/>}/> */}
          <Route path='/*' element={<UserRouter/>}/>
          <Route path="/admin/*" element={<AdminRouter/>}/>
        {/* <Route path='*' element={<ErrorPage/>}/>  */}

        </Routes>
      </BrowserRouter>
    </>
    </UserProvider>
  );
}

export default App;
