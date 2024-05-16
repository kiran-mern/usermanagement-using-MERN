//
import "./App.css";
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext";

import UserRouter from './routes/userRouter'
import AdminRouter from './routes/adminRouter'

function App() {

  return (
    <UserProvider>
    <>
      <BrowserRouter>
        <Routes>
         
          <Route path='/*' element={<UserRouter/>}/>
          <Route path="/admin/*" element={<AdminRouter/>}/>

        </Routes>
      </BrowserRouter>
    </>
    </UserProvider>
  );
}

export default App;
