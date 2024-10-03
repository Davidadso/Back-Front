import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getProducts } from "./products/products.api";
import { ProductCard } from "@/components/product-card";
import { UserDto } from "@/app/products/dto/create-product.dto";

export const dynamic = "force-dynamic";

async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">NextNestApp</h1>

        <Link href="/products/List" className={buttonVariants()}>
          {" "}
          Listar Datos
        </Link>

        <Link href="/products/new" className={buttonVariants()}>
          Create Product
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 container mx-auto pt-10">
        {products.map((product: UserDto) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
}
export default HomePage;
