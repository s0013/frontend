import React, { useState, useEffect } from 'react';
import Back from './Back';

function Purchases() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetch('https://backend-qmjl.onrender.com/purchases') // Assuming your backend is running on port 3000
      .then(response => response.json())
      .then(data => setPurchases(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="container mx-auto mt-4">
      <Back />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded my-6">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Book Name</th>
              <th className="py-3 px-6 text-left">Author</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">Number of Copies</th>
              <th className="py-3 px-6 text-left">Total Price</th>
              <th className="py-3 px-6 text-left">Purchase Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {purchases.map(purchase => (
              <tr key={purchase._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{purchase.username}</td>
                <td className="py-3 px-6 text-left">{purchase.book.bookname}</td>
                <td className="py-3 px-6 text-left">{purchase.book.author}</td>
                <td className="py-3 px-6 text-left">${purchase.book.price}</td>
                <td className="py-3 px-6 text-left">{purchase.address}</td>
                <td className="py-3 px-6 text-left">{purchase.numCopies}</td>
                <td className="py-3 px-6 text-left">${purchase.totalPrice.toFixed(2)}</td>
                <td className="py-3 px-6 text-left">{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Purchases;
