import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Arrival = () => {
  const [newArrivalBooks, setNewArrivalBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchNewArrivalBooks = async () => {
      try {
        const response = await axios.get('https://backend-qmjl.onrender.com/books');
        const books = response.data;

        // Filter and set new arrival books
        const newArrivalBooksFiltered = books.filter(book => book.authors.newarrival);
        setNewArrivalBooks(newArrivalBooksFiltered);
      } catch (error) {
        console.error('Error fetching new arrival books:', error);
      }
    };

    fetchNewArrivalBooks();
  }, []);

  // Function to move to the next book
  const goToNextBook = () => {
    setCurrentIndex((prevIndex) => (prevIndex === newArrivalBooks.length - 1 ? 0 : prevIndex + 1));
  };

  // Function to move to the previous book
  const goToPrevBook = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? newArrivalBooks.length - 1 : prevIndex - 1));
  };

  // Automatically change book every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      goToNextBook();
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 font-cursive text-center">New Arrival Books</h1>
      <div className="relative">
        {/* Previous Button */}
        <div className="absolute top-1/2 transform -translate-y-1/2 left-0 z-10 hidden sm:block">
          <button
            onClick={goToPrevBook}
            className="text-2xl text-gray-600 focus:outline-none bg-white px-4 py-2 rounded-full shadow-md"
          >
            &lt;
          </button>
        </div>
        {/* Next Button */}
        <div className="absolute top-1/2 transform -translate-y-1/2 right-0 z-10 hidden sm:block">
          <button
            onClick={goToNextBook}
            className="text-2xl text-gray-600 focus:outline-none bg-white px-4 py-2 rounded-full shadow-md"
          >
            &gt;
          </button>
        </div>
        <div className="w-full max-w-screen-lg mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {newArrivalBooks.slice(currentIndex, currentIndex + 3).map((book) => (
              <div key={book._id} className="bg-white rounded-lg shadow-md p-6">
 <img
  src={book.authors.imageurl}
  alt={book.authors.bookname}
  className="w-32 h-48 object-cover mb-4 rounded-md border border-gray-300 shadow-md mx-auto"
/>
                <h3 className="text-xl font-semibold mb-2">{book.authors.bookname}</h3>
                <p className="text-black mb-2">Price: ${book.authors.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arrival;
