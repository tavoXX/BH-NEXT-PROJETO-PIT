import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../views/Login";
import Register from "../views/Register";
import ClienteDashboard from "../views/ClienteDashboard";
import ColaboradorDashboard from "../views/ColaboradorDashboard";
import ProfileEdit from "../views/ProfileEdit"; 
import ClienteProfileEdit from "../views/ClienteProfileEdit"; 
import ReservaPage from '../views/ReservaPage';
import ForgotPassword from "../views/ForgotPassword";
import Home from "../pages/Home";
import RegisterShop from "../pages/RegisterShop"; 
import Profile from "../views/Profile";
import ColaboradorProdutos from "../views/ColaboradorProdutos"; 

const isAuthenticated = () => {
  const token = localStorage.getItem("storedToken");
  return token ? true : false; 
};

const getUserRole = () => {
  return localStorage.getItem("role");
};

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = isAuthenticated();
  const userRole = getUserRole();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && requiredRole !== userRole) {
    return <Navigate to="/" />;
  }

  return children;
};

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/cliente"
        element={
          <ProtectedRoute requiredRole="cliente">
            <ClienteDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cliente/perfil"
        element={
          <ProtectedRoute requiredRole="cliente">
            <ClienteProfileEdit />
          </ProtectedRoute>
        }
      />

      <Route
        path="/colaborador"
        element={
          <ProtectedRoute requiredRole="colaborador">
            <ColaboradorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/colaborador/perfil"
        element={
          <ProtectedRoute requiredRole="colaborador">
            <ProfileEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/colaborador/registrar-loja"
        element={
          <ProtectedRoute requiredRole="colaborador">
            <RegisterShop />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/colaborador/produtos"
        element={
          <ProtectedRoute requiredRole="colaborador">
            <ColaboradorProdutos />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile /> 
          </ProtectedRoute>
        }
      />

      <Route path="/reserve" element={<ReservaPage />} />
    </Routes>
  );
}

export default AuthRoutes;