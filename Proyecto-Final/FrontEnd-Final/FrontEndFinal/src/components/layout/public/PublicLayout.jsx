import React from "react";
import { Header } from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "./Footer";
import useAuth from "../../../hooks/useAuth";

export const PublicLayout = () => {
  const {auth} = useAuth();
  return (
    <>
      {/* PublicLayout */}
      <Header />
      <section>
         {!auth._id ? 
          <Outlet />
          :
           <Navigate to="/private/feedTecnicos"/>
          }
      </section>
      <Footer />
    </>
  );
};
