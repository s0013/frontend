import React, { useEffect, useState } from 'react';

const AuthorCard = ({ author, openModal }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);  // Trigger animation once component is mounted
  }, []);

  const handleOpenModal = () => {
    openModal(author);
  };

  return (
    <div className={`flex flex-col items-center transition-transform duration-500 ${loaded ? 'transform translate-x-0' : 'transform -translate-x-full'}`}>
      <button className="focus:outline-none" onClick={handleOpenModal}>
        <div className="relative w-24 h-24 rounded-full overflow-hidden mt-4 cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <img
            src={author.photoUrl}
            alt={author.name}
            className="w-full h-full object-cover"
          />
        </div>
      </button>
      <p className="text-center mt-2 font-semibold text-white ">{author.name}</p>
    </div>
  );
};

export default AuthorCard;
