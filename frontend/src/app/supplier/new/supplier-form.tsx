"use client"
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm} from "react-hook-form";
import {createCategories} from "../supplier.api"
import {useRouter} from "next/navigation";

export function SupplierForm() {
  const { register, handleSubmit } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    await createCategories(data)
    console.log(data);
    router.refresh();
    router.push("/supplier")
  });
 
  

  return (
    <form onSubmit={onSubmit}>
      <Label>Nombre de la Empresa</Label>
      <Input {...register("name")} />
      <Label>Contacto</Label>
      <Input {...register("contactInfo")} />
      <Button>Enviar</Button>
    </form>
  );
}

