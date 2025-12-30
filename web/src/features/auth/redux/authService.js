import { BASE_URL } from "../../../app/config";

export async function loginService({ email, password }) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message || "Errore login");
  }

  const data = await response.json();
  return data.token;
}

export async function registerService({ username, email, password }) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message, "Problema con la registrazione");
  }

  const data = await response.json();
  return data;
}
