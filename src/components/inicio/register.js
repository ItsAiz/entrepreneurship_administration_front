import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { TreeSelect } from "primereact/treeselect";
import apiLogin from "../../api/apiLogin";

export default function Register() {
  const carreras = [
    {
      label: "Carreras",
      key: "carreras",
      children: [
        { label: "Ingeniería de minas", key: "Ingeniería de Minas" },
        { label: "Ingeniería Industrial", key: "Ingeniería Industrial" },
        { label: "Ingeniería Electrónica", key: "Ingeniería Electrónica" },
        {
          label: "Ingeniería de Sistemas y Computación",
          key: "Ingeniería de Sistemas y Computación",
        },
        { label: "Ingeniería Geológica", key: "Ingeniería Geológica" },
        {
          label: "Administración de Empresas",
          key: "Administración de Empresas",
        },
        { label: "Contaduría Pública", key: "Contaduría Pública" },
        {
          label: "Finanzas y Comercio Internacional",
          key: "Finanzas y Comercio Internacional",
        },
      ],
    },
  ];

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

  const { name, lastName, documentId, career, user, password } = formData;

  const handleRegister = async () => {
    if (
      !name ||
      !lastName ||
      !documentId ||
      !career ||
      !user ||
      !password
    ) {
      showSticky({
        severity: "warn",
        summary: "Advertencia",
        detail: "Por favor, complete todos los campos.",
      });
      return;
    }
    await apiLogin
      .userRegister(formData)
      .then((resp) => {
        showSticky({
          severity: "success",
          summary: "Success",
          detail: "Inicio de sesión correcto",
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
            <span className="p-float-label">
              <InputText
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
              />
              <label htmlFor="user">Nombre</label>
            </span>
            <br></br>
            <span className="p-float-label">
              <InputText
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={handleChange}
              />
              <label htmlFor="user">Apellido</label>
            </span>
            <br></br>

            <span className="p-float-label">
              <InputText
                id="documentId"
                name="documentId"
                value={documentId}
                onChange={handleChange}
              />
              <label htmlFor="document">N° Documento</label>
            </span>
            <br></br>

            <div className="input-field col s6">
              <TreeSelect
                value={career}
                onChange={handleCareerChange}
                options={carreras}
                style={{ width: "100%" }}
                placeholder="Carrera"
              ></TreeSelect>
            </div>
            <br></br>
            <span className="p-float-label">
              <InputText
                id="user"
                name="user"
                value={user}
                onChange={handleChange}
              />
              <label>Correo electrónico</label>
            </span>
            <br></br>
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
            <br></br>
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
