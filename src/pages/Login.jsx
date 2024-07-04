import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backend-qmjl.onrender.com/login', formData);
      alert(response.data.message);
      if (response.status === 200) {
        const { role, username } = response.data.user; // Assuming the user role and username are returned from the backend
        localStorage.setItem('username', username); // Store the username in local storage
        if (role === 'admin') {
          navigate('/AdminPage'); // Redirect to the admin page
        } else {
          navigate('/UserPage'); // Redirect to the user page
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="mb-4 text-2xl font-semibold text-gray-700">Login</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded shadow-md">
        <div className="mb-4">
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit" className="w-full px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">Login</button>
      </form>
      <p className="mt-4 text-gray-600">
        Not registered? 
        <button 
          onClick={() => navigate('/signup')} 
          className="ml-1 text-blue-500 underline hover:text-blue-700"
        >
          Register here
        </button>
      </p>
    </div>
  );
};

export default Login;
