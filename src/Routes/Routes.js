import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "../components/inicio/login";
import Entrepreneurship from "../components/enterpreneurship/entrepreneurship";
import EntrepreneurshipForm from "../components/enterpreneurship/enterpreneurshipRegister";
import Contact from "../components/inicio/contact";
import Events from "../components/inicio/events";
import Register from "../components/inicio/register";
import Index from "../components/inicio";
import Comments from "../components/comments/comments";

const isAuthenticated = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn;
};

const inactivityTimeout = 180000;
let inactivityTimer;

const RoutesApp = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const logout = () => {
    localStorage.clear();
    setShouldRedirect(true);
  };

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logout, inactivityTimeout);
  };
  const handleUserActivity = () => {
    resetInactivityTimer();
  };

  useEffect(() => {
    resetInactivityTimer();

    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);

    return () => {
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
      clearTimeout(inactivityTimer);
    };
  });

  if (shouldRedirect) {
    return <Link to="/" />;
  }

  return (
    <Routes>
      <Route path={"/"} element={<Index />} />
      <Route
        path={"/login"}
        element={
          isAuthenticated() ? (
            <Navigate to="/entrepreneurship-register" />
          ) : (
            <Login />
          )
        }
      />
      <Route path={"/entrepreneurship"} element={<Entrepreneurship />} />
      <Route path={"/events"} element={<Events />} />
      <Route
        path={"/contact"}
        element={
          isAuthenticated() ? (
            <Navigate to="/entrepreneurship-register" />
          ) : (
            <Contact />
          )
        }
      />
      <Route
        path={"/register"}
        element={
          isAuthenticated() ? (
            <Navigate to="/entrepreneurship-register" />
          ) : (
            <Register />
          )
        }
      />
      <Route
        path={"/entrepreneurship-register"}
        element={
          !isAuthenticated() ? (
            <Navigate to="/login" />
          ) : (
            <EntrepreneurshipForm />
          )
        }
      />
      <Route
        path={"/comments"}
        element={!isAuthenticated() ? <Navigate to="/login" /> : <Comments />}
      />
    </Routes>
  );
};

export default RoutesApp;
