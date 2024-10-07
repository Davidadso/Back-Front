export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function createCategories(supplierData: any) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/supplier`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplierData),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getSuppliers(): Promise<any> {
  try {
    const data = await fetch(`${BACKEND_URL}/api/supplier`, {
      cache: "no-store",
    });
    return await data.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getSupplier(id: string) {
  try {
    const data = await fetch(`${BACKEND_URL}/api/supplier/${id}`, {
      cache: "no-store",
    });
    return await data.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function deleteSupplier(id: string) {
  const res = await fetch(`${BACKEND_URL}/api/supplier/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}

export async function updateSupplier(id: string, newSupplier: any) {
  const res = await fetch(`${BACKEND_URL}/api/supplier/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSupplier),
    cache: "no-store",
  });
  return await res.json();
}
