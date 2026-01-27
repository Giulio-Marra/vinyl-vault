import { setError, setLoading, setUser } from "./authActions";
import { getMyProfile, loginService } from "./authService";

export const loginAction =
  ({ email, password, remember, navigate }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const token = await loginService({ email, password });

      if (remember) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      // Carica i dati dello user
      const userData = await getMyProfile(token);
      dispatch(setUser(userData));

      // Naviga alla homepage dopo login riuscito
      navigate("/");
    } catch (err) {
      if (!err.status) {
        navigate("/error", {
          state: {
            statusCode: "Connection Error",
            message: "Cannot reach server. Please check your connection.",
          },
        });
      } else if (err.status === 400 || err.status === 401) {
        dispatch(setError(err.message));
      } else if (err.status >= 500) {
        navigate("/error", {
          state: {
            statusCode: err.status,
            message: "Server error. Please try again later.",
          },
        });
      } else {
        dispatch(setError(err.message || "Login failed. Please try again."));
      }
      console.log(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getUserAction = () => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      dispatch(setError("No token found"));
      return;
    }

    const user = await getMyProfile(token);
    dispatch(setUser(user));
  } catch (err) {
    dispatch(setError(err.message || "Failed to load user profile"));
    console.log(err.message);
  } finally {
    dispatch(setLoading(false));
  }
};
