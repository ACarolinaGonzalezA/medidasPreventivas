import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Desfile from "./components/Desfile";

export default function App() {
  const [compromisos, setCompromisos] = useState([]);
  const [enviado, setEnviado] = useState(false);
  const API_URL = import.meta.env.VITE_BACKEND;

  // Cargar las buenas prácticas desde backend y recargar cada 5 seg
  useEffect(() => {
    const fetchData = () => {
      fetch(`${API_URL}/api/buenas_practicas`)
        .then(res => res.json())
        .then(data => setCompromisos(data))
        .catch(err => console.error("Error cargando buenas prácticas:", err));
    };

    // Llamada inicial
    fetchData();

    // Llamar cada 5 segundos
    const interval = setInterval(fetchData, 5000);

    // Limpieza al desmontar
    return () => clearInterval(interval);
  }, []);

  // Función para enviar formulario al backend
  async function agregarCompromiso(form) {
    try {
      const res = await fetch(`${API_URL}/api/buenas_practicas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        // Recargar compromisos para que aparezca el nuevo
        const res2 = await fetch(`${API_URL}/api/buenas_practicas`);
        const data = await res2.json();
        setCompromisos(data);

        return true;

      } else {
        alert("Error al enviar el formulario");
        return false;
      }
    } catch (error) {
      console.error("Error enviando formulario:", error);
      return false;
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-end">
      <div
        className="my-5 px-4 py-4 rounded-md text-white"
        style={{ backgroundColor: "rgba(223, 130, 38, 0.8)" }}
      >
        {/* Contenedor horizontal: logo + título */}
        <div className="flex items-center justify-center mb-4">
          <img
            src="/sello.png"
            alt="Logo Silletero"
            className="hidden md:block mr-4 rounded-full object-cover"
            style={{ width: "150px", height: "150px" }}
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
            Buenas prácticas de salvaguardia de la cultura silletera
          </h1>
        </div>

        {/* Mensaje debajo, centrado */}
        <p className="text-center text-sm sm:text-base font-medium italic tracking-wide">
          En este 2025 la comunidad silletera reafirma su compromiso con el cuidado del medio ambiente y de la cultura durante la Feria de las Flores.
        </p>
      </div>
      {/* Botón de acceso directo al desfile */}
      {!enviado && (
        <div
        onClick={() => setEnviado(true)}
        className="flex items-center gap-2 mb-4 cursor-pointer text-white transition self-end"
      >
        <span className="font-semibold">Ver desfile</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white hover:opacity-80 transition"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={4}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
      )}
      {!enviado ? (
        <Formulario
          onSubmitCompromiso={agregarCompromiso}
          onConfirm={() => {
            console.log("App recibió confirmación del modal");
            setEnviado(true);
          }}
        />
      ) : (

        <>
          <div
  onClick={() => setEnviado(false)}
  className="flex items-center gap-2 self-start mb-4 cursor-pointer text-white transition"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white hover:opacity-80 transition"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={4}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
  <span className="font-semibold">Ver formulario</span>
</div>
          <Desfile compromisos={compromisos} />
        </>
      )}
    </div>

  );
}
