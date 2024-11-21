"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import "./NavbarComponents.css";

const NavbarComponents = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    // Eliminar el token y datos del usuario
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUserName(null);
  };

  return (
    <nav>
    <div className="navbar">
      <div className="navbar-logo">
        <Link href="/">Inicio</Link>
      </div>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link className="navbar-link" href="/products">Productos</Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" href="/categories">Categorías</Link>
        </li>
        {userName ? (
          <>
            <li className="navbar-item">Bienvenido, {userName}</li>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </>
        ) : (
          <li className="navbar-item">
            <Link className="navbar-link" href="/auth/login">Iniciar Sesión</Link>
          </li>
        )}
      </ul>
    </div>
  </nav>
  
  );
};

export default NavbarComponents;