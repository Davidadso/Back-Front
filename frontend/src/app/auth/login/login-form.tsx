"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { loginUser } from "../component/register-login-api";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const userData = await loginUser(data);

     
      localStorage.setItem("token", userData.token);
      localStorage.setItem("userName", userData.userName);

      
      router.push("/");
    } catch (error) {
      setError(error.message || "Error al iniciar sesión");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Mostrar errores globales */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Correo Electrónico */}
      <div>
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: "El correo electrónico es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Correo electrónico no válido",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      {/* Contraseña */}
      <div>
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          {...register("password", {
            required: "La contraseña es obligatoria",
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Botón de Enviar */}
      <div>
        <Button type="submit">Iniciar Sesión</Button>
      </div>

      <div className="text-center mt-4">
        <p>¿No tienes una cuenta?</p>
        <Button 
          type="button" 
          onClick={() => router.push("register")} 
          className="mt-2">
          Crear Cuenta
        </Button>
      </div>
    </form>
  );
}
