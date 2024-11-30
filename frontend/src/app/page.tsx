import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
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
import FooterComponent from "@/components/footer-components";
import HeaderComponents from "../components/header-components";
export const dynamic = "force-dynamic";
import { ProductCard } from "../components/productscard";
import { UserDto } from "./products/dto/create-product.dto";

async function HomePage() {
  const productos = await getProducts();

  // Componente de Producto
  const renderProductCard = async (producto) => {
    const categoric = await getCategoric(producto.categoryId);
    return (
      <CarouselItem key={producto.id}>
        <div className="flex justify-center items-center ">
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
                className="w-64 h-48 object-cover mb-4"
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
        {/* Main Content */}
        <div className="flex-1 p-4">
          {/* Header */}
          <HeaderComponents />
          {/* Products Section */}
          <div className="bg-white rounded-lg p-6 border-">
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center mt-12 mb-6">
          <h1 className="text-4xl text-black font-bold">Productos</h1>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {productos.map((product: UserDto) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
      <div>
        <FooterComponent />
      </div>
    </>
  );
}

export default HomePage;
