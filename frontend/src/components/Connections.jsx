// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useEffect } from "react";
// import { connect, useDispatch, useSelector } from "react-redux";
// import { addConnections } from "../utils/conectionSlice";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { useChatStore } from "../store/useChatStore";

// const Connections = () => {

//   const navigate = useNavigate();
//   const connections = useSelector((store) => store.connections);
//   console.log(connections);
  
//   const dispatch = useDispatch();

//   const { selectedUser, setSelectedUser} = useChatStore();;

//   const fetchConnections = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/user/connections", {
//         withCredentials: true,
//       });
//       console.log(res);
//       dispatch(addConnections(res.data.connectionsInfo));
//       console.log(res.data.connectionsInfo);
//     } catch (err) {
//       // Handle Error Case
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//     console.log(connections);
//   }, []);

//   // useEffect(() => {
//   //   console.log("selectedUser changed:", selectedUser);
//   // }, [selectedUser]);


//   if (connections === null ) return <h1 className="flex justify-center items-center min-h-screen pb-10 text-2xl"> You have no connections yet</h1>

//   const handleChatThisUser = (chatWiththisUser)=>{
//     setSelectedUser(chatWiththisUser);
//     console.log("selected user = ", selectedUser);
//     console.log("user navigat to /chat-home-page")
//     navigate('/chat-home-page')
//   }

//   return (
//     <div className="text-center lg:my-10">
//       <h1 className="text-bold text-white text-3xl">Connections</h1>

//       {connections.map((connection) => {
//         const { _id, firstName, lastName, photoUrl, age, gender, about } =
//           connection;

//           console.log("connection from connection.jsx = ", connection);

//         return (
//           <div key={_id} className=" flex justify-between align-middle m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
//             <div className="flex">
//               <div>
//                 <img
//                   alt="photo"
//                   className="w-20 h-20 rounded-full object-cover"
//                   src={photoUrl}
//                 />
//               </div>
//               <div className="text-left mx-4 ">
//                 <h2 className="font-bold text-xl">
//                   {firstName + " " + lastName}
//                 </h2>
//                 {age && gender && <p>{age + ", " + gender}</p>}
//                 <p>{about}</p>
//               </div>

//             </div>

//             <div>
//               <button onClick={()=>handleChatThisUser(connection)} className=" btn btn-success  px-3 py-1 text-xl font-bold  mt-5 " >chat</button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
// export default Connections;



import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/conectionSlice";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";

const Connections = () => {
  const navigate = useNavigate();
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const { selectedUser, setSelectedUser } = useChatStore();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.connectionsInfo));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections === null)
    return (
      <h1 className="flex justify-center items-center min-h-screen pb-10 text-2xl">
        You have no connections yet
      </h1>
    );

  const handleChatThisUser = (chatWiththisUser) => {
    setSelectedUser(chatWiththisUser);
    navigate("/chat-home-page");
  };

  return (
    <div className="text-center lg:my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex flex-col sm:flex-row justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-full sm:w-1/2 mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              <div>
                <img
                  alt="photo"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                  src={photoUrl}
                />
              </div>
              <div className="text-left mx-4 mt-2 sm:mt-0">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
              </div>
            </div>

            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => handleChatThisUser(connection)}
                className="btn btn-success px-3 py-1 text-xl font-bold"
              >
                Chat
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;