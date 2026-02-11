import {
  CLEAR_CART,
  SET_CART_COUNT,
  SET_CART_ERROR,
  SET_CART_LOADING,
} from "./cartActions";

const initialState = {
  itemCount: 0,
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_COUNT:
      return {
        ...state,
        itemCount: action.payload,
      };

    case SET_CART_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case SET_CART_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_CART:
      return {
        ...state,
        itemCount: 0,
        error: null,
      };

    default:
      return state;
  }
};

export default cartReducer;
