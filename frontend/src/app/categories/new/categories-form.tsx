"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { createCategories, updateCategories } from "../categories.api";
import { useRouter } from "next/navigation";
import { Description } from "@radix-ui/react-dialog";

export function CategoriesForm({ categoría }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: categoría?.name,
      description: categoría?.description,
    },
  });
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    if (categoría?.id) {
      const res = await updateCategories(categoría.id, data);
      console.log(res);
      router.refresh();
      router.push("/categories");
      router.refresh();
    } else {
      await createCategories(data);
      router.push("/categories");
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Label>Categories</Label>
      <Input {...register("name")} />
      <Label>Description</Label>
      <Input {...register("description")} />
      <Button>
        {categoría?.id ? "Actualizar Categoría" : "Crear Categoría"}
      </Button>
    </form>
  );
}
