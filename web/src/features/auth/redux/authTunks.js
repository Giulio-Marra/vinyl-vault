import { setError, setLoading } from "./authActions";
import { loginService } from "./authService";

export const loginAction =
  ({ email, password, remember }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const token = await loginService({ email, password });

      if (remember) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
    } catch (err) {
      dispatch(setError(err.message));
      console.log(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
