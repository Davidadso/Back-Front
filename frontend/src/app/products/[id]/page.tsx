import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProduct } from "../products.api";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ProductCard } from "../components/product-card";
import { getCategoric } from "@/app/categories/categories.api";

interface Props {
  params: {
    id: string;
  };
}

async function ProductDetailPage({ params }: Props) {
  console.log(params);

  const product = await getProduct(params.id);

  const categoric = await getCategoric(product.categoryId);


  return (
    <div className="flex justify-center items-center h-screen">
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Product Detail: {product.id}
          <Link className={buttonVariants()} href="/products">
            Go back
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        <h1 className="text-xl font-bold mb-2">{product.name}</h1>
        <p className="text-center mb-2">{product.description}</p>
        <p className="text-lg font-semibold mb-2">${product.price}</p>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover mb-4"
        />
        <h2 className="font-semibold mb-1">
          <b>Cuantos:</b> {product.stock}
        </h2>
        <p className="text-gray-500">
          <b>Categoría:</b> {categoric.name}
        </p>
      </CardContent>
    </Card>
  </div>
  
  );
}

export default ProductDetailPage;
