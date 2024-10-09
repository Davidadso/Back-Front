import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SheetDemo } from "@/components/sidebar-components";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getProducts } from "./products/products.api";
import { getCategoric } from "@/app/categories/categories.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export const dynamic = "force-dynamic";

async function HomePage() {
  const productos = await getProducts();
  const categoric = await getCategoric(productos.categoryId);

  return (
    <>
      <div className="flex">
        <div className="flex items-left h-screen">
          <SheetDemo />
        </div>

        <div className="flex-1 p-4">
          <div className="flex justify-between mb-4">
            <h1 className="text-4xl font-bold">NextNestApp</h1>
            <div className="flex space-x-4">
              <Link href="/supplier/" className={buttonVariants()}>
                Ver Proveedores
              </Link>
              <Link href="/categories/" className={buttonVariants()}>
                Ver Categorías
              </Link>
              <Link href="/products/" className={buttonVariants()}>
                Ver Productos
              </Link>
            </div>
          </div>

          <div>
            <div className="flex justify-center w-full mt-24">
              <h1>
                <b className="text-4xl ">Productos</b>
              </h1>
            </div>
            <Carousel>
              <CarouselContent>
                {await Promise.all(
                  productos.map(async (producto) => {
                    const categoric = await getCategoric(producto.categoryId);
                    return (
                      <CarouselItem key={producto.id}>
                        <div className="flex justify-center items-center h-screen">
                          <Card className="bg-black border border-blue-500 text-white">
                            <CardHeader>
                              <CardTitle className="flex justify-between items-center">
                                Product Detail: {producto.id}
                              </CardTitle>
                            </CardHeader>

                            <CardContent className="flex flex-col items-center">
                              <h1 className="text-xl font-bold mb-2">
                                {producto.name}
                              </h1>
                              <p className="text-center mb-2">
                                {producto.description}
                              </p>
                              <p className="text-lg font-semibold mb-2">
                                ${producto.price}
                              </p>
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
                        r
                      </CarouselItem>
                    );
                  })
                )}
              </CarouselContent>
            </Carousel>
          </div>

          <div>
            <div className="flex justify-center w-full mt-10">
              <h1>
                <b className="text-4xl ">Productos</b>
              </h1>
            </div>
            <Carousel>
              <CarouselContent>
                {productos.map((producto) => (
                  <CarouselItem key={producto.id}>
                    <div className="flex justify-center items-center h-screen">
                      <Card className="bg-black border border-blue-500 text-white">
                        <CardHeader>
                          <CardTitle className="flex justify-between items-center">
                            Product Detail: {producto.id}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="flex flex-col items-center">
                          <h1 className="text-xl font-bold mb-2">
                            {producto.name}
                          </h1>
                          <p className="text-center mb-2">
                            {producto.description}
                          </p>
                          <p className="text-lg font-semibold mb-2">
                            ${producto.price}
                          </p>
                          <img
                            src={producto.image}
                            alt={producto.name}
                            className="w-full h-64 object-cover mb-4"
                          />
                          <h2 className="font-semibold mb-1">
                            <b>Cuantos:</b> {producto.stock}
                          </h2>
                          <p className="text-lg font-semibold">
                            <b>Categoría:</b>
                            {producto.categoryId}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
