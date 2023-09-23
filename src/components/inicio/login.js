import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { login } from "../../api/apiLogin";
export default function Login() {
  const [formData, setFormData] = useState({
    user: "",
    password: "",
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

  const { user, password } = formData;

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
      await login(formData);
      notificationData = {
        severity: "success",
        summary: "Éxito",
        detail: "Bienvenido al sistema",
      };
      window.location.href = "/contact";
    } catch (error) {
      notificationData = {
        severity: "error",
        summary: "Error",
        detail: "Usuario no registrado en el sistema",
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
            <form onSubmit={handleSubmit} autoComplete="off">
              <span className="p-float-label">
                <InputText
                  id="username"
                  name="user"
                  value={user}
                  onChange={handleChange}
                />
                <label htmlFor="username">Usuario</label>
              </span>
              <br />
              <span className="p-float-label">
                <InputText
                  id="password"
                  name="password"
                  value={password}
                  type="password"
                  onChange={handleChange}
                  autoComplete="off"
                />
                <label htmlFor="password">Contraseña</label>
              </span>
              <br />

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

      <br />
    </>
  );
}
