import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    comentario: "",
  });

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
    // Aquí puedes realizar la llamada a la API y enviar formData
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
        console.log("Datos enviados con éxito");
      } else {
        // Manejar errores en caso de una respuesta no exitosa
        console.error("Error al enviar datos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
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
        <div className="row">
          <div className="col s12 m6 center-align">
            <h2>Contactenos</h2>
            <p>Oficina xxx - Segundo piso Edificio Administrativo</p>
            <p>UPTC Seccional Sogamoso</p>
            <p>Telefono: 5555555555</p>
            <p>Correo: xxxxx@uptc.edu.co</p>
          </div>
          <div className="col s12 m6">
            <Card
              title="Comentarios"
              style={{
                textAlign: "center",
              }}
            >
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col s12">
                    <label>Nombre</label>
                    <InputText
                      name="nombre"
                      value={nombre}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col s12">
                    <label>Correo electrónico</label>
                    <InputText
                      type="email"
                      name="correo"
                      value={correo}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col s12">
                    <label>Comentario</label>
                    <InputTextarea
                      name="comentario"
                      value={comentario}
                      onChange={handleChange}
                      rows={1}
                      cols={3}
                    />
                  </div>
                </div>
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
