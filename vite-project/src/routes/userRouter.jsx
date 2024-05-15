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
function userRouter() {
  return (
    <UserProvider>
    <>
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      {/* </BrowserRouter> */}
    </>
    </UserProvider>
  );
}

export default userRouter;
