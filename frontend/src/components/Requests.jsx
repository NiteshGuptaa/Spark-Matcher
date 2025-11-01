import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addToRequests, removeFromRequests } from "../utils/requestSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  // const [requests , setRequests] = useState([]);
  // if(requests ){
    // console.log(requests._id);
    console.log(requests);
  // }
  const dispatch = useDispatch();

  const reviewRequest = async (status,fromUserId,  _id) => {
    console.log(_id);
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + fromUserId,
        {},
        { withCredentials: true }
      );
      console.log(res);
      res.then((result)=>{
        if(result.status === 200)
          dispatch(removeFromRequests(_id));
        else  toast.error(result.message);
      }) 
    } catch (err) {
      toast.error(err.message);

      console.log("error in reviewRequest-  ", err)
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res)

      dispatch(addToRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  

  if (!requests) return;

  if (requests.length === 0) return <h1 className="flex justify-center items-center min-h-screen pb-10 text-2xl"> You have no requests yet</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
            <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", _id,  request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", _id,  request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;