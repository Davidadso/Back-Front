import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";
import { SupplierForm } from "./supplier-form";



function HomePage() {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Card>
            <CardHeader>
                <CardTitle>
                    Creación de los Proveedores
                </CardTitle>
            </CardHeader>
            <CardContent>
            <SupplierForm/>
            </CardContent>
        </Card>
      </div>
    </>
  );
}

export default HomePage;
