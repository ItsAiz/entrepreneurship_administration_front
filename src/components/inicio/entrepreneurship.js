import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Events() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Aquí puedes definir manualmente tus datos
    const data = [
      {
        code: "001",
        name: "Producto 1",
        category: "Categoria 1",
        quantity: 10,
      },
      {
        code: "002",
        name: "Producto 2",
        category: "Categoria 2",
        quantity: 20,
      },
      {
        code: "003",
        name: "Producto 3",
        category: "Categoria 1",
        quantity: 15,
      },
      // Agrega más objetos de datos según sea necesario
    ];

    setProducts(data);
  }, []);

  return (
    <>
    <div
        className="card"
        style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}
      >
        <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
          <Column field="code" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="quantity" header="Quantity"></Column>
        </DataTable>
      </div>
      <br></br>
      <br></br>
    </>
  );
}
