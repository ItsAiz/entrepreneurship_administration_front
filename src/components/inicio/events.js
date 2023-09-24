import { useEffect, useState } from "react";
import './events.css'

const Events = () => {
  const [events, setEvents] = useState([
    {
      titulo: "Venta en la plaza del sol",
      fecha: "11-06-2000",
      descripcion:
        "Se realizara una venta con todos los emprendimientos en la plaza del sol, la cual es la plaza principal de la seccional Sogamoso",
      imagen:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Logo_de_la_UPTC.svg/640px-Logo_de_la_UPTC.svg.png",
    },
    {
      titulo: "Venta en la plaza del sol",
      fecha: "11-06-2000",
      descripcion:
        "Se realizara una venta con todos los emprendimientos en la plaza del sol, la cual es la plaza principal de la seccional Sogamoso",
      imagen:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Logo_de_la_UPTC.svg/640px-Logo_de_la_UPTC.svg.png",
    },
    {
      titulo: "Venta en la plaza del sol",
      fecha: "11-06-2000",
      descripcion:
        "Se realizara una venta con todos los emprendimientos en la plaza del sol, la cual es la plaza principal de la seccional Sogamoso",
      imagen:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Logo_de_la_UPTC.svg/640px-Logo_de_la_UPTC.svg.png",
    },
    {
      titulo: "Venta en la plaza del sol",
      fecha: "11-06-2000",
      descripcion:
        "Se realizara una venta con todos los emprendimientos en la plaza del sol, la cual es la plaza principal de la seccional Sogamoso",
      imagen:
        "https://www.uptc.edu.co/sitio/export/sites/default/portal/.content/imagenes/frontal/uptc_radio_logo.jpg_1618313331.jpg",
    },
    {
      titulo: "Venta en la plaza del sol",
      fecha: "11-06-2000",
      descripcion:
        "Se realizara una venta con todos los emprendimientos en la plaza del sol, la cual es la plaza principal de la seccional Sogamoso",
      imagen:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Logo_de_la_UPTC.svg/640px-Logo_de_la_UPTC.svg.png",
    },
  ]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch("");
      const data = await response.json();
      setEvents(data);
    }
    fetchEvents();
  }, []);

  return (
    <>
      {events.slice(page * 8 - 8, page * 8).length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-8 p-10 h-full w-full md:grid-cols-3 lg:grid-cols-4">
            {events.slice(page * 8 - 8, page * 8).map((event) => (
              <div
                className="card md:w-80 bg-base-100 shadow-lg shadow-gray-500"
                data-theme="corporate"
              >
                <figure className="px-5 pt-5">
                  <img
                    src={event.imagen}
                    alt="pet"
                    className="h-72 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title" style={{ fontWeight: "bold" }}>
                    {event.titulo}
                  </h2>
                  <p className="badge badge-secondary">{event.fecha}</p>
                  <p className="font-light">{event.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center content-center p-5">
            <div className="join" data-theme="corporate">
              <button
                className="join-item btn"
                onClick={() => {
                  page > 1 && setPage(page - 1);
                }}
              >
                «
              </button>
              <button className="join-item btn">Página {page}</button>
              <button
                className="join-item btn"
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
        <div className="hero min-h-screen">
          <div className="hero-content text-center flex-col">
            <div className="max-w-md">
              <h1 className="text-3xl font-bold py-10">
                No hay eventos 
              </h1>
            </div>
            <div className="flex justify-center content-center">
              <div className="join" data-theme="corporate">
                <button
                  className="join-item btn"
                  onClick={() => {
                    page > 0 && setPage(page - 1);
                  }}
                >
                  «
                </button>
                <button className="join-item btn">Página {page}</button>
                <button
                  className="join-item btn"
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
