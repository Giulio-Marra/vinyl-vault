import { SET_USER, REMOVE_USER, SET_LOADING, SET_ERROR } from "./authActions";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case REMOVE_USER:
      return {
        ...state,
        user: null,
        isLoading: false,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
