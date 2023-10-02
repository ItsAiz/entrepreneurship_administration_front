import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { ProgressSpinner } from "primereact/progressspinner";
import EventApi from "../../api/EventApi";

const EventsTable = ({ events }) => {
  const [eventData, setEventData] = useState(null);
  const [responseError, setResponseError] = useState("");
  const [editId, setEditId] = useState("");
  const [visible, setVisible] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const toast = useRef(null);

  async function showModal(idEdit) {
    reset();
    setEventData(null);
    const response = await EventApi.getEvent(idEdit);
    setEventData(response.data);
    setVisible(true);
    setEditId(idEdit);
  }

  async function editEvent(dataForm) {
    setResponseError("");
    console.log(dataForm);
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
      if (imageUrl.secure_url) {
        dataForm.image_name = imageUrl.secure_url;
      }
    } else {
      dataForm.image_name = "";
    }

    dataForm._id = editId;

    const response = await EventApi.updateEvent(dataForm);

    if (response.state) {
      setVisible(false);
      window.location.reload(true, 5000);
    } else {
      setResponseError(response.data);
    }
  }

  async function deleteEvent(idDelete) {
    const response = await EventApi.deleteEvent(idDelete);

    if (response.state) {
      window.location.reload(true, 3000);
    } else {
      setResponseError(response.data)
    }
  }

  return (
    <>
      <div
        className={"card p-datatable-responsive scrollable-table"}
        style={{ width: "100%" }}
      >
        <DataTable
          value={events}
          className="p-datatable-lg"
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="title" header="Titulo"></Column>
          <Column field="place" header="Lugar"></Column>
          <Column field="date" header="Fecha"></Column>
          <Column field="description" header="Descripcion"></Column>
          <Column field="image_name" header="Imagen"></Column>
          <Column
            body={(rowData) => (
              <div style={{ display: "flex", gridGap: "5px" }}>
                <Toast ref={toast} />
                <Button
                  label="Editar"
                  icon="pi pi-pencil"
                  className="p-button-sm p-button-info"
                  style={{
                    padding: "5px",
                  }}
                  onClick={() => showModal(rowData._id)}
                />
                <Button
                  label="Borrar"
                  icon="pi pi-trash"
                  className="p-button-sm p-button-danger"
                  style={{
                    padding: "5px",
                  }}
                  onClick={() => deleteEvent(rowData._id)}
                />
              </div>
            )}
            header="Acciones"
          ></Column>
        </DataTable>
      </div>

      <Dialog
        header="Editar evento"
        visible={visible}
        style={{ width: "70vw" }}
        onHide={() => {
          setVisible(false);
          setEventData(null);
        }}
      >
        {eventData ? (
          <form
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridGap: "16px",
              background: "white",
            }}
            onSubmit={handleSubmit(editEvent)}
          >
            <div style={{ padding: "16px" }}>
              <label style={{ fontSize: "15px" }}>Titulo</label>
              <input
                type="text"
                name="title"
                {...register("title", {
                  value: eventData.title,
                })}
              />
            </div>
            <div style={{ padding: "16px" }}>
              <label style={{ fontSize: "15px" }}>Lugar</label>
              <input
                type="text"
                name="place"
                {...register("place", {
                  value: eventData.place,
                })}
              />
            </div>
            <div style={{ padding: "16px" }}>
              <label style={{ fontSize: "15px" }}>Fecha</label>
              <Calendar
                style={{ width: "100%" }}
                name="date"
                {...register("date", {
                  value: eventData.date,
                })}
              />
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
                    value: eventData.image_name,
                  })}
                />
              </label>
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
                  value: eventData.description,
                })}
              />
            </div>
            <div
              style={{
                padding: "16px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Button
                label="Cancelar"
                icon="pi pi-arrow-left"
                style={{
                  backgroundColor: "#4DCFF2",
                  borderColor: "#4DCFF2",
                  width: "250px",
                }}
                onClick={() => {
                  setVisible(false);
                  setEventData(null);
                  console.log("btncnacel");
                }}
              />
            </div>
            <div
              style={{
                padding: "16px",
                justifyContent: "center",
                display: "flex",
              }}
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
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProgressSpinner />
          </div>
        )}
      </Dialog>
    </>
  );
};

export default EventsTable;
