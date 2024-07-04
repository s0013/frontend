import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navus';

const Boss = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://backend-qmjl.onrender.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleLogout = async () => {
    try {
      const username = localStorage.getItem('username');
      if (username) {
        const response = await axios.post('https://backend-qmjl.onrender.com/logout', { username });
        if (response.data.success) {
          console.log('Logout times saved:', response.data.logoutTimes);
          localStorage.removeItem('username');
        } else {
          console.error('Error during logout:', response.data.message);
        }
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      navigate('/home');
    }
  };

  const handleAddBook = () => {
    navigate('/AddBook');
  };

  const handleViewDetails = () => {
    navigate('/ViewDetails');
  };

  const handlePurchaseDetails = (userId) => {
    navigate('/Purchases');
  };

  const handleEnquiryDetails = () =>{
    navigate('/EnquiryDetails');
  };

  const handleAnalytics = () =>{
    navigate('/Analytics');
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar handleLogout={handleLogout} handleAddBook={handleAddBook} handleViewDetails={handleViewDetails} handlePurchaseDetails={handlePurchaseDetails} handleEnquiryDetails = {handleEnquiryDetails}  handleAnalytics = {handleAnalytics}  />
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border px-4 py-2">Full Name</th>
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Mobile No</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Login Date</th>
                <th className="border px-4 py-2">Login Time</th>
                <th className="border px-4 py-2">Logout Date</th>
                <th className="border px-4 py-2">Logout Time</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map(user => (
                <tr key={user._id} className="text-center">
                  <td className="border px-4 py-2">{user.fullname}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.mobile}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">
                    {(user.loginTimes || []).map((loginTime, index) => (
                      <div key={index}>{formatDate(loginTime)}</div>
                    ))}
                  </td>
                  <td className="border px-4 py-2">
                    {(user.loginTimes || []).map((loginTime, index) => (
                      <div key={index}>{formatTime(loginTime)}</div>
                    ))}
                  </td>
                  <td className="border px-4 py-2">
                    {(user.logoutTimes || []).map((logoutTime, index) => (
                      <div key={index}>{formatDate(logoutTime)}</div>
                    ))}
                  </td>
                  <td className="border px-4 py-2">
                    {(user.logoutTimes || []).map((logoutTime, index) => (
                      <div key={index}>{formatTime(logoutTime)}</div>
                    ))}
                  </td>
                  <td className="border px-4 py-2">
                    <button 
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => handleEdit(user._id)}>Edit</button>
                    <button 
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(user._id)}>Delete</button>
                  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boss;
