import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CustTest = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false); // State to track initial loading
  const testimonials = [
    {
      quote: "The selection of books here is unmatched! I always find what I'm looking for.",
      author: "Alice Thompson",
      imageSrc: "https://nursinginstitutegoa.org/wp-content/uploads/2016/01/tutor-8.jpg"
    },
    {
      quote: "This bookstore is a gem! The staff is knowledgeable and always eager to recommend new reads.",
      author: "Benjamin Green",
      imageSrc: "https://salondesmaires-gard.com/wp-content/uploads/2015/04/speaker-1-v2.jpg"
    },
    {
      quote: "I love the cozy atmosphere here. It's the perfect place to spend an afternoon browsing books.",
      author: "Sophia Roberts",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAZfGA82ISc5AaIn70CgXniPCGgNCuHPkcpoKQP0zA9OHqRAj4r7weWI5jSmCqJjN4qTI&usqp=CAU"
    },
    {
      quote: "Fantastic bookstore! I've discovered so many new authors here.",
      author: "John Smith",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfsuivklBvfV8KEIg3jFvarltnmzogZKzIA1WH_kD5sHLTGsncF_ov4euXGCeL7AX8dek&usqp=CAU"
    },
    {
      quote: "A book lover's paradise. The variety here is incredible.",
      author: "Emma Brown",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWR80bXUZqWo2VuAK1-px1InDG1tfveErhrQ&s"
    },
    {
      quote: "Great place to find rare editions. They have books you won't find anywhere else.",
      author: "Michael Johnson",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ICZ3HR963-61yGTIvf-ibl7EQ4X1JS1uKKNJ-GZ3ht3A5FWmTjkGuTXnXZ6seeYPaSo&usqp=CAU"
    },
    {
      quote: "Friendly staff and a welcoming environment. Highly recommend!",
      author: "Sarah Davis",
      imageSrc: "https://writers.ng/wp-content/uploads/2020/06/team-01.jpg"
    },
    {
      quote: "The events they host are amazing. Always something interesting going on.",
      author: "Olivia Wilson",
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwXuC-R_vPRCVYVw19N6DKXUYM8Ae2St95To_TUF63HuygHYcgCDU8SthpSZTvuA8m6rw&usqp=CAU"
    },
    {
      quote: "I come here every weekend. It's my happy place.",
      author: "Daniel Taylor",
      imageSrc: "https://worldywcacouncil.org/wp-content/uploads/2014/10/speaker-2-v2.jpg"
    }
  ];

  useEffect(() => {
    // Set a timeout to simulate initial loading delay (optional)
    const timer = setTimeout(() => {
      setIsLoaded(true); // Set loaded state after timeout
    }, 1000); // Adjust timeout duration as needed

    return () => clearTimeout(timer); // Clean up timer
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
      }, 3000); // Change slide every 5 seconds

      return () => clearInterval(interval); // Clean up interval
    }
  }, [isLoaded, testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <p className="text-xs text-gray-500 uppercase tracking-wide">BOOKSTORE TESTIMONIALS</p>
          <h1 className="text-3xl font-bold text-primary font-cursive">Customer Reviews</h1>
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md p-6 cursor-pointer border border-gray-200 ${index === currentIndex || (isLoaded && (index === (currentIndex + 1) % testimonials.length || index === (currentIndex + 2) % testimonials.length)) ? '' : 'hidden'}`}
            >
              <div className="text-2xl text-yellow-500 mb-4">
                <i className="ri-double-quotes-l"></i>
              </div>
              <p className="text-lg mb-4 text-gray-800">{testimonial.quote}</p>
              <hr className="border-gray-300 my-4" />
              <img className="w-16 h-16 rounded-full mx-auto border-2 border-primary" src={testimonial.imageSrc} alt="user" />
              <p className="text-gray-600 mt-4">{testimonial.author}</p>
            </div>
          ))}
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 px-4 py-2 rounded-full" onClick={prevSlide}>
            &lt;
          </button>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 px-4 py-2 rounded-full" onClick={nextSlide}>
            &gt;
          </button>
        </div>
        <div className="mt-8">
          <h4 className="text-2xl font-bold text-primary mb-2 font-cursive">Visit our bookstore today!</h4>
          <p className="max-w-md mx-auto text-gray-600 mb-4">
            Explore our vast collection of books and find your next great read. Our friendly staff is here to help you discover new favorites.
          </p>
          <button
            className="px-4 py-2 bg-black text-white rounded-md font-semibold hover:bg-white hover:text-black transition duration-300"
            onClick={() => navigate('/login')}
          >
            Find a Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustTest;
