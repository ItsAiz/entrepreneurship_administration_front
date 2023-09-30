import React, { useState, useEffect, useRef } from "react";
import getComments from "../../api/apiComment";
import "./commentsStyles.css";
import GroupDemo from "../mdc/menu";
import { Card } from "primereact/card";

const EnterpreneurshipManangement = () => {
  const [enterpreneurships, setEnterpreneurships] = useState([]);
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
        const resp = await getComments.getComments();
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

  return (
    <div className="p-grid">
      <div className="p-col-3" style={{ marginRight: "20px" }}>
        <GroupDemo />
      </div>
      <div className="p-col-12" style={{ width: "100%" }}>
        {enterpreneurships.map((entrepreneurship, index) => (
          <div key={`${entrepreneurship.id}-${index}`} className="card">
            <div className="date-container">
              <p className="date">
                {new Date(entrepreneurship.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <Card title={entrepreneurship.name}>
              <p className="m-0">{entrepreneurship.email}</p>
              <p>{entrepreneurship.comment}</p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnterpreneurshipManangement;
