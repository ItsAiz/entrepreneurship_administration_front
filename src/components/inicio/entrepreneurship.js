import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { dataEntrepreneurship } from "../../../api/entrepreneurship";
export default function Events() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dataEntrepreneurship()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  return (
    <>
    <div
        className="card"
        style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}
      >
        <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
          <Column field="name" header="Code"></Column>
          <Column field="category" header="Name"></Column>
          <Column field="plan_status" header="Category"></Column>
          <Column field="physical_point" header="Quantity"></Column>
        </DataTable>
      </div>
      <br></br>
      <br></br>
    </>
  );
}
