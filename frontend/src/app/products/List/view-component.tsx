import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ViewProduct({ product }:any) {
  console.log(product);

  return (
    <div className="flex justify-center items-center  ">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            Nombre: {product.name} - {product.id}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{product.description}</p>

          <img
            src={product.image}
            alt=""
            className="w-full h-64 object-cover"
          />
          <p>${product.price}</p>
        </CardContent>
      </Card>
    </div>
  );
}
