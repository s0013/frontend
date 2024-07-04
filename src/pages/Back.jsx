import React from 'react';
import { useNavigate } from 'react-router-dom';

const Back = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back one step in history
  };

  return (
    <button onClick={goBack} className="text-sm md:text-base text-white hover:text-black transition duration-300 border border-gray-600 rounded-md mt-2 py-1  hover:bg-indigo-200 bg-indigo-700 ml-4 px-4 mb-4">
      &lt; Back
    </button>
  );
};

export default Back;
