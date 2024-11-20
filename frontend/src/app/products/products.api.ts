export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getProducts(): Promise<any> {
  try {
    const data = await fetch(`${BACKEND_URL}/products`, {
      cache: "no-store",
    });
    return await data.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProduct(id: string) {
  try {
    const data = await fetch(`${BACKEND_URL}/products/${id}`, {
      cache: "no-store",
    });
    return await data.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createProduct(productData: any) {
  try {
    const res = await fetch(`${BACKEND_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function deleteProduct(id: string) {
  const res = await fetch(`${BACKEND_URL}/products/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}

export async function updateProduct(id: string, newProduct: any) {
  const res = await fetch(`${BACKEND_URL}/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
    cache: "no-store",
  });
  return await res.json();
}

export async function SearchProduct(query: string) {
  try {
    const res = await fetch(
      `${BACKEND_URL}/products/search?query=${query}`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error al buscar productos: ${error}`);
    return []; 
  }
}
