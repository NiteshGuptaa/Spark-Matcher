// import React, { useEffect } from 'react'
// import NavBar from './NavBar'
// import { Outlet, useNavigate } from 'react-router-dom'
// import Footer from './Footer'
// import { BASE_URL } from '../utils/constants'
// import axios from 'axios'
// import { useDispatch, useSelector } from 'react-redux'
// import { addUser } from '../utils/userSlice'

// const Body = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector(store => store.user);


//   const fetchUser = async ()=>{
//     if(user ) return ;
//      try{
//         const res = await axios.get(BASE_URL + "/profile/view", {withCredentials : true});
//         dispatch(addUser(res.data));
//         // console.log(res.data);
//         navigate("/");
//      }
//      catch(err){
//         if(err.status === 401){
//           navigate("/login-page");
//         }
//         console.log(err);
//      }
//   }

//   useEffect(()=>{
//        fetchUser();
//   }, [])

//   return (
//     <div>
//       <NavBar />
//       <div  className='min-h-screen'>
//       <Outlet />

//       </div>
//       {/* <Footer /> */}
//     </div>
//   )
// }

// export default Body






import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (user) return;
    try {
      const res = await axios.get(BASE_URL + '/profile/view', { withCredentials: true });
      dispatch(addUser(res.data));
      navigate('/');
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login-page');
      }
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex relative flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow ">
        <Outlet /> {/* This will render the Feed component */}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Body;