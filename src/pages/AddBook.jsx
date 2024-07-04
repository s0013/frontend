import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Back from './Back';

const AddBook = () => {
  const [formData, setFormData] = useState({
    publishername: '',
    categories: '',
    bookname: '',
    author: '',
    imageurl: '',
    description: '',
    publisherdate: '',
    price: '',
    totalcopies: '',
    newarrival: false,
    availablecopies: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backend-qmjl.onrender.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Book details submitted successfully!');
        navigate('/home');
      } else {
        alert('Failed to submit book details.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Back />
      <h2 className="text-2xl font-bold mb-4">Enter Book Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium" htmlFor="publishername">Publisher Name:</label>
          <input className="w-full p-2 border border-gray-300 rounded" type="text" id="publishername" name="publishername" value={formData.publishername} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="categories">Category:</label>
          <input className="w-full p-2 border border-gray-300 rounded" type="text" id="categories" name="categories" value={formData.categories} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="bookname">Book Name:</label>
          <input className="w-full p-2 border border-gray-300 rounded" type="text" id="bookname" name="bookname" value={formData.bookname} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="author">Author:</label>
          <input className="w-full p-2 border border-gray-300 rounded" type="text" id="author" name="author" value={formData.author} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="imageurl">Image URL:</label>
          <input className="w-full p-2 border border-gray-300 rounded" type="text" id="imageurl" name="imageurl" value={formData.imageurl} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="description">Description:</label>
          <textarea className="w-full p-2 border border-gray-300 rounded" id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="publisherdate">Publisher Date:</label>
          <input className="w-full p-2 border border-gray-300 rounded" type="date" id="publisherdate" name="publisherdate" value={formData.publisherdate} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="price">Price:</label>
          <input className="w-full p-2 border border-gray-300 rounded" type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="totalcopies">Total Copies:</label>
          <input className="w-full p-2 border border-gray-300 rounded" type="number" id="totalcopies" name="totalcopies" value={formData.totalcopies} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="newarrival">New Arrival:</label>
          <input className="w-full p-2 border border-gray-300 rounded" type="checkbox" id="newarrival" name="newarrival" checked={formData.newarrival} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="availablecopies">Available Copies:</label>
          <input className="w-full p-2 border border-gray-300 rounded" type="number" id="availablecopies" name="availablecopies" value={formData.availablecopies} onChange={handleChange} required />
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBook;
