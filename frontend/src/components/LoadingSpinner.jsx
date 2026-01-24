import React from 'react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
      <p className="text-xl text-gray-600">{message}</p>
    </div>
  );
};

export default LoadingSpinner;