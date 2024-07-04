import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

const UserAnalytics = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend-qmjl.onrender.com/userss'); // Replace with your backend URL
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const countOccurrences = (array) => {
    return array.reduce((acc, val) => {
      acc[val] = acc[val] ? acc[val] + 1 : 1;
      return acc;
    }, {});
  };

  const prepareUserRoleChartData = () => {
    const roles = userData.reduce((acc, user) => {
      acc[user.role] = acc[user.role] ? acc[user.role] + 1 : 1;
      return acc;
    }, {});

    const data = {
      labels: ['admin', 'user'], // Fixed labels for 'admin' and 'user'
      datasets: [
        {
          label: 'User Roles',
          data: [
            roles['admin'] || 0,
            roles['user'] || 0,
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)', // Red for 'admin'
            'rgba(54, 162, 235, 0.6)', // Blue for 'user'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return data;
  };

  const prepareUserRegistrationChartData = () => {
    // Assuming createdAt is the field containing registration dates
    const registrations = userData.map(user => ({
      date: new Date(user.createdAt).toLocaleDateString(),
    }));

    const registrationCounts = registrations.reduce((acc, reg) => {
      const date = reg.date;
      acc[date] = acc[date] ? acc[date] + 1 : 1;
      return acc;
    }, {});

    const sortedDates = Object.keys(registrationCounts).sort((a, b) => new Date(a) - new Date(b));

    const data = {
      labels: sortedDates,
      datasets: [
        {
          label: 'User Registrations',
          data: sortedDates.map(date => registrationCounts[date]),
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1,
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
        <h2 className="text-2xl font-bold mb-4">User Roles (Doughnut Chart)</h2>
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
          <Doughnut data={prepareUserRoleChartData()} />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">User Registration Trend (Line Chart)</h2>
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
          <Line data={prepareUserRegistrationChartData()} options={options} />
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;
