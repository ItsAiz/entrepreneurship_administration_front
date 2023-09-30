import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

const EventsTable = ({ events }) => {
  return (
    <DataTable value={events} tableStyle={{ minWidth: "50rem" }}>
      <Column field="title" header="Titulo"></Column>
      <Column field="place" header="Lugar"></Column>
      <Column field="date" header="Fecha"></Column>
      <Column field="quantity" header="Descripcion"></Column>
      <Column field="image" header="Imagen"></Column>
    </DataTable>
  );
};

export default EventsTable;
