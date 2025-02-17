"use client"
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { registerUser } from '../component/register-login-api';

export function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [error, setError] = useState('');
  const [roles, setRoles] = useState([]);
  const router = useRouter();

  // Obtener los roles al cargar el componente
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/roles`);
        const data = await response.json();
        setRoles(data); // Establecer los roles obtenidos en el estado
      } catch (error) {
        setError('No se pudieron cargar los roles.');
      }
    };
    fetchRoles();
  }, []);

  // Manejo del envío del formulario
  const onSubmit = handleSubmit(async (data) => {
    try {
      data.idRol = parseInt(data.idRol, 10);
      await registerUser(data);
      router.push('/');
    } catch (error) {
      setError(error.message || 'Hubo un error en el registro.');
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Mostrar errores globales */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Nombre de Usuario */}
      <div>
        <Label htmlFor="userName">Nombre de Usuario</Label>
        <Input
          id="userName"
          {...register('userName', { required: 'El nombre de usuario es obligatorio' })}
        />
        {errors.userName && <p className="text-red-500">{errors.userName.message}</p>}
      </div>

      {/* Correo Electrónico */}
      <div>
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          type="email"
          {...register('email', { 
            required: 'El correo electrónico es obligatorio', 
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Correo electrónico no válido',
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
          {...register('password', { 
            required: 'La contraseña es obligatoria', 
            minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
          })}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      {/* Confirmar Contraseña */}
      <div>
        <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword', { 
            required: 'Por favor confirma tu contraseña', 
            validate: value => value === watch('password') || 'Las contraseñas no coinciden'  // Usamos 'watch' correctamente aquí
          })}
        />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
      </div>

      {/* Seleccionar Rol */}
      <div>
        <Label htmlFor="role">Rol</Label>
        <select
          id="role"
          {...register('idRol', { required: 'El rol es obligatorio' })}
        >
          {roles.length > 0 ? (
            roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))
          ) : (
            <option value="">Cargando roles...</option>
          )}
        </select>
        {errors.idRol && <p className="text-red-500">{errors.idRol.message}</p>}
      </div>

      {/* Botón de Enviar */}
      <div>
        <Button type="submit">Registrar</Button>
      </div>
    </form>
  );
}
