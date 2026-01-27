import { setError, setLoading } from "./authActions";
import { loginService } from "./authService";

export const loginAction =
  ({ email, password, remember, navigate }) =>
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
      // Errori di connessione (backend spento)
      if (!err.status) {
        navigate("/error", {
          state: {
            statusCode: "Connection Error",
            message: "Cannot reach server. Please check your connection.",
          },
        });
      }
      // Errori recuperabili
      else if (err.status === 400 || err.status === 401) {
        dispatch(setError(err.message));
      }
      // Errori critici
      else if (err.status >= 500) {
        navigate("/error", {
          state: {
            statusCode: err.status,
            message: "Server error. Please try again later.",
          },
        });
      }
      // Errori sconosciuti
      else {
        dispatch(setError(err.message || "Login failed. Please try again."));
      }
      console.log(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
