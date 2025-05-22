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
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center my-5 px-4">
        Buenas prácticas de salvaguardia de la cultura silletera
      </h1>
      {!enviado ? (
        <Formulario
          onSubmitCompromiso={agregarCompromiso}
          onConfirm={() => {
            console.log("App recibió confirmación del modal");
            setEnviado(true);
          }}
        />
      ) : (
        <Desfile compromisos={compromisos} />
      )}
    </div>

  );
}
