// Modal.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose, book }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const buyBook = () => {
    navigate('/buy', { state: { book } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <button onClick={onClose} className="text-right text-gray-700 mb-4">
          &times;
        </button>
        {book && (
          <div className="mt-2 text-center">
            <img
              src={book.authors.imageurl}
              alt={book.authors.bookname}
              className="w-32 h-48 object-cover mb-4 mx-auto rounded-md border border-gray-300 shadow-md"
            />
            <p className="text-gray-600 font-semibold">Publisher Name: {book.publishername}</p>
            <p className="text-gray-600 font-semibold">Book Name: {book.authors.bookname}</p>
            <p className="text-gray-600 font-semibold">Author: {book.authors.author}</p>
            <p className="text-gray-600 font-semibold">Price: ${book.authors.price}</p>
            <p className="text-gray-700 mt-4">{book.authors.description}</p>
            <button
              onClick={buyBook}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-4"
            >
              Buy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;