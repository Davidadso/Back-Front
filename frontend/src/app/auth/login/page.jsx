import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./login-form";
import React from "react";

function LoginPage() {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          
        </Card>
      </div>
    </>
  );
}

export default LoginPage;
