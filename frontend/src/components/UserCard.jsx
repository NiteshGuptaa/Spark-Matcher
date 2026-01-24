import { useDispatch, useSelector } from "react-redux";
import { moveToLast, removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user, setIndex }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills, sendFromEditProfile } = user;
  // console.log(skills);
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) { }
  };

  const nextUser = () => {
    setIndex((prevInd) => {
      if (prevInd === feed.length - 1)
        return 0;
      else return prevInd + 1;
    })
  };

  const prevUser = () => {
    setIndex((prevInd) => {
      if (prevInd === 0)
        return feed.length - 1;
      else return prevInd - 1;
    })
  }

  return (
    // <div className="card bg-base-300 w-96 shadow-xl">
    //   <figure>
    //     <img
    //       src={photoUrl}
    //       className="w-96 h-[400px] object-cover xl:rounded-t-xl"
    //       alt="photo"
    //     />        </figure>
    //   <div className="card-body">
    //     <h2 className="card-title">{firstName + " " + lastName}</h2>
    //     {age && <span>{age }</span>}
    //     {gender && <span>{ gender}</span>}
    //     <p>{about}</p>

    //     {
    //         sendFromEditProfile &&
    //          <p>  <span className="text-purple-600">skills: </span> { skills.length === 0 ? "" : skills.join(', ')}</p>
    //     }
    //     <div className="card-actions justify-center">

    //       {
    //         !sendFromEditProfile &&
    //         <div className="flex justify-evenly gap-2">
    //         <button
    //           className="btn btn-neutral hidden lg:block"
    //           onClick={() => prevUser()}
    //         >
    //           prev
    //         </button>
    //           <button
    //             className="btn btn-primary "
    //             onClick={() => handleSendRequest("ignored", _id)}
    //           >
    //             Ignore
    //           </button>

    //           <button
    //             className="btn btn-secondary"
    //             onClick={() => handleSendRequest("interested", _id)}
    //           >
    //             Interested
    //           </button>

    //           <button
    //             className="btn btn-neutral  hidden lg:block"
    //             onClick={() => nextUser()}
    //           >
    //             next
    //           </button>
    //         </div>
    //       }

    //     </div>
    //   </div>
    // </div>

    <div className="card bg-base-300 w-full lg:w-96 shadow-xl"> {/* Use w-full for mobile */}
  <figure>
    <img
      src={photoUrl}
      className="w-full h-[400px] object-cover xl:rounded-t-xl" /* Use w-full for mobile */
      alt="photo"
    />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && <span>{age}</span>}
    {gender && <span>{gender}</span>}
    <p>{about}</p>

    {sendFromEditProfile && (
      <p>
        <span className="text-purple-600">Skills: </span>
        {skills.length === 0 ? "" : skills.join(", ")}
      </p>
    )}
    <div className="card-actions justify-center">
      {!sendFromEditProfile && (
        <div className="flex justify-evenly gap-2">
          <button
            className="btn btn-neutral hidden lg:block"
            onClick={() => prevUser()}
          >
            prev
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
          <button
            className="btn btn-neutral hidden lg:block"
            onClick={() => nextUser()}
          >
            next
          </button>
        </div>
      )}
    </div>
  </div>
</div>
  );
};
export default UserCard;