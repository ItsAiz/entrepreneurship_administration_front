import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export default function Login() {
  const [value, setValue] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    comentario: "",
  });
  const toast = useRef(null);

  const showSticky = (notificationData) => {
    toast.current.show({
      severity: notificationData.severity,
      summary: notificationData.summary,
      detail: notificationData.detail,
      life: 2000,
    });
  };
  const { nombre, correo, comentario } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let notificationData = {};

    try {
      const response = await fetch("URL_DE_TU_API", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // La solicitud fue exitosa, puedes realizar acciones adicionales si es necesario
        notificationData = {
          severity: "success",
          summary: "Éxito",
          detail: "Los datos se enviaron con éxito",
        };
      } else {
        // Manejar errores en caso de una respuesta no exitosa
        notificationData = {
          severity: "error",
          summary: "Error",
          detail: "Hubo un error al enviar los datos",
        };
      }
    } catch (error) {
      notificationData = {
        severity: "error",
        summary: "Error",
        detail: "Hubo un error en la solicitud: " + error.message,
      };
    }
    showSticky(notificationData);
  };

  return (
    <>
    <div
        className="card flex justify-content-center"
        style={{
          marginTop: "5%",
          marginLeft: "30%",
          marginRight: "30%",
        }}
      >
        <Toast ref={toast} />

        <div className="col s6">
          <Card
            title="Inicio de sesión"
            style={{
              textAlign: "center",
            }}
          >
            <form onSubmit={handleSubmit} autocomplete="off">
              <span className="p-float-label">
                <InputText
                  id="username"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <label htmlFor="username">Usuario</label>
              </span>
              <br></br>
              <span className="p-float-label">
                <InputText
                  id="username"
                  value={value}
                  type="password"
                  onChange={(e) => setValue(e.target.value)}
                  autocomplete="off"
                />
                <label htmlFor="username">Contraseña</label>
              </span>
              <br></br>

              <Button
                label="Iniciar Sesión Administrador"
                severity="info"
                className="p-button-sm"
                style={{
                  marginTop: "20px",
                }}
              />

              <Button
                label="Iniciar Sesión Usuario"
                severity="info"
                className="p-button-sm"
                style={{
                  marginTop: "20px",
                  marginLeft: "20px",
                }}
              />
            </form>
          </Card>
        </div>
      </div>

      <br></br>
    </>
  );
}
