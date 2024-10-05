import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";
import { CategoriesForm } from "./categories-form";



function HomePage() {
  return (
    <>
      <div>
        <Card>
            <CardHeader>
                <CardTitle>
                    formulario
                </CardTitle>
            </CardHeader>
            <CardContent>
            <CategoriesForm/>
            </CardContent>
        </Card>
      </div>
    </>
  );
}

export default HomePage;
