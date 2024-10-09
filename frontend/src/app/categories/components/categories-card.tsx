"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteCategories } from "../categories.api";
import { ViewCategories } from "./view-component";
import { CategoriesForm } from "../new/categories-form";
import { useState } from "react";

export function CategoriesCard({ categoría }: any) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false); 

  async function handleRemoveSupplier(id: string) {
    await deleteCategories(id);
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          {categoría.name}
          <span className="text-sm font-bold text-gray-500">{categoría.id}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger>
            <Button>Ver</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalles del Proveedor</DialogTitle>
              <DialogDescription>
                {isEditing ? (
                  <CategoriesForm categoría={categoría} key={categoría.id} />
                ) : (
                  <ViewCategories categoría={categoría} key={categoría.id} />
                )}
              </DialogDescription>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="ml-auto"
              >
                {isEditing ? "Cancelar" : "Editar"}
              </Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          className="mt-5"
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveSupplier(categoría.id);
          }}
        >
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
}
