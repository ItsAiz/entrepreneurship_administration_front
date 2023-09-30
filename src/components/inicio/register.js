import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import apiLogin from "../../api/apiLogin";
import { careers } from "../../__mocks__/enterpreneurshipData";
export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    documentId: "",
    career: "",
    user: "",
    password: "",
  });
  const toast = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCareerChange = (e) => {
    setFormData({
      ...formData,
      career: e.value,
    });
  };

  const showSticky = (notificationData) => {
    toast.current.show({
      severity: notificationData.severity,
      summary: notificationData.summary,
      detail: notificationData.detail,
      life: 2000,
    });
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const { name, lastName, documentId, career, user, password } = formData;

  const handleRegister = async () => {
    if (!name || !lastName || !documentId || !career || !user || !password) {
      showSticky({
        severity: "warn",
        summary: "Advertencia",
        detail: "Por favor, complete todos los campos.",
      });
      return;
    }
    if (!isEmailValid(user)) {
      showSticky({
        severity: "error",
        summary: "Error",
        detail: "Por favor, ingrese un correo electrónico válido.",
      });
      return;
    }
    await apiLogin
      .userRegister(formData)
      .then((resp) => {
        showSticky({
          severity: "success",
          summary: "Success",
          detail: "Registro exitoso",
        });
        setFormData({
          name: "",
          lastName: "",
          documentId: "",
          career: "",
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
          name: "",
          lastName: "",
          documentId: "",
          career: "",
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
          marginLeft: "20%",
          marginRight: "20%",
        }}
      >
        <Toast ref={toast} />

        <div className="col s6">
          <Card
            title="Registro"
            style={{
              textAlign: "center",
            }}
          >
            <div className="row">
              <div className="col s6">
                <span className="p-float-label">
                  <InputText
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    keyfilter={/^[A-Za-z\s]+$/}
                  />
                  <label htmlFor="user">Nombre</label>
                </span>
              </div>
              <div className="col s6">
                <span className="p-float-label">
                  <InputText
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                    keyfilter={/^[A-Za-z\s]+$/}
                  />
                  <label htmlFor="user">Apellido</label>
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col s6">
                <span className="p-float-label">
                  <InputText
                    id="documentId"
                    name="documentId"
                    value={documentId}
                    onChange={handleChange}
                    keyfilter={/^[0-9\s]+$/}
                  />
                  <label htmlFor="document">N° Documento</label>
                </span>
              </div>
              <div className="col s6">
                <Dropdown
                  value={career}
                  options={careers.map((career) => ({
                    label: career,
                    value: career,
                  }))}
                  onChange={handleCareerChange}
                  placeholder="Seleccione una carrera"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col s6">
                <span className="p-float-label">
                  <InputText
                    id="user"
                    name="user"
                    value={user}
                    onChange={handleChange}
                  />
                  <label>Correo electrónico</label>
                </span>
              </div>
              <div className="col s6">
                <span className="p-float-label">
                  <InputText
                    id="password"
                    name="password"
                    value={password}
                    type="password"
                    onChange={handleChange}
                  />
                  <label htmlFor="password">Contraseña</label>
                </span>
              </div>
            </div>

            <Button
              label="Registrarme"
              severity="info"
              className="p-button-sm"
              onClick={handleRegister}
              style={{
                marginTop: "20px",
              }}
            />
          </Card>
        </div>
      </div>

      <br></br>
    </>
  );
}
