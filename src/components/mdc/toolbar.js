import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import "./mdcStyles.css";

const Toolbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const toast = useRef(null);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollThreshold = 200;
      if (scrollY > scrollThreshold) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const showSticky = (notificationData) => {
    toast.current.show({
      severity: notificationData.severity,
      summary: notificationData.summary,
      detail: notificationData.detail,
      life: 2000,
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    showSticky({
      severity: "info",
      summary: "Cerrando sesión",
      detail: "Se estrá",
    });
    window.location.href = "/login";
  };

  return (
    <div className={`toolbar ${isFixed ? "fixed" : ""}`}>
      <Toast ref={toast} />
      <Button
        icon="pi pi-bars"
        className={`menu-icon ${menuVisible ? "active" : ""}`}
        onClick={toggleMenu}
        style={{ backgroundColor: "#fff", color: "#000000", border: "none" }}
      />
      <div>
        <img
          src="/resources/images/logo.jpg"
          alt="Imagen"
          style={{ marginRight: "0.5rem", width: "120px", height: "52px" }}
        />
      </div>
      <div className="toolbar-buttons">
        {isLoggedIn ? (
          <Button
            label="Cerrar sesión"
            style={{
              backgroundColor: "#F2cb05",
              borderColor: "#F2cb05",
            }}
            onClick={handleLogout}
          />
        ) : (
          <React.Fragment>
            <Link to="/login">
              <Button
                label="Iniciar sesión"
                style={{ backgroundColor: "#F2cb05", borderColor: "#F2cb05" }}
              />
            </Link>
            <Link to="/register">
              <Button
                label="Registro"
                style={{
                  backgroundColor: "#F2cb05",
                  borderColor: "#F2cb05",
                  marginLeft: "0.5rem",
                }}
              />
            </Link>
          </React.Fragment>
        )}
      </div>
      <div className={`menu ${menuVisible ? "active" : ""}`}>
        <div className="close-menu-button">
          <Button
            icon="pi pi-times"
            className="close-menu-button"
            onClick={closeMenu}
            style={{
              backgroundColor: "#fff",
              color: "#000000",
              border: "none",
            }}
          />
        </div>
        <br />
        <br />
        <br />
        <Link to="/">Inicio</Link>
        <Link to="/events">Eventos</Link>
        <Link to="/entrepreneurship">Emprendimientos</Link>
        {!isLoggedIn ? <Link to="/contact">Contacto</Link> : null}
      </div>
    </div>
  );
};

export default Toolbar;
