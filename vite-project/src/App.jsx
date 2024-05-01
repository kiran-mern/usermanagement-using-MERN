//
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import Home from './pages/Home'
import AdminLogin from "./components/AdminLogin";
import DashBoard from './pages/Dashboard'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/admin'  element ={<AdminLogin/>}/>
          <Route path='/admin/dashboard' element={<DashBoard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
