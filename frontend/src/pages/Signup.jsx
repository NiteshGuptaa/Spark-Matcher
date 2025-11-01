// import axios from 'axios';
// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { addUser } from '../utils/userSlice';
// import { useAuthStore } from '../store/useAuthStore';

// const Signup = () => {
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [emailId, setEmailId] = useState("");
//     const [password, setPassword] = useState("");
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [error, setError] = useState("");
//     const { connectSocket } = useAuthStore();

//     const handleSingup = async () => {
//         try {
//             const res = await axios.post(
//                 "http://localhost:7777/signup",
//                 {
//                     firstName,
//                     lastName,
//                     emailId,
//                     password
//                 },
//                 {
//                     withCredentials: true
//                 }
//             );
//             console.log('Signup Success:', res.data);
//             connectSocket(); // This line should work if no errors occurred
//             dispatch(addUser(res.data.data));

//             // Log to see if the dispatch was successful
//             console.log('User added to Redux store, navigating to home...');
//             return navigate("/"); // This line should work if no errors occurred
//         }
//         catch (err) {
//             // console.log('Login Error:', err);
//             setError(err?.response?.data || "something went wrong")
//         }
//     };


//     return (
//         <div className='h-screen'>
//             <div className='flex justify-center mt-10'>
//                 <div className="card bg-base-300 w-96 shadow-xl">
//                     <div className="card-body">
//                         <h2 className="card-title justify-center">Signup</h2>
//                         <div>
//                             <label className="form-control w-full max-w-xs py-1">
//                                 <div className="label">
//                                     <span className="label-text">First Name</span>
//                                 </div>
//                                 <input type="text" placeholder="" className="input input-bordered w-full max-w-xs"
//                                     onChange={(e) => setFirstName(e.target.value)} />
//                             </label>
//                         </div>
//                         <div>
//                             <label className="form-control w-full max-w-xs py-1">
//                                 <div className="label">
//                                     <span className="label-text">Last Name</span>
//                                 </div>
//                                 <input type="text" placeholder={emailId} className="input input-bordered w-full max-w-xs"
//                                     onChange={(e) => setLastName(e.target.value)} />
//                             </label>
//                         </div>
//                         <div>
//                             <label className="form-control w-full max-w-xs py-1">
//                                 <div className="label">
//                                     <span className="label-text">email id</span>
//                                 </div>
//                                 <input type="text" placeholder={emailId} className="input input-bordered w-full max-w-xs"
//                                     onChange={(e) => setEmailId(e.target.value)} />
//                             </label>
//                         </div>
//                         <div>
//                             <label className="form-control w-full max-w-xs py-1">
//                                 <div className="label">
//                                     <span className="label-text">password id</span>
//                                 </div>
//                                 <input type="password" placeholder={password} className="input input-bordered w-full max-w-xs"
//                                     onChange={(e) => setPassword(e.target.value)} />
//                             </label>
//                         </div>
//                         <div className="card-actions justify-center m">
//                             <button className="btn btn-primary"
//                                 onClick={handleSingup}>SignUp</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )

// }

// export default Signup



import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { useAuthStore } from '../store/useAuthStore';
// import { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

// import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import { BASE_URL } from '../utils/constants';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { connectSocket } = useAuthStore();

    const isSigningUp = false;

    const handleSingup = async (e) => {
        e.preventDefault();
        if (validateForm() === true) {
            try {
                const res = await axios.post(
                    BASE_URL + "/signup",
                    {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        emailId: formData.email,
                        password: formData.password
                    },
                    {
                        withCredentials: true
                    }
                );
                console.log('Signup Success:', res.data);
                connectSocket(); // This line should work if no errors occurred
                dispatch(addUser(res.data.data));

                // Log to see if the dispatch was successful
                console.log('User added to Redux store, navigating to home...');
                return navigate("/"); // This line should work if no errors occurred
            }
            catch (err) {
                // console.log('Login Error:', err);
                setError(err?.response?.data || "something went wrong")
            }
        }

    };

    //   const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.firstName.trim()) return toast.error("firstName name is required");
        if (!formData.lastName.trim()) return toast.error("lastName name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

        return true;
    };



    return (
        <div className="min-h-screen grid  ">
            {/* left side */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12 ">
                <div className="w-full max-w-md space-y-8  ">
                    {/* LOGO */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            {/* <div
                                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
                            >
                                <MessageSquare className="size-6 text-primary" />
                            </div> */}
                            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                            <p className="text-base-content/60">Get started with your free account</p>
                        </div>
                    </div>

                    <form onSubmit={(e)=>handleSingup(e)} className="space-y-6  bg-primary-content  p-6  rounded-lg">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">First Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Last Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="email"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5 text-base-content/40" />
                                    ) : (
                                        <Eye className="size-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
                            {isSigningUp ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to="/login-page" className="link link-primary">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* right side */}

            {/* <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      /> */}
        </div>
    );
};
export default Signup;
