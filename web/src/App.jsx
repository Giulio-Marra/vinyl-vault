import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import "./styles/App.css";
import RegisterPage from "./pages/RegisterPage";

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
          <Route path="/" element={<h1>Home</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
