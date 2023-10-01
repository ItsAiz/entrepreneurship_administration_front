import React, { useEffect, useRef, useState } from "react";
import EventsTable from "./EventsTable";
import GroupDemo from "../mdc/menu";
import { Button } from "primereact/button";
import EventsForm from "./EventsForm";
import EventApi from "../../api/EventApi";

const EventsAdminView = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [viewForm, setViewForm] = useState(false);
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
    async function fetchEvents() {
      try {
        const resp = await EventApi.getEvents();
        setEvents(resp.data);
      } catch (error) {
        showSticky({
          severity: "error",
          summary: "Error",
          detail: "Hubo un error en la solicitud: " + error.message,
        });
      }
    }
    fetchEvents();
  }, []);

  return (
    <>
      {viewForm ? (
        <div className="p-grid">
          <div className="p-col-3" style={{ marginRight: "20px" }}>
            <GroupDemo />
          </div>
          <div
            className="p-col-12"
            style={{ width: "84%", marginBottom: "20px", marginTop: "8px" }}
          >
            <EventsForm />
          </div>
        </div>
      ) : (
        <>
          {events.slice(page * 5 - 5, page * 5).length > 0 ? (
            <>
              <div className="p-grid">
                <div className="p-col-3" style={{ marginRight: "20px" }}>
                  <GroupDemo />
                </div>
                <div
                  className="p-col-12"
                  style={{ width: "84%", marginTop: "10px" }}
                >
                  <Button
                    label="Crear un Evento"
                    icon="pi pi-plus"
                    style={{
                      backgroundColor: "#4DCFF2",
                      borderColor: "#4DCFF2",
                      width: "250px",
                    }}
                    onClick={() => setViewForm(!viewForm)}
                  />
                  <EventsTable events={events.slice(page * 5 - 5, page * 5)} />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "1.25rem",
                  marginLeft: "200px",
                }}
              >
                <div className="join" data-theme="corporate">
                  <button
                    className="join-item btn"
                    style={{
                      fontSize: "1.5rem",
                      backgroundColor: "#F2CB05",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      page > 1 && setPage(page - 1);
                    }}
                  >
                    «
                  </button>
                  <button
                    className="join-item btn"
                    style={{
                      fontSize: "1rem",
                      margin: "0 0.5rem",
                      backgroundColor: "#F2CB05",
                      cursor: "pointer",
                    }}
                  >
                    Página {page}
                  </button>
                  <button
                    className="join-item btn"
                    style={{
                      fontSize: "1.5rem",
                      backgroundColor: "#F2CB05",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      events.slice(page * 5 - 5, page * 5).length > 0 &&
                        setPage(page + 1);
                    }}
                  >
                    »
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="hero min-h-screen"
            >
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                className="hero-content text-center flex-col"
              >
                <div
                  style={{
                    maxWidth: "20rem",
                  }}
                  className="max-w-md"
                >
                  <h1
                    style={{
                      fontSize: "1.875rem",
                      fontWeight: "bold",
                      paddingTop: "2.5rem",
                      paddingBottom: "2.5rem",
                    }}
                    className="text-3xl font-bold py-10"
                  >
                    No hay eventos para ver
                  </h1>
                </div>
                <div
                  className="flex justify-center content-center p-5"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1.25rem",
                  }}
                >
                  <div className="join" data-theme="corporate">
                    <button
                      className="join-item btn"
                      style={{
                        fontSize: "1.5rem",
                        backgroundColor: "#F2CB05",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        page > 1 && setPage(page - 1);
                      }}
                    >
                      «
                    </button>
                    <button
                      className="join-item btn"
                      style={{
                        fontSize: "1rem",
                        margin: "0 0.5rem",
                        backgroundColor: "#F2CB05",
                        cursor: "pointer",
                      }}
                    >
                      Página {page}
                    </button>
                    <button
                      className="join-item btn"
                      style={{
                        fontSize: "1.5rem",
                        backgroundColor: "#F2CB05",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        events.slice(page * 8 - 8, page * 8).length > 0 &&
                          setPage(page + 1);
                      }}
                    >
                      »
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EventsAdminView;
