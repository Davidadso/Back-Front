import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import  {RegisterForm} from "./register-form"

import React from "react";

function HomePage() {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent>
          <RegisterForm/>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default HomePage;
