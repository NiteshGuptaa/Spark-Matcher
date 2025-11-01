

// const Login = () => {
//     const [emailId, setEmailId] = useState("abhi@gmail.com");
//     const [password, setPassword] = useState("Abhi@123");
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [error, setError] = useState("");

//     const { connectSocket, setAuthUser } = useAuthStore();

//     const handleLogin = async () => {
//         try {
//             const res = await axios.post(
//                 "http://localhost:7777/login",
//                 {
//                     emailId,
//                     password
//                 },
//                 {
//                     withCredentials: true
//                 }
//             );
//             console.log('Login Success:', res.data);
//             setAuthUser(res.data);  // save user in auth store for future use.
//             connectSocket();
//             dispatch(addUser(res.data));
//             return navigate("/");
//         }
//         catch (err) {
//             // console.log('Login Error:', err);
//             setError(err?.response?.data || "something went wrong")
//         }
//     };


//     return (
//         <div className='h-screen'>
//             <div className='flex justify-center items-center mt-10'>
//                 <div className="card bg-base-300 w-96 shadow-xl">
//                     <div className="card-body">
//                         <h2 className="card-title justify-center">login</h2>
//                         <div>
//                             <label className="form-control w-full max-w-xs py-4">
//                                 <div className="label">
//                                     <span className="label-text">email id</span>
//                                 </div>
//                                 <input type="text" placeholder={emailId} className="input input-bordered w-full max-w-xs"
//                                     onChange={(e) => setEmailId(e.target.value)} />
//                             </label>
//                         </div>
//                         <div>
//                             <label className="form-control w-full max-w-xs py-4">
//                                 <div className="label">
//                                     <span className="label-text">password id</span>
//                                 </div>
//                                 <input type="text" placeholder={password} className="input input-bordered w-full max-w-xs"
//                                     onChange={(e) => setPassword(e.target.value)} />
//                             </label>
//                         </div>
//                         <div className="card-actions justify-center m">
//                             <button className="btn btn-primary"
//                                 onClick={handleLogin}>login</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default Login







// import { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import AuthImagePattern from "../components/AuthImagePattern";

import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { BASE_URL } from '../utils/constants';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailId, setEmailId] = useState("abhi@gmail.com");
  const [password, setPassword] = useState("Abhi@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { connectSocket, setAuthUser } = useAuthStore();

  const isLoggingIn = false;

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(emailId, password)
      try {
          const res = await axios.post(
            BASE_URL + "/login",
              {
                  emailId,
                  password
              },
              {
                  withCredentials: true
              }
          );
          console.log('Login Success:', res.data);
          setAuthUser(res.data);  // save user in auth store for future use.
          connectSocket();
          dispatch(addUser(res.data));
          return navigate("/");
      }
      catch (err) {
          // console.log('Login Error:', err);
          setError(err?.response?.data || "something went wrong")
      }
  };

  return (
    <div className="h-screen grid ">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              {/* <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
              </div> */}
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={(e)=>handleLogin(e)} className="space-y-6  bg-primary-content  p-6 rounded-lg">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value )}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      {/* <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      /> */}
    </div>
  );
};
export default LoginPage;
