import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* Renders whatever child route matches */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
