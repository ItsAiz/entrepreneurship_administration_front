import React from "react";
import { Button } from "primereact/button";

import { TabMenu } from "primereact/tabmenu";
import { Link } from "react-router-dom";


const Toolbar = () => {
  const items = [
    {

      label: (
        <div>
          <img
            src="/resources/images/logo.jpg"
            alt="Imagen"
            style={{ marginRight: "0.5rem", width: "54px", height: "34px" }}
          />
        </div>
      ),
    },
    { label: "Inicio", to: "/" },
    { label: "Eventos", to: "/events" },
    { label: "Emprendimientos", to: "/entrepreneurship" },
    { label: "Contacto", to: "/contact" },
    {
      label: (
        <Link to="/login">
          <Button
            label="Iniciar sesión"
            style={{ background: "#F2cb05", borderColor: "#F2cb05" }}
          />
        </Link>
      ),
    },
    {
      label: (
        <Link to="/register">
          <Button
            label="Registrarse"
            severity="warning"
            style={{ background: "#F2cb05", borderColor: "#F2cb05" }}
          />
        </Link>
      ),
    },
  ];

  return (
    <div className={'card'}>
      <TabMenu
        model={items.map((item) => ({
          label: (
            <div className="p-menuitem">
              <Link to={item.to}>
                <span
                  className={`pi ${item.icon}`}
                  style={{ marginRight: "0.5rem" }}
                ></span>
                {item.label}
              </Link>
            </div>
          ),
        }))}
      />
    </div>
  );
}

export default Toolbar;
