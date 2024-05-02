import React from "react";
import { Navigate } from "react-router-dom";

const AdminAuth = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem("admin");
    return isLoggedIn ? children : <Navigate to="/admin" replace />;
};

export default AdminAuth;
