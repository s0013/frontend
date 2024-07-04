import React, { useState, useEffect } from 'react';
import {  Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';


const PurchaseAnalytics = () => {
  const [purchaseData, setPurchaseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend-qmjl.onrender.com/purchases'); // Replace with your backend URL
        setPurchaseData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  
  const prepareChartDataTopPurchasedBooks = () => {
    const books = {};
    purchaseData.forEach((purchase) => {
      const bookName = purchase.book.bookname;
      if (books[bookName]) {
        books[bookName] += purchase.numCopies;
      } else {
        books[bookName] = purchase.numCopies;
      }
    });

    const sortedBooks = Object.keys(books).sort((a, b) => books[b] - books[a]).slice(0, 5); // Top 5 purchased books

    const data = {
      labels: sortedBooks,
      datasets: [
        {
          label: 'Top Purchased Books',
          data: sortedBooks.map((book) => books[book]),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    return data;
  };


  const prepareChartDataPurchaseDistributionByUser = () => {
    const users = {};
    purchaseData.forEach((purchase) => {
      const username = purchase.username;
      if (users[username]) {
        users[username]++;
      } else {
        users[username] = 1;
      }
    });

    const data = {
      labels: Object.keys(users),
      datasets: [
        {
          label: 'Purchase Distribution by User',
          data: Object.values(users),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return data;
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Top Purchased Books (Bar Chart)</h2>
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
          <Bar data={prepareChartDataTopPurchasedBooks()} options={options} />
        </div>
      </div>


      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Purchase Distribution by User (Doughnut Chart)</h2>
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
          <Doughnut data={prepareChartDataPurchaseDistributionByUser()} />
        </div>
      </div>
    </div>
  );
};

export default PurchaseAnalytics;
