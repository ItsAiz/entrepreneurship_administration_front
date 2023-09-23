import { api } from ".";

export async function login(formData) {
  try {
    const response = await fetch(`${api}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.status) {
      console.log(response.status);
      const data = await response.json();
      return data;
    } else {
      throw new Error("Usuario no registrado");
    }
  } catch (error) {
    throw new Error(`Hubo un error en la solicitud: ${error.message}`);
  }
}
