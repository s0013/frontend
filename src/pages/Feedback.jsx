import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Send POST request to /feedback endpoint
      await axios.post('https://backend-qmjl.onrender.com/feedback', {
        name,
        email,
        mobileNo,
        message
      });

      // Reset form fields and display feedback
      setName('');
      setEmail('');
      setMobileNo('');
      setMessage('');
      setFeedbackSubmitted(true);
    } catch (error) {
      setError('Failed to submit feedback. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Use useEffect to navigate after 5 seconds when feedbackSubmitted becomes true
  useEffect(() => {
    let timeout;
    if (feedbackSubmitted) {
      timeout = setTimeout(() => {
        // Navigate to home page or another route
        window.location.href = '/home'; // Replace '/' with your desired route
      }, 3000); // 5000 milliseconds = 5 seconds
    }

    return () => clearTimeout(timeout); // Clean up the timeout on unmount or re-render
  }, [feedbackSubmitted]);

  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-8 rounded-md mt-4 mb-4">
      <h2 className="text-xl font-bold mb-4 font-cursive text-center ">Feedback Form</h2>
      {feedbackSubmitted ? (
        <p className="text-green-500 text-lg font-cursive text-center">Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mobile Number:</label>
            <input
              type="text"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Feedback;
