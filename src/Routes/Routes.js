import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../components/inicio/login";
import Entrepreneurship from "../components/inicio/entrepreneurship";
import Contact from "../components/inicio/contact";
import Events from "../components/inicio/events";
import Register from "../components/inicio/register";
import Index from "../components/inicio";
const RoutesApp = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Index />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/entrepreneurship"} element={<Entrepreneurship />} />
      <Route path={"/events"} element={<Events />} />
      <Route path={"/contact"} element={<Contact />} />
      <Route path={"/register"} element={<Register />} />
    </Routes>
  );
};

export default RoutesApp;
