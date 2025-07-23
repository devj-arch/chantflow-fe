import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet } from 'react-router-dom';
import './Layout.css'

const Layout = () => {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="page-content">
        <Outlet /> {/* Renders whatever child route matches */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
