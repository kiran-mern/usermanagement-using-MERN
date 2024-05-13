//
// import "./App.css";
import {  Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import { UserProvider } from "../context/userContext";
import RegisterPage from "../pages/Register";
import Home from '../pages/Home'
import AdminLogin from "../components/admin/AdminLogin";
import DashBoard from '../pages/Dashboard'
import AddUser from '../components/admin/adminAddUser'
import ErrorPage from '../components/common/error'
function adminRouter() {
  return (
    <UserProvider>
    <>
      {/* <BrowserRouter> */}
        <Routes>
          <Route path='/'  element ={<AdminLogin/>}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path='/addUser' element ={<AddUser/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      {/* </BrowserRouter> */}
    </>
    </UserProvider>
  );
}

export default adminRouter;
