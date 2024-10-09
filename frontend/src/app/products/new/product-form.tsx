"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { createProduct, updateProduct } from "../products.api";
import { useParams, useRouter } from "next/navigation";
import { getCategories } from "@/app/categories/categories.api";
import { useEffect, useState } from "react";

export function ProductForm({ product }: any) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: product?.name,
      description: product?.description,
      price: product?.price,
      stock: product?.stock,
      image: product?.image,
      categoryId: product?.categoryId || "", // Valor predeterminado
    },
  });

  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [categories, setCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      const categoriesData = await getCategories();
      setCategories(categoriesData);

    
      if (product?.categoryId) {
        const selectedCategory = categoriesData.find(cat => cat.id === product.categoryId);
        setSelectedCategoryName(selectedCategory ? selectedCategory.name : "Seleccionar Categoría");
      }
    }
    fetchCategories();
  }, [product]); 

  const onSubmit = handleSubmit(async (data) => {
    const productData = {
      ...data,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      categoryId: parseInt(data.categoryId),
    };

    if (product?.id) {
      await updateProduct(product.id, productData);
    } else if (params?.id) {
      await updateProduct(params.id, productData);
    } else {
      await createProduct(productData);
    }

    router.push("/products");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit}>
      <Label>Product Name</Label>
      <Input {...register("name")} />

      <Label>Description</Label>
      <Input {...register("description")} />

      <Label>Cuantos</Label>
      <Input {...register("stock")} />

      <Label>Price</Label>
      <Input {...register("price")} />

      <Label>Image</Label>
      <Input {...register("image")} />

      <Label>Categoría</Label>
      <select {...register("categoryId")} defaultValue={product?.categoryId || ""}>
        <option value="">{product?.categoryId ? selectedCategoryName : "Seleccionar Categoría"}</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <Button>
        {product.id || params.id ? "Update Product" : "Create Product"}
      </Button>
    </form>
  );
}
