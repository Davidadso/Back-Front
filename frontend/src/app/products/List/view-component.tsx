import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategoric } from "@/app/categories/categories.api";
export async function ViewProduct({ product }: any) {
  console.log(product);
  const categoric = await getCategoric(product.categoryId);
  return (
    <div className="flex justify-center items-center ">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Nombre: {product.name} - {product.id}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-2">{product.description}</p>

          <img
            src={product.image}
            alt=""
            className="w-full h-64 object-cover mb-4"
          />
          <h2 className="font-semibold mb-1">
            <b>Cuantos:</b> {product.stock}
          </h2>
          <p className="text-lg font-semibold mb-2 text-center">
            ${product.price}
          </p>
          <p className="text-gray-500">
            <b>Categoría:</b> {categoric.name}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
