import React from "react";
import "./footer.css"; // Para los estilos de CSS

function FooterComponent() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">© 2024 Mi Página Web</p>
        <div className="footer-links">
          <a href="#about" className="footer-link">Acerca de</a>
          <a href="#contact" className="footer-link">Contacto</a>
          <a href="#privacy" className="footer-link">Privacidad</a>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
