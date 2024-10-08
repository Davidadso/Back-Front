import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getProducts } from "./products.api";
import { ProductCard } from "@/app/products/components/product-card";
import { UserDto } from "@/app/products/dto/create-product.dto";
import { SheetDemo } from "@/components/sidebar-components";

export const dynamic = "force-dynamic";

async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <div className="flex">
        <div className="flex items-center h-screen">
          <SheetDemo />
        </div>

        <div className="flex-1 p-4">
          <div className="flex justify-between mb-4">
            <h1 className="text-4xl font-bold">Productos</h1>
            <div className="flex space-x-4">
              <Link href="/products/List" className={buttonVariants()}>
                Listar Datos
              </Link>
              <Link href="/products/new" className={buttonVariants()}>
                Crear Producto
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {products.map((product: UserDto) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
