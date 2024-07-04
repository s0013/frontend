import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './../Header/Header'; // Assuming Header component is in the same directory as Layout
import Routers from "../../../router/Routers";
import Footer from './../Footer/Footers'; // Assuming Footer component is in the same directory as Layout

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Header hideNavbar={location.pathname.includes('UserPage') || location.pathname.includes('AdminPage') || location.pathname.includes('adminPage') || location.pathname.includes('ViewDetails') || location.pathname.includes('wishlist')|| location.pathname.includes('AddBook') ||location.pathname.includes('EnquiryDetails') || location.pathname.includes('Purchases') || location.pathname.includes('Analytics')} />
      <Routers />
      <Footer />
    </>
  );
};

export default Layout;
