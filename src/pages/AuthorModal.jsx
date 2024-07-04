import React from 'react';

const AuthorModal = ({ author, closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden max-w-lg w-full">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{author.name}</h2>
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={closeModal}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={author.photoUrl}
              alt={author.name}
              className="w-32 h-32 rounded-full object-cover mr-4"
            />
            <p className="text-center">{author.info}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorModal;
