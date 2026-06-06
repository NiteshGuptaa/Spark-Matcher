import { useDispatch, useSelector } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const sizes = {
  active:
    'w-[300px] sm:w-[320px] md:w-[340px] lg:w-[300px] xl:w-[320px] 2xl:w-[340px]',
  near:
    'w-[240px] sm:w-[260px] md:w-[280px] lg:w-[240px] xl:w-[260px] 2xl:w-[280px]',
  far:
    'w-[180px] sm:w-[200px] md:w-[220px] lg:w-[180px] xl:w-[200px] 2xl:w-[220px]',
};

const heights = {
  active: 'h-[520px] sm:h-[540px] md:h-[560px] lg:h-[500px] xl:h-[520px] 2xl:h-[540px] max-h-[600px]',
  near:   'h-[440px] sm:h-[460px] md:h-[480px] lg:h-[440px] xl:h-[460px] 2xl:h-[480px] max-h-[530px]',
  far:    'h-[360px] sm:h-[380px] md:h-[400px] lg:h-[360px] xl:h-[380px] 2xl:h-[400px] max-h-[440px]',
};

// Image takes exactly 55% of card height — kept consistent across variants
const imageHeights = {
  active: 'h-[65%]',
  near:   'h-[65%]',
  far:    'h-[65%]',
};

const UserCard = ({
  user,
  setIndex,
  variant = 'active',
  showActions = false,
  onPrev,
  onNext,
}) => {
  if (!user) return null;
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    skills,
    sendFromEditProfile,
  } = user;

  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + '/request/send/' + status + '/' + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {}
  };

  const nextUser = () => {
    if (onNext) return onNext();
    setIndex && setIndex((p) => (p === feed.length - 1 ? 0 : p + 1));
  };
  const prevUser = () => {
    if (onPrev) return onPrev();
    setIndex && setIndex((p) => (p === 0 ? feed.length - 1 : p - 1));
  };

  const isActive = variant === 'active';

  return (
    <div
      className={`
        relative flex flex-col overflow-hidden rounded-3xl border border-white/10
        bg-gradient-to-b from-gray-800 to-gray-950 text-white
        ${sizes[variant]} ${heights[variant]}
        transition-all duration-300
      `}
      style={{
        boxShadow: isActive
          ? '0 32px 64px -16px rgba(0,0,0,0.7), 0 0 48px -12px rgba(236,72,153,0.35), inset 0 1px 0 rgba(255,255,255,0.08)'
          : '0 12px 28px -8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* ── Photo ── */}
      <div className={`relative w-full flex-shrink-0 overflow-hidden ${imageHeights[variant]}`}>
        <img
          src={photoUrl}
          alt={firstName}
          className="absolute inset-0 h-full w-full object-cover object-top"
          loading="lazy"
        />
        {/* bottom fade */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
          style={{
            background:
              'linear-gradient(to top, rgba(15,18,30,1) 0%, rgba(15,18,30,0.6) 50%, transparent 100%)',
          }}
        />
        {/* age badge */}
        {age && (
          <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
            {age}
          </span>
        )}
      </div>

      {/* ── Info ── */}
      <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
        {/* Name + gender */}
        <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
          <h2
            className={`truncate font-bold leading-tight tracking-tight ${
              isActive ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
            }`}
          >
            {firstName} {lastName || ''}
          </h2>
          {gender && (
            <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium capitalize text-gray-400">
              {gender}
            </span>
          )}
        </div>

        {/* About — clamps and fills remaining space */}
        {about && (
          <p
            className={`mb-2 leading-relaxed text-gray-400 ${
              isActive ? 'line-clamp-3 text-sm' : 'line-clamp-2 text-xs'
            }`}
          >
            {about}
          </p>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {skills.slice(0, isActive ? 6 : 3).map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-purple-900/50 px-2.5 py-0.5 text-[10px] font-medium text-purple-300 ring-1 ring-purple-700/40"
              >
                {skill}
              </span>
            ))}
            {skills.length > (isActive ? 6 : 3) && (
              <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] text-gray-500">
                +{skills.length - (isActive ? 6 : 3)}
              </span>
            )}
          </div>
        )}

        {/* Action buttons */}
        {showActions && !sendFromEditProfile && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              className="rounded-2xl bg-rose-600/90 py-2.5 text-xs font-semibold text-white shadow-lg shadow-rose-900/30 transition-all duration-200 hover:scale-[1.03] hover:bg-rose-500 active:scale-95 sm:text-sm"
              onClick={() => handleSendRequest('ignored', _id)}
            >
              Ignore
            </button>
            <button
              className="rounded-2xl py-2.5 text-xs font-semibold text-white shadow-lg shadow-pink-900/30 transition-all duration-200 hover:scale-[1.03] active:scale-95 sm:text-sm"
              style={{
                background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
              }}
              onClick={() => handleSendRequest('interested', _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;