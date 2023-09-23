import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import EnterpreneurshipApi from "../../api/EnterpreneurshipApi";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import EnterpreneurshipModal from "./enterpreneurshipRegister-modal";
import './enterpreneurStyles.css'

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
        const resp = await EnterpreneurshipApi.getEnterpreneurships();
        setEnterpreneurships(resp.data);
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

  const handleDelete = async (id) => {
    await EnterpreneurshipApi.deleteEnterpreneurship(id)
    .then((resp) => {
      setEnterpreneurships((prevData) =>
        prevData.filter((item) => item._id !== id)
      );
      showSticky({
        severity: "success",
        summary: "Success",
        detail: resp.state,
      });

    })
    .catch((err) => {
      showSticky({
        severity: "error",
        summary: "Error",
        detail: "Hubo un error en la solicitud: " + err.message,
      });
    });
  };

  const renderActions = (rowData) => {
    return (
      <div className="action-buttons">
        <Button
          label="Edit"
          icon="pi pi-pencil"
          className="p-button-sm p-button-info"
          onClick={() => handleEdit(rowData)}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-sm p-button-danger"
          onClick={() => handleDelete(rowData._id)}
        />
      </div>
    );
  };  

  return (
    <div className={"card p-datatable-responsive"} style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}>
      <Toast ref={toast} />
      {Array.isArray(enterpreneurships) && enterpreneurships.length > 0 ? (
        <DataTable value={enterpreneurships} className="p-datatable-sm">
          <Column field={'category'} header={'Categoría'} />
          <Column field={'name'} header={'Nombre'} />
          <Column field={'id_user.name'} header={'Cantidad'} />
          <Column field={'plan_status'} header={'Estado'} />
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
