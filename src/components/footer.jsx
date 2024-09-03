// src/components/Footer.jsx
import React from 'react';
import '../styles/Footer.css'; // Certifique-se de criar este arquivo para estilizar o Footer

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Minha Loja. Todos os direitos reservados.</p>
      <nav className="footer-nav">
        <a href="/privacidade">Política de Privacidade</a>
        <a href="/termos">Termos de Serviço</a>
      </nav>
    </footer>
  );
};

export default Footer;
