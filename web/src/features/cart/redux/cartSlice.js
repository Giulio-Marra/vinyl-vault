import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cart");
const initialState = savedCart
  ? JSON.parse(savedCart)
  : { vinyl: [], total: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const existingItem = state.vinyl.find(
        (item) => item.product?.id === action.payload.id,
      );

      const quantityToAdd = action.payload.quantity || 1;
      const stock = action.payload.inStock;

      if (existingItem) {
        const newQuantity = Math.min(
          existingItem.quantity + quantityToAdd,
          stock,
        );
        state.total +=
          (newQuantity - existingItem.quantity) * action.payload.price;
        existingItem.quantity = newQuantity;
      } else {
        const qty = Math.min(quantityToAdd, stock);
        state.vinyl.push({ product: action.payload, quantity: qty });
        state.total += qty * action.payload.price;
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeProduct(state, action) {
      const item = state.vinyl.find((v) => v.product.id === action.payload);
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.vinyl = state.vinyl.filter(
          (v) => v.product.id !== action.payload,
        );
      }

      state.total -= item.product.price;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart(state) {
      state.vinyl = [];
      state.total = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
export const cartReducer = cartSlice.reducer;
