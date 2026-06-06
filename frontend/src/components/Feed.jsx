import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from "react-router-dom";
import LoadingSpinner from './LoadingSpinner';
import './Feed.css';

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
      const res = await axios.get(BASE_URL + '/feed', { withCredentials: true });
      // console.log(res.data.data);
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

  const nextUser = () => {
    setIndex((prev) => (feed.length ? (prev === feed.length - 1 ? 0 : prev + 1) : 0));
  };
  const prevUser = () => {
    setIndex((prev) => (feed.length ? (prev === 0 ? feed.length - 1 : prev - 1) : 0));
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextUser(),
    onSwipedRight: () => prevUser(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (!user) return navigate('/login');
  if (loading) return <LoadingSpinner message="Finding new users for you..." />;
  if (!feed || feed.length === 0)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        No more new users left
      </div>
    );

  const at = (off) => feed[(index + off + feed.length * 10) % feed.length];

  return (
    <section
      className="feed-container relative mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-8 sm:py-0"
      {...handlers}
    >
      {/* Desktop: 5-card stacked layout */}
      <div className="relative hidden h-[680px] w-full items-center justify-center md:flex">
        {/* far prev */}
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-[125%] opacity-30 blur-[2px] transition-all duration-300 lg:-translate-x-[140%]">
          <UserCard user={at(-2)} variant="far" />
        </div>
        {/* near prev */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-y-1/2 -translate-x-[78%] opacity-70 blur-[1px] transition-all duration-300 lg:-translate-x-[85%]">
          <UserCard user={at(-1)} variant="near" />
        </div>
        {/* active */}
        <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
          <UserCard
            user={at(0)}
            variant="active"
            showActions
            setIndex={setIndex}
            onPrev={prevUser}
            onNext={nextUser}
          />
        </div>
        {/* near next */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-y-1/2 -translate-x-[-22%] opacity-70 blur-[1px] transition-all duration-300 lg:-translate-x-[15%]">
          <UserCard user={at(1)} variant="near" />
        </div>
        {/* far next */}
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-[25%] opacity-30 blur-[2px] transition-all duration-300 lg:translate-x-[40%]">
          <UserCard user={at(2)} variant="far" />
        </div>

        {/* Side nav buttons */}
        <button
          onClick={prevUser}
          aria-label="Previous"
          className="absolute left-2 top-1/2 z-40 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-gray-700 bg-gray-900/70 text-white backdrop-blur transition hover:scale-110 hover:border-pink-500 lg:left-6"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={nextUser}
          aria-label="Next"
          className="absolute right-2 top-1/2 z-40 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-gray-700 bg-gray-900/70 text-white backdrop-blur transition hover:scale-110 hover:border-pink-500 lg:right-6"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {/* Mobile: single active card */}
      <div className="flex w-full items-center justify-center md:hidden">
        <UserCard
          user={at(0)}
          variant="active"
          showActions
          setIndex={setIndex}
          onPrev={prevUser}
          onNext={nextUser}
        />
      </div>
    </section>
  );
};

export default Feed;