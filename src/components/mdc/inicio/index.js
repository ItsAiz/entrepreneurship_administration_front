import React from "react";
import Toolbar from "../toolbar";

export default function Index() {
  return (
    <div
      className="card flex flex-column md:flex-row gap-3"
      style={{
        background: "#fff54d",
      }}
    >
      <Toolbar />

      <div
        className="card flex justify-content-center"
        style={{
          marginTop: "5%",
          marginLeft: "10%",
          marginRight: "10%",
        }}
      >
        <div className="row">
          <div className="col s6 center-align" style={{ marginTop: "20px" }}>
            <img
              src="/resources/images/logo.jpg"
              alt="Logo"
              style={{
                width: "100%", // La imagen ocupará el 100% del ancho del contenedor
                height: "auto",
              }}
            />
          </div>
          <div className="col s6 center-align">
            <h4>Unidad de emprendimientos UPTC</h4>
          </div>
        </div>
      </div>
      <br></br>
    </div>
  );
}
