import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Back from './Back';

const Wishlist = () => {
  const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
  const navigate = useNavigate();

  const removeFromWishlist = (index) => {
    const updatedWishlist = wishlistItems.filter((item, i) => i !== index);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.location.reload();
  };

  const handleBuy = (item) => {
    navigate('/buy', { state: { book: item } });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Wishlist</h1>
      <Back />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 mb-4">
        {wishlistItems.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          wishlistItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg px-4 py-4 flex flex-col items-center transform transition-transform hover:scale-105 hover:shadow-xl relative"
            >
              {item.authors && (
                <>
                  <button
                    className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full"
                    onClick={() => removeFromWishlist(index)}
                  >
                    <RiDeleteBinLine />
                  </button>
                  <img
                    src={item.authors.imageurl}
                    alt={item.authors.bookname}
                    className="w-32 h-48 object-cover mb-2 rounded-md border border-gray-300 shadow-md"
                  />
                  <div className="mb-2 text-center">
                    <p className="text-gray-600 font-semibold">Book Name: {item.authors.bookname}</p>
                    <p className="text-gray-600 font-semibold">Author: {item.authors.author}</p>
                    <p className="text-gray-700 font-semibold">${item.authors.price}</p>
                  </div>
                  <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => handleBuy(item)}
                  >
                    Buy
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
