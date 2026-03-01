import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

function isLogged() {
  return localStorage.getItem("aur_session") === "true";
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: isLogged() ? <Dashboard /> : <Login />
  }
]);
