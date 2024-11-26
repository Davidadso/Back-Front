export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function createCategories(categoriesData: any) {
  try {
    const res = await fetch(`${BACKEND_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoriesData),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getCategories(): Promise<any> {
  try {
    const data = await fetch(`${BACKEND_URL}/categories`, {
      cache: "no-store",
    });
    return await data.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getCategoric(id: string) {
  try {
    const data = await fetch(`${BACKEND_URL}/categories/${id}`, {
      cache: "no-store",
    });
    return await data.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function deleteCategories(id: string) {
  const res = await fetch(`${BACKEND_URL}/categories/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}

export async function updateCategories(id: string, newCategories: any) {
  const res = await fetch(`${BACKEND_URL}/categories/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategories),
    cache: "no-store",
  });
  return await res.json();
}
