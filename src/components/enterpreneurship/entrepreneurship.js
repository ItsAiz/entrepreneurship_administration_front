import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import EnterpreneurshipApi from "../../api/EnterpreneurshipApi";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import EnterpreneurshipModal from "./enterpreneurshipRegister-modal";
import "./enterpreneurStyles.css";
import GroupDemo from "../mdc/menu";

const EnterpreneurshipManangement = () => {
  const [enterpreneurships, setEnterpreneurships] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [rol, setRol] = useState('');
  const toast = useRef(null);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const showSticky = (notificationData) => {
    toast.current.show({
      severity: notificationData.severity,
      summary: notificationData.summary,
      detail: notificationData.detail,
      life: 2000,
    });
  };

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
    setRol(localStorage.getItem('userRole'))
  }, []);

  useEffect(() => {
    if (userName !== '' && rol !== '') {
      const fetchData = () => {
        if (userName && rol === 'Estudiante') {
          EnterpreneurshipApi.getEnterpreneurshipsByUser(userName)
            .then((resp) => {
              setEnterpreneurships(resp.data);
            })
            .catch((err) => {
              showSticky({
                severity: "error",
                summary: "Error",
                detail: "Problema al intentar obtener los emprendimientos: " + err.message,
              });
            });
        } else {
          EnterpreneurshipApi.getEnterpreneurships()
            .then((resp) => {
              setEnterpreneurships(resp.data);
            })
            .catch((error) => {
              showSticky({
                severity: "error",
                summary: "Error",
                detail: "Hubo un error en la solicitud: " + error.message,
              });
            });
        }
      };
    
      fetchData();
    }
  }, [userName, rol]);
  
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
    <div className="p-grid">
      <div className="p-col-3" style={{ marginRight: "20px" }}>
        <GroupDemo/>
      </div>
      <div className="p-col-12" style={{ width: "100%" }}>
        <div
          className={"card p-datatable-responsive scrollable-table"}
          style={{ width: "100%" }}
        >
          <Toast ref={toast} />
          {Array.isArray(enterpreneurships) && enterpreneurships.length > 0 ? (
            <DataTable value={enterpreneurships} className="p-datatable-lg">
              <Column field={"category"} header={"Categoría"} />
              <Column field={"name"} header={"Nombre"} />
              <Column field={"id_user.name"} header={"Cantidad"} />
              <Column field={"plan_status"} header={"Estado"} />
              {(rol === 'Administrador' || rol === 'Estudiante') && isLoggedIn ? (
                <Column
                  body={renderActions}
                  header={"Acciones"}
                  style={{ textAlign: "center" }}
                />
              ) : null}
            </DataTable>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "20px",
                fontSize: "18px",
                color: "#777",
              }}
            >
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
      </div>
    </div>
  );
};

export default EnterpreneurshipManangement;
