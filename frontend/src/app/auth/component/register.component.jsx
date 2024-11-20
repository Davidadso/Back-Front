"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const RegisterForm = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id_rol, setIdRol] = useState(2); 
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/auth/register', {
        userName,
        email,
        password,
        id_rol,
      });

      
      router.push('/login');
    } catch (error) {
      setError('Error al registrar el usuario. Intenta de nuevo.');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de usuario</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rol</label>
          <select value={id_rol} onChange={(e) => setIdRol(Number(e.target.value))}>
            <option value={2}>Usuario</option>
            <option value={1}>Administrador</option>
          </select>
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterForm;
