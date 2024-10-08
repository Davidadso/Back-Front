import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ViewSupplier({ supplier }: any) {
  console.log(supplier);

  return (
    <div className="flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            {supplier.name} - ID: {supplier.id}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex justify-between items-center">
          <h1>{supplier.contactInfo}</h1>
        </CardContent>
      </Card>
    </div>
  );
}
