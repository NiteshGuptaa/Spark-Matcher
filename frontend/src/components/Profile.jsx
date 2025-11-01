import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';

const Profile = () => {
     const user = useSelector(store => store.user);
     const navigate = useNavigate();
     if(!user){
        return  navigate("/login-page");
     }
   
     return (
        <div>
             <EditProfile user={user} />
        </div>
    )
}

export default Profile
