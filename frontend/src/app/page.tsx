import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SheetDemo } from "@/components/sidebar-components";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getProducts } from "./products/products.api";
import { getCategoric } from "@/app/categories/categories.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavbarComponents from "@/components/navbar-components";

export const dynamic = "force-dynamic";

async function HomePage() {
  const productos = await getProducts();

  // Componente de Producto
  const renderProductCard = async (producto) => {
    const categoric = await getCategoric(producto.categoryId);
    return (
      <CarouselItem key={producto.id}>
        <div className="flex justify-center items-center h-screen">
          <Card className="bg-black border border-blue-500 text-white shadow-lg transition-transform transform hover:scale-105">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Product Detail: {producto.id}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <h1 className="text-xl font-bold mb-2">{producto.name}</h1>
              <p className="text-center mb-2">{producto.description}</p>
              <p className="text-lg font-semibold mb-2">${producto.price}</p>
              <img
                src={producto.image}
                alt={producto.name}
                className="w-full h-64 object-cover mb-4"
              />
              <h2 className="font-semibold mb-1">
                <b>Cuantos:</b> {producto.stock}
              </h2>
              <p className="text-gray-500">
                <b>Categoría:</b> {categoric.name}
              </p>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    );
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <div className="flex items-left h-screen">
          <SheetDemo />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          {/* Header */}
          <div className="flex justify-between mb-4">
            <h1 className="text-4xl font-bold">NextNestApp</h1>
            <NavbarComponents />
          </div>

          {/* Products Section */}
          <div className="bg-black rounded-lg p-6">
            <div className="flex justify-center mt-12 mb-6">
              <h1 className="text-4xl text-white font-bold">Productos</h1>
            </div>
            <Carousel>
              <CarouselContent>
                {await Promise.all(productos.map(renderProductCard))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
