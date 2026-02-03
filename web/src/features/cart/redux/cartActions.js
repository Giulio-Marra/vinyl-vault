export const SET_CART_COUNT = "SET_CART_COUNT";
export const SET_CART_LOADING = "SET_CART_LOADING";
export const SET_CART_ERROR = "SET_CART_ERROR";
export const CLEAR_CART = "CLEAR_CART";

export const setCartCount = (count) => ({
  type: SET_CART_COUNT,
  payload: count,
});

export const setCartLoading = (isLoading) => ({
  type: SET_CART_LOADING,
  payload: isLoading,
});

export const setCartError = (error) => ({
  type: SET_CART_ERROR,
  payload: error,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
