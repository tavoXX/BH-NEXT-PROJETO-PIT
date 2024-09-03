// src/components/HeroSection.jsx
import React from 'react';
import './HeroSection.css'; // Certifique-se de criar este arquivo para estilizar a HeroSection

const herosection = () => {
  return (
    <section className="hero">
      <h1>Bem-vindo à Minha Loja</h1>
      <p>Encontre os melhores produtos aqui!</p>
      <button className="cta-button">Veja Nossos Produtos</button>
    </section>
  );
};

export default herosection;
