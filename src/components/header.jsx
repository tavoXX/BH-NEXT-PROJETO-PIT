// src/components/Header.jsx
import React from 'react';
import './Header.css'; // Certifique-se de criar este arquivo para estilizar o Header

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Minha Loja</div>
      <nav className="nav">
        <a href="/">Início</a>
        <a href="/produtos">Produtos</a>
        <a href="/sobre">Sobre</a>
        <a href="/contato">Contato</a>
      </nav>
    </header>
  );
};

export default Header;
