import React from 'react';

import '../styles/Home.css';
import Header from '../components/header';
import HeroSection from '../components/herosection';
import FeaturedProducts from '../components/featuredproducts';
import Footer from '../components/footer';

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
