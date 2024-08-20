import React, { createContext, useEffect, useState } from "react";
import { Global } from "../helpers/Global";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [counters, setCounters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    //sacad datos del usu local storage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    //comprobar si tengo el toke y user
    if (!token || !user) {
      setLoading(false);
      return false;
    }
    //transformar los datos a un objeto de java
    const userObj = JSON.parse(user);
    const userId = userObj.id;
    //peticion ajax al back
    const request = await fetch(Global.url + "user/profile/" + userId, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    });

    const data = await request.json();

    //peticion para los contadores
    /* const requestCounters = await fetch(
      Global.url + "user/counters/" + userId,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: token },
      }
    );

    const dataCounters = await requestCounters.json(); */
    //setear el estado de auth
    setAuth(data.user);
/*     setCounters(dataCounters); */
    setLoading(false);
  };
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, /* counters */ loading, /* setCounters */ }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
