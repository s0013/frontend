// Carousel.jsx

import React, { useState, useEffect } from 'react';
import Typewriter from 'react-typewriter-effect';

const sliderData = [
  {
    url: 'https://images.indianexpress.com/2021/06/Untitled-design-4-1.png',
    text: 'Explore New Book World....'
  },
  {
    url: 'https://st4.depositphotos.com/13324256/19674/i/450/depositphotos_196747750-stock-photo-open-book-glasses-row-books.jpg',
    text: 'Discover New Books'
  },
  {
    url: 'https://cdn.create.vista.com/api/media/small/196747688/stock-photo-open-book-row-books-isolated-blue',
    text: 'Read Books'
  },
];

const Carousel = () => {
  const [slide, setSlide] = useState(0);
  const length = sliderData.length;

  const prevSlide = () => {
    setSlide(slide === 0 ? length - 1 : slide - 1);
  };

  const nextSlide = () => {
    setSlide(slide === length - 1 ? 0 : slide + 1);
  };

  const goToSlide = (index) => {
    setSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds (5000 milliseconds)

    return () => clearInterval(interval);
  }, [slide]);

  return (
    <div className='max-w-full mx-auto relative flex justify-center items-center'>
     
      {sliderData.map((item, index) => (
        <div key={index} className={`transition-opacity duration-1000 ${index === slide ? 'opacity-100' : 'opacity-0'}`}>
          {index === slide && (
            <div className='relative'>
              <img className='w-screen h-[25vh] md:h-[40vh] sm:h-[30vh] lg:h-[70vh]' src={item.url} alt='/' />
              <div className='absolute inset-0 flex justify-center items-center'>
                <Typewriter
                  text={item.text}
                  typeSpeed={100}
                  startDelay={200}
                  cursorColor="white"
                  textStyle={{ fontSize: '3rem', color: 'black', fontWeight: 'bold' }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
      <div className='absolute bottom-4 flex justify-center w-full'>
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`cursor-pointer mx-2 w-3 h-3 rounded-full ${index === slide ? 'bg-white' : 'bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
