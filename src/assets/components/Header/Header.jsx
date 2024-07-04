import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaUserAlt, FaSignInAlt } from 'react-icons/fa';

const Header = ({ hideNavbar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`bg-gray-800 shadow-lg ${hideNavbar ? 'hidden' : 'block'} sticky top-0 z-20`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Hamburger Icon */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-white text-lg font-bold font-cursive ml-24 ">
              ExploreSphere
            </NavLink>
          </div>

          {/* Navigation Links - Mobile */}
          <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-16 left-0 w-full bg-gray-800`}>
            <div className="flex flex-col space-y-1 mt-2">
              <NavLink
                to="/home"
                exact
                activeClassName="text-white"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                onClick={toggleMenu}
              >
                <FaHome className="mr-1" />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/blogs"
                activeClassName="text-white"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                onClick={toggleMenu}
              >
                <FaMapMarkerAlt className="mr-1" />
                <span>Blogs</span>
              </NavLink>
              <NavLink
                to="/Feedback"
                activeClassName="text-white"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                onClick={toggleMenu}
              >
                <FaUserAlt className="mr-1" />
                <span>Feedback</span>
              </NavLink>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <NavLink
                to="/home"
                exact
                activeClassName="text-white"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <FaHome className="mr-1" />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/blogs"
                activeClassName="text-white"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <FaMapMarkerAlt className="mr-1" />
                <span>Blogs</span>
              </NavLink>
              <NavLink
                to="/Feedback"
                activeClassName="text-white"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <FaUserAlt className="mr-1" />
                <span>Feedback</span>
              </NavLink>
            </div>
          </div>

          {/* Login Button */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <NavLink
              to="/login"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
              activeClassName="text-white"
            >
              <FaSignInAlt className="mr-1" />
              <span>Login</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
