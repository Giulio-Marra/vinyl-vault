import { BASE_URL } from "../../../app/config";

export async function loginService({ email, password }) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errData = await response.json();
    const error = new Error(errData.message || "Login failed");
    error.status = response.status;
    throw error;
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
    const error = new Error(errData.message || "Registration failed");
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return data;
}

export async function getMyProfile(token) {
  const response = await fetch(`${BASE_URL}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errData = await response.json();
    const error = new Error(errData.message || "Failed to fetch profile");
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return data;
}
