// src/pages/Home.jsx
import React from 'react';
import Header from '../components/header';
import HeroSection from '../components/herosection';
import FeaturedProducts from '../components/featuredproducts';
import Footer from '../components/footer';
import '../styles/Home.css'; // Certifique-se de criar este arquivo para estilizar a página Home

const home = () => {
  return (
    <div className="home">
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default home;
