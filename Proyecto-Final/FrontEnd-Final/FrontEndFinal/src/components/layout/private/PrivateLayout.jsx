import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Header } from "./Header";
import Footer from "../public/Footer";

export const PrivateLayout = () => {
  const {auth} = useAuth();
  return (
    <>
      {/* PrivateLayout */}
      <Header />
      <section>
        {auth._id ?
          <Outlet />
          :
          <Navigate to="/login"/>
          }
      </section>
      <Footer />
    </>
  );
};
