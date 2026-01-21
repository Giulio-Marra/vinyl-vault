import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/redux/authReducer";
import { cartReducer } from "./features/cart/redux/cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
