import { setCartCount, setCartError, setCartLoading } from "./cartActions";
import { addItemToCart, getMyCart } from "./cartService";

export const fetchCartCount = (token) => async (dispatch) => {
  try {
    dispatch(setCartLoading(true));
    dispatch(setCartError(null));

    const data = await getMyCart(token);
    const totalQuantity = data.items.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    dispatch(setCartCount(totalQuantity));
  } catch (error) {
    dispatch(setCartError(error.message));
  } finally {
    dispatch(setCartLoading(false));
  }
};

export const addToCart =
  ({ id, quantity, token }) =>
  async (dispatch) => {
    try {
      dispatch(setCartLoading(true));
      dispatch(setCartError(null));

      await addItemToCart({ id, quantity, token });

      const updatedCart = await getMyCart(token);
      const totalQuantity = updatedCart.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );

      dispatch(setCartCount(totalQuantity));
    } catch (error) {
      dispatch(setCartError(error.message));
    } finally {
      dispatch(setCartLoading(false));
    }
  };
