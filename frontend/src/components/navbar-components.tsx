"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaCog, FaShoppingCart } from "react-icons/fa"; // Importando los íconos de la tuerca y el carrito
import "./NavbarComponents.css";
import { SheetDemo } from "./sidebar-components";

const NavbarComponents = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]); // Para manejar los elementos del carrito

  // Cargar usuario y productos del carrito desde localStorage
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }

    const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(storedCartItems);

    // Escuchar cambios en localStorage
    const handleStorageChange = () => {
      const updatedUserName = localStorage.getItem("userName");
      if (updatedUserName) {
        setUserName(updatedUserName);
      } else {
        setUserName(null);
      }

      const updatedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      setCartItems(updatedCartItems);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
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
            <Link className="navbar-link" href="/products">Catalogo</Link>
          </li>
          <li className="navbar-item">
            <div className="dropdown">
              <Link className="navbar-link" href="/categories">
                ¿Qué necesitas?
              </Link>
              <div className="dropdown-content">
                <ul>
                  <li>Televisores</li>
                  <li>Celulares</li>
                  <li>Tablets</li>
                  <li>Relojes</li>
                  <li>Regalos</li>
                  <li>Accesorios</li>
                  <li>Electrodomésticos</li>
                </ul>
              </div>
            </div>
          </li>
          {userName ? (
            <>
              <li className="navbar-item">Bienvenido, {userName}</li>
              <li className="navbar-item">
                <div className="dropdown">
                  <FaCog className="settings-icon" />
                  <div className="dropdown-menu">
                    <ul>
                      <li>{userName}</li>
                      <li>Configuración</li>
                      <li onClick={handleLogout}>Cerrar Sesión</li>
                    </ul>
                  </div>
                </div>
              </li>
            </>
          ) : (
            <li className="navbar-item">
              <Link className="navbar-link" href="/auth/login">Iniciar Sesión</Link>
            </li>
          )}
          <li className="navbar-item">
            <div className="dropdown">
              <FaShoppingCart className="cart-icon" />
              <div className="dropdown-menu">
                <ul>
                  {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                      <li key={index}>{item.name}</li> // Aquí muestras el nombre de los productos del carrito
                    ))
                  ) : (
                    <li>No hay productos en el carrito</li>
                  )}
                  <li><Link href="/cart">Ver carrito</Link></li>
                  <li><SheetDemo /></li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarComponents;
