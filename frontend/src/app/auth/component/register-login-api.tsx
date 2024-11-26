export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function registerUser(userData: any) {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (res.ok) {
      if(data.token){
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.userName);
      }
      return data;
    } else {
      throw new Error(data.message || "Error en el registro");
    }
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw new Error(error.message || "Hubo un problema con la solicitud");
  }
}

export async function loginUser(credentials: any) {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (res.ok) {
      return data; 
    } else {
      throw new Error(data.message || "Credenciales incorrectas");
    }
  } catch (error) {
    console.error("Error al hacer login:", error);
    throw new Error(error.message || "Hubo un problema con la solicitud");
  }
}