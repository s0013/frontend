import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line, Bubble } from 'react-chartjs-2';
import axios from 'axios';

const Show = () => {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend-qmjl.onrender.com/books'); // Replace with your backend URL
        setBooksData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const prepareChartDataBubble = () => {
    const data = {
      datasets: [{
        label: 'Price vs. Available Copies',
        data: booksData.map(book => ({
          x: book.authors.price,
          y: book.authors.availablecopies,
          r: 10 // Radius of the bubble
        })),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
      }]
    };

    return data;
  };

  const prepareChartDataPrices = () => {
    const prices = {};
    booksData.forEach((book) => {
      const price = book.authors.price;
      if (prices[price]) {
        prices[price]++;
      } else {
        prices[price] = 1;
      }
    });

    const sortedPrices = Object.keys(prices).sort((a, b) => a - b);

    const data = {
      labels: sortedPrices,
      datasets: [
        {
          label: 'Price Distribution',
          data: sortedPrices.map((price) => prices[price]),
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1,
        },
      ],
    };

    return data;
  };

  const prepareChartDataCategories = () => {
    const categories = {};
    booksData.forEach((book) => {
      const category = book.categories;
      if (categories[category]) {
        categories[category]++;
      } else {
        categories[category] = 1;
      }
    });

    const data = {
      labels: Object.keys(categories),
      datasets: [
        {
          label: 'Book Categories',
          data: Object.values(categories),
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
        <h2 className="text-2xl font-bold mb-4">Book Categories (Pie Chart)</h2>
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
          <Pie data={prepareChartDataCategories()} options={{ responsive: true }} width={400} height={300} />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Book Categories (Bar Chart)</h2>
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
          <Bar data={prepareChartDataCategories()} options={options} />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Price Distribution (Line Chart)</h2>
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
          <Line data={prepareChartDataPrices()} options={options} />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Price vs. Available Copies (Bubble Chart)</h2>
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
          <Bubble data={prepareChartDataBubble()} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Show;
