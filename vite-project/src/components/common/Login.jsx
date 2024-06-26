import React, { useEffect, useState } from "react";
import axios,{AxiosError} from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({head}) => {

  const navigate=useNavigate()
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/${head==='admin'? 'admin' : 'user'}/login`, {
        email,
        password,
      });
      handleLoginResponse(response);
    } catch (error) {
      handleLoginError(error);
    }
  };


  const handleLoginResponse = (response) => {
    const token = response.data.token;
    console.log('restttt',response);
    // if(token){

      // localStorage.setItem("token", token);
      if (response.data.role==='admin') {
        localStorage.setItem("admin", token);

        navigate('/admin/dashboard');
      }else if(response.data.role==='user'){
        localStorage.setItem("user", token);

        navigate('/home');
    }

    // }
    //  else {
    //   toast.error(response.data.message || "Failed to login");
    // }
  };
  const handleLoginError = (error) => {
    console.log(error);
    toast.error("Failed to login");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error('Invalid email format');
      return;
    }
    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    handleLogin();

 
};


 
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to {head} account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        <ToastContainer />

        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
             
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button onClick={handleClick}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link
            to="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign Up
          </Link>
        </p> 
      </div>
    </div>
  );
};

export default Login;
