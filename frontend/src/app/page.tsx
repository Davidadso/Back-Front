import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SheetDemo } from "@/components/sidebar-components";

export const dynamic = "force-dynamic";

async function HomePage() {

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
              <Link href="#" className={buttonVariants()}>
                Ver Categorias
              </Link>
              <Link href="/products/" className={buttonVariants()}>
                Ver Productos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
