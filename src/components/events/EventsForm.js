import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";

const EventsForm = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "16px",
        padding: "20px",
        margin: "100px",
        background: "white",
      }}
    >
      <div
        style={{
          padding: "16px",
          fontWeight: "bold",
          fontSize: "30px",
          gridColumn: "span 2",
        }}
      >
        Crear Evento
      </div>
      <div style={{ padding: "16px" }}>
        <label style={{ fontSize: "15px" }}>Titulo</label>
        <input type="text" />
      </div>
      <div style={{ padding: "16px" }}>
        <label style={{ fontSize: "15px" }}>Lugar</label>
        <input type="text" />
      </div>
      <div style={{ padding: "16px" }}>
        <label style={{ fontSize: "15px" }}>Fecha</label>
        <Calendar style={{ width: "100%" }} />
      </div>
      <div style={{ padding: "16px" }}>
        <label style={{ fontSize: "15px" }}>Hora</label>
        <input type="text" />
      </div>
      <div style={{ padding: "16px" }}>
        <label
          style={{
            fontSize: "15px",
          }}
        >
          Descripción
        </label>
        <textarea type="text" style={{ height: "150px", resize: "none" }} />
      </div>
      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <label style={{ fontSize: "15px" }}>Imagen</label>
        <label
          style={{
            backgroundColor: "#4DCFF2",
            color: "white",
            border: "none",
            padding: "10px 150px",
            cursor: "pointer",
            borderRadius: "5px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "14px"
          }}
        >
          <i className="pi pi-plus" style={{marginRight: "7px"}}></i>
          Elegir 
          <input
            type="file"
            accept="image/*"
            style={{
              display: "none",
              width: "150px",
            }}
          />
        </label>
      </div>
      <div
        style={{ padding: "16px", justifyContent: "center", display: "flex" }}
      >
        <Button
          label="Cancelar"
          icon="pi pi-arrow-left"
          style={{
            backgroundColor: "#4DCFF2",
            borderColor: "#4DCFF2",
            width: "250px",
          }}
        />
      </div>
      <div
        style={{ padding: "16px", justifyContent: "center", display: "flex" }}
      >
        <Button
          label="Guardar"
          style={{
            backgroundColor: "#4DCFF2",
            borderColor: "#4DCFF2",
            width: "250px",
          }}
        />
      </div>
    </div>
  );
};

export default EventsForm;
