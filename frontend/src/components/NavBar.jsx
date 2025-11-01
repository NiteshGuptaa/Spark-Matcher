import axios from 'axios';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { useAuthStore } from '../store/useAuthStore';
import logo from '../assets/logo.jpg';




const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store)=> store.user);
  // console.log(user);
  const {disconnectSocket} = useAuthStore();

  const handleLogout = async ()=>{
    try{
      const res = await axios.post(BASE_URL + "/logout",  {}, {withCredentials : true});
      console.log(res);
      disconnectSocket();
      dispatch(removeUser());
      return navigate("/login-page");
    }
    catch(err){
      console.log(err.message);
    }
  }
  return (
    <div>
      <div className="navbar bg-base-300">
      {/* <div className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"> */}
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            <img className='w-[40px]' src={logo} alt="logo image" />
            <h3>SparkMathcer</h3>
          </Link>
        </div>
        {user && 
          <div className="flex-none gap-2">
{/*             <div>Welcome, {user.firstName}</div> */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[3] mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                  <Link to="/connections">Connections</Link>
                  <Link to="/requests">Requests</Link>
                  <Link to="/settings">Settings</Link>

                  <a onClick={handleLogout} className='hover:cursor-pointer'>Logout</a>
                  
                </li>
              </ul>
            </div>
          </div>
        }
        {!user &&
            <div className='flex gap-2'>
              <Link to="/signup">SingUP</Link>
              <Link to="/login-page" >login</Link>
            </div>
        }
      </div>
    </div>
  )
}

export default NavBar
