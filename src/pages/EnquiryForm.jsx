import React, { useState } from 'react';
import axios from 'axios';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    query: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://backend-qmjl.onrender.com/enquiry', formData);
      alert('Enquiry submitted successfully!');
      setFormData({ name: '', email: '', mobile: '', query: '' });
    } catch (error) {
      alert('Failed to submit enquiry');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className=" h-42 bg-cover bg-center" style={{ 
      backgroundImage: `url('https://png.pngtree.com/background/20210710/original/pngtree-netted-document-background-material-picture-image_1033915.jpg')`,
      
    }}>
           <h1 className="text-3xl font-bold mb-6 font-cursive text-center">Submit Your Query Here!!</h1>
      <div className="flex justify-center items-center h-full">
    
      <div className="bg-black bg-opacity-50 backdrop-blur-md p-8 rounded shadow-md w-96 mt-2 mb-2">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Your Mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
              required
            />
            <textarea
              name="query"
              placeholder="Your Query"
              value={formData.query}
              onChange={handleChange}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
             className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-300 hover:text-black transition-colors duration-300">
            
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;
