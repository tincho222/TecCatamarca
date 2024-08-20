import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { PublicLayout } from "../components/layout/public/PublicLayout";
import { Login } from "../components/users/Login";
import { Register } from "../components/users/Register";
import { Maint } from "../components/layout/public/Maint";
import Tecnicos from "../components/layout/public/Tecnicos";
import { AuthProvider } from "../context/AuthProvider";
import { PrivateLayout } from "../components/layout/private/PrivateLayout";
import FeedTecnicos from "../components/layout/tecnicos/FeedTecnicos";
import { RegisterTec } from "../components/layout/tecnicos/RegisterTec";

const Rutas = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas publicas */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Maint />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Rutas Privadas */}
          <Route path="/private" element={<PrivateLayout />}>
          <Route path="tecnicos" element={<Tecnicos />} />
          <Route path="feedTecnicos" element={<FeedTecnicos />} />
          <Route path="registerTec" element={<RegisterTec />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Rutas;
