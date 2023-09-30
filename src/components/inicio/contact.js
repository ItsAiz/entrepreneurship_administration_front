import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { FaFacebook, FaInstagram, FaGlobe } from "react-icons/fa";
import { Toast } from "primereact/toast";
import apiComment from "../../api/apiComment";
export default function Events() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
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
  const { name, email, comment } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendComment = async () => {
    if (!name || !email || !comment) {
      showSticky({
        severity: "warn",
        summary: "Advertencia",
        detail: "Por favor, complete todos los campos.",
      });
      return;
    }
    if (!isEmailValid(email)) {
      showSticky({
        severity: "error",
        summary: "Error",
        detail: "Por favor, ingrese un correo electrónico válido.",
      });
      return;
    }
    await apiComment
      .saveComment(formData)
      .then((resp) => {
        showSticky({
          severity: "success",
          summary: "Success",
          detail: "Comentario enviado con éxito",
        });
        setFormData({
          name: "",
          email: "",
          comment: "",
        });
      })
      .catch((error) => {
        localStorage.setItem("userRole", "NA");
        showSticky({
          severity: "error",
          summary: "Error",
          detail: "Error al iniciar sesión" + error.message,
        });
      });
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
              <label>Nombre</label>
              <InputText name="name" value={name} onChange={handleChange} />
              <label>Correo electrónico</label>
              <InputText
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />

              <label>Comentario</label>
              <InputTextarea
                name="comment"
                value={comment}
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
                onClick={handleSendComment}
              />
            </Card>
          </div>
        </div>
      </div>
      <br></br>
    </>
  );
}
