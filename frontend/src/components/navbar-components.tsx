"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaCog, FaShoppingCart } from "react-icons/fa";
import "./NavbarComponents.css";
import { SheetDemo } from "./sidebar-components";

const NavbarComponents = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }

    const storedCartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );
    setCartItems(storedCartItems);

    const handleStorageChange = () => {
      const updatedCartItems = JSON.parse(
        localStorage.getItem("cartItems") || "[]"
      );
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

  const handleCartUpdate = (updatedCartItems: any[]) => {
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  return (
    <nav>
      <div className="navbar">
        <div className="navbar-logo">
          <Link href="/">Inicio</Link>
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link className="navbar-link" href="/products">
              Catálogo
            </Link>
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
              <li className="navbar-item">{userName}</li>
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
              <Link className="navbar-link" href="/auth/login">
                Iniciar Sesión
              </Link>
            </li>
          )}
          <li className="navbar-item">
            <div className="dropdown">
              <FaShoppingCart className="cart-icon" />
              <span>
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>{" "}
              {/* Contador de productos */}
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <Link href="/cart">Ver carrito</Link>
                  </li>
                  {/* Aquí pasamos cartItems al componente SheetDemo */}
                  <SheetDemo cartItems={cartItems} />
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
