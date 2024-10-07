"use client"
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm} from "react-hook-form";
import {createCategories} from "../categories.api"
import {useRouter} from "next/navigation";

export function CategoriesForm() {
  const { register, handleSubmit } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    await createCategories(data)
    console.log(data);
    router.refresh();
    router.push("/categories")
  });
 
  

  return (
    <form onSubmit={onSubmit}>
      <Label>Categories</Label>
      <Input {...register("name")} />
      <Label>Description</Label>
      <Input {...register("description")} />
      <Button>Enviar</Button>
    </form>
  );
}

