import { setError, setLoading } from "./authActions";
import { loginService } from "./authService";

export const loginAction =
  ({ email, password, remember }) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const token = await loginService({ email, password });

      if (remember) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };
