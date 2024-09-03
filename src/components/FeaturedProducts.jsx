// src/components/FeaturedProducts.jsx
import React from 'react';
import './FeaturedProducts.css'; // Certifique-se de criar este arquivo para estilizar os FeaturedProducts

const FeaturedProducts = () => {
  // Aqui você pode adicionar a lógica para buscar produtos em destaque
  return (
    <section className="featured-products">
      <h2>Produtos em Destaque</h2>
      <div className="product-list">
        <div className="product">
          <img src="produto1.jpg" alt="Produto 1" />
          <h3>Produto 1</h3>
          <p>Descrição do produto 1</p>
          <button className="buy-button">Comprar</button>
        </div>
        <div className="product">
          <img src="produto2.jpg" alt="Produto 2" />
          <h3>Produto 2</h3>
          <p>Descrição do produto 2</p>
          <button className="buy-button">Comprar</button>
        </div>
        {/* Adicione mais produtos conforme necessário */}
      </div>
    </section>
  );
};

export default FeaturedProducts;
