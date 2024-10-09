import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SheetDemo } from "@/components/sidebar-components";
import {getCategories} from "./categories.api"
import {UserDto} from "./dto/create-categories.dto"
import { CategoriesCard } from ".//components/categories-card"

export const dynamic = "force-dynamic";

async function HomePage() {
  const categorías = await getCategories();
  return (
    <>
      <div className="flex">
        <div className="flex items-center h-screen">
          <SheetDemo />
        </div>

        <div className="flex-1 p-4">
          <div className="flex justify-between mb-4">
            <h1 className="text-4xl font-bold">Categorías</h1>
            <div className="flex space-x-4">
              <Link href="#" className={buttonVariants()}>
                Listar Categorías
              </Link>
              <Link href="/categories/new/" className={buttonVariants()}>
                Crear Categoría de Productos
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {categorías.map((categoría: UserDto) => (
              <CategoriesCard categoría={categoría} key={categoría.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
