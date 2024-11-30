"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ProductCard({ product, onCartUpdate }: any) {
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    const existingProductIndex = cartItems.findIndex((item: any) => item.id === product.id);
    if (existingProductIndex === -1) {
      cartItems.push({ ...product, quantity: 1 });
    } else {
      cartItems[existingProductIndex].quantity += 1;
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setAddedToCart(true);

    // Llamar a la función de actualización para notificar al componente padre
    onCartUpdate(cartItems);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          {product.name}
          <span className="text-sm font-bold text-gray-500">${product.price}</span>
        </CardTitle>
      </CardHeader>
      <div className="flex justify-center items-center w-full h-[150px]">
        <img src={product.image} alt={product.name} className="w-[250px] h-[150px] object-cover" />
      </div>
      <CardContent>
        <p><b>Cuantos:</b> {product.stock}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={handleAddToCart}
          disabled={addedToCart}
          className={`w-full ${addedToCart ? "bg-gray-500" : "bg-blue-500"}`}
        >
          {addedToCart ? "Agregado al Carrito" : "Agregar al Carrito"}
        </Button>
      </CardFooter>
    </Card>
  );
}
