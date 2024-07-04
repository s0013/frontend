import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footers = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left">
          <p>&copy; 2024 Your Bookstore. All rights reserved.</p>
          <p className="mt-2">Created By Shraddha</p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-center md:text-left">Connect with us:</p>
          <div className="flex justify-center md:justify-start mt-2 space-x-4">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-gray-300 hover:text-white" size={24} />
            </a>
            <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-gray-300 hover:text-white" size={24} />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-gray-300 hover:text-white" size={24} />
            </a>
          </div>
        </div>
        <div className="mt-4 md:mt-0 text-center md:text-right">
          <p>1234 Bookstore Street, City, Country</p>
          <p>Email: contact@yourbookstore.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
