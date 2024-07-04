import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Buy = () => {
  const location = useLocation();
  const { book } = location.state || {};
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [numCopies, setNumCopies] = useState(1);
  const [totalPrice, setTotalPrice] = useState(book ? book.authors.price : 0);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve username from local storage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  if (!book) {
    return <p>No book selected.</p>;
  }

  const handleNumCopiesChange = (e) => {
    const copies = e.target.value;
    setNumCopies(copies);
    setTotalPrice(copies * book.authors.price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const purchaseDetails = {
      username,
      book: {
        bookname: book.authors.bookname,
        author: book.authors.author,
        price: book.authors.price,
        imageurl: book.authors.imageurl,
      },
      address,
      numCopies,
      totalPrice,
    };

    try {
      const response = await fetch('https://backend-qmjl.onrender.com/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseDetails),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Purchase successful!');
        navigate('/UserPage'); // Navigate back to the Customer page after successful purchase
      } else {
        const error = await response.json();
        alert(`Purchase failed: ${error.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Purchase Book</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
        <img
          src={book.authors.imageurl}
          alt={book.authors.bookname}
          className="w-32 h-48 object-cover rounded-md border border-gray-300 shadow-md mr-6 mb-4 md:mb-0"
        />
        <div>
          <h2 className="text-xl font-semibold">{book.authors.bookname}</h2>
          <p className="text-gray-600">Author: {book.authors.author}</p>
          <p className="text-gray-600">Price: ${book.authors.price}</p>
          <p className="text-gray-600">Description: {book.authors.description}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your address"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numCopies">
            Number of Copies
          </label>
          <input
            id="numCopies"
            type="number"
            value={numCopies}
            onChange={handleNumCopiesChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="1"
            required
          />
        </div>
        <div className="mb-4">
          <p className="text-gray-700 text-sm font-bold">Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Purchase
          </button>
        </div>
      </form>
    </div>
  );
};

export default Buy;
