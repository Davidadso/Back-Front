import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ViewCategories({ categoría }: any) {
  console.log(categoría);

  return (
    <div className="flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            {categoría.name} - ID: {categoría.id}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex justify-between items-center">
          <h1>{categoría.description}</h1>
        </CardContent>
      </Card>
    </div>
  );
}
