import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Image } from "primereact/image";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch("https://emprendimientos-uptc.vercel.app/events");
      const data = await response.json();
      setEvents(data.data);
    }
    fetchEvents();
  }, []);

  return (
    <>
      {events.slice(page * 8 - 8, page * 8).length > 0 ? (
        <>
          <div
            className="grid grid-cols-1 gap-8 p-10 h-full w-full md:grid-cols-3 lg:grid-cols-4"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "2rem",
              padding: "2.5rem",
              height: "100%",
              width: "100%",
            }}
          >
            {events.slice(page * 8 - 8, page * 8).map((event, index) => (
              <Card
                key={index}
                title={event.title}
                subTitle={event.date}
                header={
                  <div
                    className="container"
                    style={{
                      padding: "5px",
                      marginTop: "5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "320px",
                      width: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={event.image_name}
                      alt="Image"
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                      preview
                    />
                  </div>
                }
                className="md:w-25rem"
              >
                <p className="m-0">{event.description}</p>
              </Card>
            ))}
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
<<<<<<< HEAD
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
=======
        <div className="hero min-h-screen">
          <div className="hero-content text-center flex-col">
            <div className="max-w-md">
              <h1 className="text-3xl font-bold py-10">
                No hay eventos 
>>>>>>> 84a41f7a01b69530777e299727ea9596d6551eda
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

export default Events;
