import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    mobile: '',
    email: '',
    username: '',
    password: '',
    confirmpassword: ''
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error message when the user starts typing again
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.password !== formData.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match";
    }
    if (formData.fullname.length < 10) {
      newErrors.fullname = "Full name should be atleast 10 characters long";
    }
    if (!/^[789]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number should be 10 digits and start with 7, 8, or 9";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long and include a mix of uppercase and lowercase letters, numbers, and special characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('https://backend-qmjl.onrender.com/signup', formData);
      alert(response.data.message);
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error signing up');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <h2 className="mb-6 text-3xl font-semibold text-gray-700">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="fullname" 
            placeholder="Full Name" 
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
          />
          {errors.fullname && <p className="text-red-500">{errors.fullname}</p>}
          <input 
            type="text" 
            name="mobile" 
            placeholder="Mobile" 
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
          />
          {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <input 
            type="password" 
            name="confirmpassword" 
            placeholder="Confirm Password" 
            onChange={handleChange} 
            required 
            className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
          />
          {errors.confirmpassword && <p className="text-red-500">{errors.confirmpassword}</p>}
          <button type="submit" className="w-full px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">Register</button>
        </form>
        <p className="mt-4 text-gray-600">
          Already registered? 
          <button 
            onClick={() => navigate('/login')} 
            className="ml-1 text-blue-500 underline hover:text-blue-700"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
