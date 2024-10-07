import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SheetDemo } from "@/components/sidebar-components";

export const dynamic = "force-dynamic";

async function HomePage() {
  return (
    <>
      <div className="flex">
        <div className="flex items-center h-screen">
          <SheetDemo />
        </div>

        <div className="flex-1 p-4">
          <div className="flex justify-between mb-4">
            <h1 className="text-4xl font-bold">Proveedores</h1>
            <div className="flex space-x-4">
              <Link href="#" className={buttonVariants()}>
                Listar Proveedores
              </Link>
              <Link href="/supplier/new/" className={buttonVariants()}>
                Crear Proveedores
              </Link>
            </div>
          </div>

          {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {products.map((product: UserDto) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
}

export default HomePage;
