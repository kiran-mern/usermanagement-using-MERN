//
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { UserProvider } from "./context/userContext";
import RegisterPage from "./pages/Register";
import Home from './pages/Home'
import AdminLogin from "./components/admin/AdminLogin";
import DashBoard from './pages/Dashboard'
import AddUser from './components/admin/adminAddUser'
function App() {
  return (
    <UserProvider>
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/admin'  element ={<AdminLogin/>}/>
          <Route path='/admin/dashboard' element={<DashBoard/>}/>
          <Route path='/admin/addUser' element ={<AddUser/>}/>
        </Routes>
      </BrowserRouter>
    </>
    </UserProvider>
  );
}

export default App;
