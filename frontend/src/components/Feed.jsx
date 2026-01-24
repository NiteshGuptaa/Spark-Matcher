import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import "./Feed.css";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getFeed = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, [user]);

  const handlers = useSwipeable({
    onSwipedLeft: () => nextUser(),
    onSwipedRight: () => prevUser(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const nextUser = () => {
    setIndex((prev) => (prev === feed.length - 1 ? 0 : prev + 1));
  };

  const prevUser = () => {
    setIndex((prev) => (prev === 0 ? feed.length - 1 : prev - 1));
  };

  // Helper function to get cards with circular wrapping
  const getCircularCards = (startOffset, count) => {
    const cards = [];
    for (let i = 0; i < count; i++) {
      const cardIndex = (index + startOffset + i + feed.length) % feed.length;
      cards.push({ user: feed[cardIndex], offset: startOffset + i });
    }
    return cards;
  };

  if (!user) return navigate("/login-page");

  if (loading) return <LoadingSpinner message="Finding new users for you..." />;

  if (!feed || feed.length === 0)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        No more new users left
      </div>
    );

  return (
    <div className="feed-container" {...handlers}>
      {/* Previous 2 cards */}
      {getCircularCards(-2, 2).map(({ user, offset }) => (
        <div
          key={user._id}
          className="user-card-wrapper prev-card"
          style={{
            left: `${(offset + 3) * 10}%`,
            opacity: offset === -1 ? 0.75 : 0.3, // Immediate prev card more visible
            zIndex: offset === -1 ? 3 : 2, // Immediate card on top
          }}
        >
          <UserCard user={user} />
        </div>
      ))}

      {/* Current card */}
      <div className="user-card-wrapper active-card">
        <UserCard user={feed[index]} setIndex={setIndex} />
      </div>

      {/* Next 2 cards */}
      {getCircularCards(1, 2).map(({ user, offset }) => (
        <div
          key={user._id}
          className="user-card-wrapper next-card"
          style={{
            right: `${(3 - offset) * 10}%`,
            opacity: offset === 1 ? 0.75 : 0.3,  // Immediate next card more visible
            zIndex: offset === 1 ? 3 : 2  // Immediate card on top
          }}
        >
          <UserCard user={user} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
