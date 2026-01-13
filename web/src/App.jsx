import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotte di autentificazione*/}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Rotte dell app */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
