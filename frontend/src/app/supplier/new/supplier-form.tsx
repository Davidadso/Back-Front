"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { createSupplier, updateSupplier } from "../supplier.api";
import { useRouter } from "next/navigation";

export function SupplierForm({ supplier }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: supplier?.name,
      contactInfo: supplier?.contactInfo,
    },
  });
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    if (supplier?.id) {
      const res = await updateSupplier(supplier.id, data);
      console.log(res);
      router.refresh();
      router.push("/supplier");
      router.refresh();
    } else {
      await createSupplier(data);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Label>Nombre de la Empresa</Label>
      <Input {...register("name")} />
      <Label>Contacto</Label>
      <Input {...register("contactInfo")} />
      <Button>{supplier.id ? "Actualizar Proveedor" : "Create Product"}</Button>
    </form>
  );
}
