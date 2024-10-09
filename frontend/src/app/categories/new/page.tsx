import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";
import { CategoriesForm } from "./categories-form";

function HomePage() {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Card>
          <CardHeader>
            <CardTitle>Creación de las Categorías</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoriesForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default HomePage;
