import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { useForm } from "react-hook-form";

const EventsForm = () => {
  const [responseError, setResponseError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function registEvent(dataForm) {
    setResponseError("");
    if (dataForm.image_name[0]) {
      const image = new FormData();
      image.append("file", dataForm.image_name[0]);
      image.append("upload_preset", "unidad_uptc");
      const responseCloud = await fetch(
        "https://api.cloudinary.com/v1_1/dbhl95fyu/image/upload",
        {
          method: "POST",
          body: image,
        }
      );
      const imageUrl = await responseCloud.json();
      if (imageUrl.error) {
        setResponseError(imageUrl.error.message);
        return;
      }
      dataForm.image_name = imageUrl.secure_url;
    } else {
      dataForm.image_name = "";
    }
    console.log(dataForm);
    const response = await fetch(
      "https://emprendimientos-uptc.vercel.app/events",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataForm),
      }
    );
    const data = await response.json();
    console.log(data);

    if (data.state) {
      window.location.reload(true)
    } else {
      setResponseError(data.data);
    }
  }

  return (
    <form
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "16px",
        background: "white",
      }}
      onSubmit={handleSubmit(registEvent)}
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
        <input
          type="text"
          name="title"
          {...register("title", {
            required: true,
          })}
        />
        {errors.title?.type === "required" && (
          <div style={{ color: "red" }}>
            <small>Este campo es requerido.</small>
          </div>
        )}
      </div>
      <div style={{ padding: "16px" }}>
        <label style={{ fontSize: "15px" }}>Lugar</label>
        <input
          type="text"
          name="place"
          {...register("place", {
            required: true,
          })}
        />
        {errors.place?.type === "required" && (
          <div style={{ color: "red" }}>
            <small>Este campo es requerido.</small>
          </div>
        )}
      </div>
      <div style={{ padding: "16px" }}>
        <label style={{ fontSize: "15px" }}>Fecha</label>
        <Calendar
          style={{ width: "100%" }}
          name="date"
          {...register("date", {
            required: true,
          })}
        />
        {errors.date?.type === "required" && (
          <div style={{ color: "red" }}>
            <small>Este campo es requerido.</small>
          </div>
        )}
      </div>
      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
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
            fontSize: "14px",
          }}
        >
          <i className="pi pi-plus" style={{ marginRight: "7px" }}></i>
          Elegir
          <input
            type="file"
            accept="image/*"
            style={{
              display: "none",
              width: "150px",
            }}
            name="image_name"
            {...register("image_name", {
              required: true,
            })}
          />
        </label>
        {errors.image_name?.type === "required" && (
          <div style={{ color: "red" }}>
            <small>Este campo es requerido.</small>
          </div>
        )}
      </div>
      <div style={{ padding: "16px", gridColumn: "span 2" }}>
        <label
          style={{
            fontSize: "15px",
          }}
        >
          Descripción
        </label>
        <textarea
          type="text"
          style={{ height: "150px", resize: "none" }}
          name="description"
          {...register("description", {
            required: true,
          })}
        />
        {errors.description?.type === "required" && (
          <div style={{ color: "red" }}>
            <small>Este campo es requerido.</small>
          </div>
        )}
      </div>
      <div
        style={{ padding: "16px", justifyContent: "center", display: "flex" }}
      >
        <Button
          label="Cancelar"
          type="button"
          icon="pi pi-arrow-left"
          style={{
            backgroundColor: "#4DCFF2",
            borderColor: "#4DCFF2",
            width: "250px",
          }}
          onClick={() => window.location.reload(true)}
        />
      </div>
      <div
        style={{ padding: "16px", justifyContent: "center", display: "flex" }}
      >
        <Button
          label="Guardar"
          type="submit"
          style={{
            backgroundColor: "#4DCFF2",
            borderColor: "#4DCFF2",
            width: "250px",
          }}
        />
      </div>
      <div style={{ color: "red" }}>
        <small>{responseError}</small>
      </div>
    </form>
  );
};

export default EventsForm;
