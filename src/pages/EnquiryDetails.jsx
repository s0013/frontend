import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Back from './Back';

const EnquiryDetails = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    axios.get('https://backend-qmjl.onrender.com/enquires')
      .then(response => {
        setEnquiries(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  // Function to format date and time
  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateTimeString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mx-auto">
      <Back />
      <h1 className="text-2xl font-bold mb-4 font-cursive text-center bg-red-600 text-white">Enquiries</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Mobile</th>
              <th className="border border-gray-300 px-4 py-2">Query</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map(enquiry => (
              <tr key={enquiry._id}>
                <td className="border border-gray-300 px-4 py-2">{enquiry.name}</td>
                <td className="border border-gray-300 px-4 py-2">{enquiry.email}</td>
                <td className="border border-gray-300 px-4 py-2">{enquiry.mobile}</td>
                <td className="border border-gray-300 px-4 py-2">{enquiry.query}</td>
                <td className="border border-gray-300 px-4 py-2">{formatDateTime(enquiry.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquiryDetails;
