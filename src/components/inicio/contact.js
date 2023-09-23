import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { FaFacebook, FaInstagram, FaGlobe } from "react-icons/fa";
import { Toast } from "primereact/toast";

export default function Events() {
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
          marginLeft: "10%",
          marginRight: "10%",
        }}
      >
        <Toast ref={toast} />

        <div className="row">
          <div className="col s6 center-align" style={{ marginTop: "20px" }}>
            <h2>Contactenos</h2>
            <p>Oficina xxx - Segundo piso Edificio Administrativo</p>
            <p>UPTC Seccional Sogamoso</p>
            <p>Telefono: 5555555555</p>
            <p>Correo: xxxxx@uptc.edu.co</p>
            <div
              style={{
                marginTop: "30px",
              }}
            >
              <FaFacebook
                style={{
                  color: "#1877f2",
                  fontSize: "44px",
                  marginRight: "10px",
                }}
              />
              <FaInstagram
                style={{
                  color: "#1877f2",
                  fontSize: "44px",
                  marginRight: "10px",
                }}
              />

              <FaGlobe
                style={{
                  color: "#1877f2",
                  fontSize: "44px",
                  marginRight: "10px",
                }}
              />
            </div>
          </div>
          <div className="col s6">
            <Card
              title="Comentarios"
              style={{
                textAlign: "center",
              }}
            >
              <form onSubmit={handleSubmit}>
                <label>Nombre</label>
                <InputText
                  name="nombre"
                  value={nombre}
                  onChange={handleChange}
                />
                <label>Correo electrónico</label>
                <InputText
                  type="email"
                  name="correo"
                  value={correo}
                  onChange={handleChange}
                />

                <label>Comentario</label>
                <InputTextarea
                  name="comentario"
                  value={comentario}
                  onChange={handleChange}
                  rows={1}
                  cols={3}
                />
                <Button
                  label="Enviar comentario"
                  severity="info"
                  icon="pi pi-check"
                  className="p-button-sm"
                  style={{
                    marginTop: "20px",
                  }}
                />
              </form>
            </Card>
          </div>
        </div>
      </div>
      <br></br>
    </>
  );
}
