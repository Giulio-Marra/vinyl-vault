import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "./styles/index.css";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import VinylDetailPage from "./pages/VinylDetailPage";
import ErrorPage from "./pages/ErrorPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Error page */}
        <Route path="/error" element={<ErrorPage />} />

        {/* Rotte di autentificazione*/}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Rotte dell app */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/vinyl/detail/:id" element={<VinylDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
