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
import { deleteSupplier } from "../supplier.api";
import { ViewSupplier } from "./view-component";
import { SupplierForm } from "../new/supplier-form";
import { useState } from "react";

export function SupplierCard({ supplier }: any) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false); 

  async function handleRemoveSupplier(id: string) {
    await deleteSupplier(id);
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          {supplier.name}
          <span className="text-sm font-bold text-gray-500">{supplier.id}</span>
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
                  <SupplierForm supplier={supplier} key={supplier.id} />
                ) : (
                  <ViewSupplier supplier={supplier} key={supplier.id} />
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
            handleRemoveSupplier(supplier.id);
          }}
        >
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
}
