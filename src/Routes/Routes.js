import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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

const RoutesApp = () => {
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
