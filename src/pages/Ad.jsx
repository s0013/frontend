// Ad.jsx

import React, { useState, useEffect } from 'react';

const Ad = () => {
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  // Example announcement texts
  const announcements = [
   'Discover our latest bestsellers! Visit our store or browse online.',
    'Exciting discounts on all fiction books this month!',
    'Join us for our book signing event this Saturday at 3 PM.'
  ];

  // Function to cycle through announcements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prevIndex) => (prevIndex === announcements.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change announcement every 3 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" bg-blue-200 text-black py-1">
      <div className="container mx-auto flex justify-center">
        <div className="text-3xl font-bold mt-2 mb-2 font-cursive text-center">
          {announcements[currentAnnouncementIndex]}
        </div>
      </div>
    </div>
  );
};

export default Ad;
