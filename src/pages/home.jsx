// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header';
import FeaturedProducts from '../components/Featuredproducts';
import Footer from '../components/Footer';
import '../styles/Home.css'; // Certifique-se de criar este arquivo para estilizar a página Home

const Home = () => {
  return (
    <div className="home">
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Home;
