import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../components/inicio/login";
import Entrepreneurship from "../components/enterpreneurship/entrepreneurship";
import EntrepreneurshipForm from '../components/enterpreneurship/enterpreneurshipRegister';
import Contact from "../components/inicio/contact";
import Events from "../components/inicio/events";
import Register from "../components/inicio/register";
import Index from "../components/inicio";
import EventsAdminView from "../components/events/EventsAdminView";
import EventsForm from '../components/events/EventsForm'

const RoutesApp = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Index />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/entrepreneurship"} element={<Entrepreneurship />} />
      <Route path={"/events"} element={<Events />} />
      <Route path={"/contact"} element={<Contact />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/entrepreneurship-register"} element={<EntrepreneurshipForm />} />
      <Route path={"/events-admin"} element={<EventsAdminView />} ></Route>
      <Route path={"/events-register"} element={<EventsForm />} ></Route>
    </Routes>
  );
};

export default RoutesApp;
