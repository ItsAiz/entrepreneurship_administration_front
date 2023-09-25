import React, { useState } from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import "./mdcStyles.css";

const Toolbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <div className="toolbar">
      <Button
        icon="pi pi-bars"
        className={`menu-icon ${menuVisible ? "active" : ""}`}
        onClick={toggleMenu}
        style={{ backgroundColor: '#fff', color: '#000000', border: 'none' }}
      />
      <div>
          <img
            src="/resources/images/logo.jpg"
            alt="Imagen"
            style={{ marginRight: "0.5rem", width: "54px", height: "34px" }}
          />
      </div>
      <div className="toolbar-buttons">
        <Link to="/login">
          <Button
            label="Iniciar sesión"
            style={{ backgroundColor: "#F2cb05", borderColor: "#F2cb05"}}
          />
        </Link>
        <Link to="/register">
          <Button
            label="Registro"
            style={{ backgroundColor: "#F2cb05", borderColor: "#F2cb05", marginLeft: '0.5rem'}}
          />
        </Link>
      </div>
      <div className={`menu ${menuVisible ? "active" : ""}`}>
        <div className="close-menu-button">
          <Button
            icon="pi pi-times"
            className="close-menu-button"
            onClick={closeMenu}
            style={{ backgroundColor: "#fff", color: "#000000", border: "none" }}
          />
        </div>
        <br/><br/><br/>
        <Link to="/">Inicio</Link>
        <Link to="/events">Eventos</Link>
        <Link to="/entrepreneurship">Emprendimientos</Link>
        <Link to="/contact">Contacto</Link>
      </div>
    </div>
  );
};

export default Toolbar;
