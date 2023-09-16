import React from "react";
import { Routes, Route } from "react-router-dom";

import Toolbar from "../components/mdc/toolbar";
import Login from "../components/mdc/inicio/login";
import Entrepreneurship from "../components/mdc/inicio/entrepreneurship";
import Contact from "../components/mdc/inicio/contact";
import Events from "../components/mdc/inicio/events";
const RoutesApp = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Toolbar />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/entrepreneurship"} element={<Entrepreneurship />} />
      <Route path={"/events"} element={<Events />} />
      <Route path={"/contact"} element={<Contact />} />
    </Routes>
  );
};

export default RoutesApp;
