import React from "react";
import { Menu } from "primereact/menu";
export default function GroupDemo() {
  const rol = localStorage.getItem("userRole");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const itemsAdmin = [
    {
      label: "Administrador",
      items: [
        {
          label: "Registrar emprendimiento",
          icon: "pi pi-plus-circle",
          url: "/entrepreneurship-register",
        },
        {
          label: "Ver emprendimientos",
          icon: "pi pi-eye",
          url: "/entrepreneurship",
        },
        {
          label: "Eventos de emprendimientos",
          icon: "pi pi-calendar",
          url: "/events-admin",
        },
        {
          label: "Comentarios de la página",
          icon: "pi pi-comments",
          url: "/comments",
        },
      ],
    },
  ];

  const itemsEmprendedor = [
    {
      label: "Emprendedor",
      items: [
        {
          label: "Registrar emprendimiento",
          icon: "pi pi-plus-circle",
          url: "/entrepreneurship-register",
        },
        {
          label: "Ver mis emprendimientos",
          icon: "pi pi-eye",
          url: "/entrepreneurship",
        },
      ],
    },
  ];

  return (
    <div className="card flex justify-content-center">
      
      {
        rol === "Administrador" && isLoggedIn ? (
          <Menu model={itemsAdmin} />
        ) : isLoggedIn ? (
          <Menu model={itemsEmprendedor} />
        ) : null
      }
    </div>
  );
}
