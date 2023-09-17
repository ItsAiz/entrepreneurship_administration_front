import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import EnterpreneurshipApi from "../../api/EnterpreneurshipApi";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import EnterpreneurshipModal from "./enterpreneurshipRegister-modal";

const EnterpreneurshipManangement = () => {
  const [enterpreneurships, setEnterpreneurships] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useRef(null);

  const showSticky = (notificationData) => {
    toast.current.show({
      severity: notificationData.severity,
      summary: notificationData.summary,
      detail: notificationData.detail,
      life: 2000,
    });
  };

  useEffect(() => {
    const fetchEnterpreneurs = async () => {
      try {
        const enterpreneurshipData = await EnterpreneurshipApi.getEnterpreneurships();
        setEnterpreneurships(enterpreneurshipData);
      } catch (error) {
        showSticky({
          severity: "error",
          summary: "Error",
          detail: "Hubo un error en la solicitud: " + error.message,
        });
      }
    };
    fetchEnterpreneurs();
  }, []);

  const handleEdit = (enterpreneurshipData) => {
    setEditingData(enterpreneurshipData);
    setIsModalOpen(true);
  };

  const handleDelete = async (enterpreneurshipData) => {
    try {
      const resp = await EnterpreneurshipApi.deleteEnterpreneurship(enterpreneurshipData.id);
      showSticky({
          severity: "success",
          summary: "Success",
          detail: resp,
      });
  } catch (error) {
      showSticky({
          severity: "error",
          summary: "Error",
          detail: "Hubo un error en la solicitud: " + error.message,
      });
  }
  };

  const renderActions = (rowData) => {
    return (
      <div style={{ textAlign: "center" }}>
        <Button
          label="Edit"
          icon="pi pi-pencil"
          className="p-button-sm p-button-info"
          style={{ marginRight: "5px" }}
          onClick={() => handleEdit(rowData)}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-sm p-button-danger"
          onClick={() => handleDelete(rowData)}
        />
      </div>
    );
  };

  return (
    <div className={"card"} style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}>
      <Toast ref={toast} />
      {Array.isArray(enterpreneurships) && enterpreneurships.length > 0 ? (
        <DataTable value={enterpreneurships}>
          <Column field={'code'} header={'Código'} />
          <Column field={'name'} header={'Nombre'} />
          <Column field={'category'} header={'Categoría'} />
          <Column field={'quantity'} header={'Cantidad'} />
          <Column
            body={renderActions}
            header={'Acciones'}
            style={{ textAlign: 'center' }}
          />
        </DataTable>
      ) : (
        <div style={{ textAlign: "center", padding: "20px", fontSize: "18px", color: "#777" }}>
          <p>No se encontraron datos.</p>
        </div>
      )}

      {isModalOpen && (
        <EnterpreneurshipModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialEntrepreneurshipData={editingData}
        />
      )}
    </div>
  );
};

export default EnterpreneurshipManangement;
