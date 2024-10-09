import React from "react";
import { getProducts } from "../products.api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserDto } from "../dto/create-product.dto";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductForm } from "../new/product-form";
import { SearchComponent } from "../../../components/search-component";
import { ViewProduct } from "./view-component";
async function PageList() {
  const products = await getProducts();

  return (
    <>
      <div>
        <h1>Listar</h1>
        <SearchComponent />
      </div>
      <Table className="">
        <TableCaption>Lista de productos Creados </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Stock</TableHead>

            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: UserDto) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>

              <TableCell className="text-right">
                {/* aquí esta como un model para el ver */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-2 ml-5">Ver</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                      <DialogDescription>
                        <ViewProduct product={product} key={product.id} />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                {/* aquí esta como un model para el editar */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="ml-5">Modificar</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Editar {product.name} - ID: {product.id}{" "}
                      </DialogTitle>
                      <DialogDescription>
                        <ProductForm product={product} key={product.id} />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default PageList;
