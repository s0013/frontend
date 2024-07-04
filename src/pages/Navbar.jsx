import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const Navbar = ({ username, handleLogout }) => {
  const [wishlistCount, setWishlistCount] = useState(0);

  // Fetch wishlist items from localStorage and update count
  useEffect(() => {
    const updateWishlistCount = () => {
      const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlistCount(wishlistItems.length);
    };

    // Listen for changes in localStorage
    window.addEventListener('storage', updateWishlistCount);

    // Initial count update
    updateWishlistCount();

    // Cleanup listener
    return () => {
      window.removeEventListener('storage', updateWishlistCount);
    };
  }, []);

  return (
    <nav className="bg-gray-800 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white font-bold text-lg">My Bookstore</Link>
          <div className="flex items-center">
            <span className="text-white mr-4 hidden sm:inline">Welcome, {username}</span>
            <Link to="/wishlist" className="text-white mr-4 relative">
              <FaHeart size={24} />
              {wishlistCount > 0 && (
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
