import { BASE_URL } from "../../../app/config";

export const addItemToCart = async ({ id, quantity, token }) => {
  const response = await fetch(`${BASE_URL}/cart/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ vinylId: id, quantity }),
  });

  if (!response.ok) {
    const errData = await response.json();
    const error = new Error(errData.message || "Failed to add item to cart");
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return data;
};

export const getMyCart = async (token) => {
  const response = await fetch(`${BASE_URL}/cart/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errData = await response.json();
    const error = new Error(errData.message || "Failed to get cart");
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return data;
};

export const createCheckoutSession = async (token) => {
  const response = await fetch(`${BASE_URL}/order/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message || "Errore durante il checkout");
  }

  return await response.json();
};

export const confirmPayment = async (sessionId, token) => {
  const response = await fetch(
    `${BASE_URL}/order/confirm?sessionId=${sessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(
      errData.message || "Errore durante la conferma del pagamento",
    );
  }

  return await response.json();
};
