import React, { useEffect, useState } from "react";
import EventsTable from "./EventsTable";

const EventsAdminView = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch(
        "https://emprendimientos-uptc.vercel.app/events"
      );
      const data = await response.json();
      setEvents(data.data);
    }
    fetchEvents();
  }, []);

  return (
    <>
      {events.slice(page * 8 - 8, page * 8).length > -1 ? (
        <>
          <div style={{padding: "20px"}}>
            <EventsTable events={events.slice(page * 8 - 8, page * 8)} />
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
  );
};

export default EventsAdminView;
