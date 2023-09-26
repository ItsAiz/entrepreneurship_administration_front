import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import apiLogin from "../../api/apiLogin";
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

  const handleLogin = async () => {
    if (!user || !password) {
      showSticky({
        severity: "warn",
        summary: "Advertencia",
        detail: "Por favor, complete todos los campos.",
      });
      return;
    }
    await apiLogin
      .login(formData)
      .then((resp) => {
        localStorage.setItem("userRole", resp.data.rol);
        showSticky({
          severity: "success",
          summary: "Success",
          detail: "Inicio de sesión correcto",
        });
        setFormData({
          user: "",
          password: "",
        });
      })

      .catch((error) => {
        showSticky({
          severity: "error",
          summary: "Error",
          detail: "Error al iniciar sesión",
        });
        setFormData({
          user: "",
          password: "",
        });
      });
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
            <span className="p-float-label">
              <InputText
                id="user"
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
              onClick={handleLogin}
            />
          </Card>
        </div>
      </div>

      <br />
    </>
  );
}
