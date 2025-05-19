import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Desfile from "./components/Desfile";

export default function App() {
  const [compromisos, setCompromisos] = useState([]);
  const [enviado, setEnviado] = useState(false);

  // Cargar las buenas prácticas desde backend
  useEffect(() => {
    fetch("http://localhost:4000/api/buenas_practicas")
      .then(res => res.json())
      .then(data => setCompromisos(data))
      .catch(err => console.error("Error cargando buenas prácticas:", err));
  }, []);

  // Función para enviar formulario al backend
  async function agregarCompromiso(form) {
    try {
      const res = await fetch("http://localhost:4000/api/buenas_practicas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setEnviado(true);
        // Recargar compromisos para que aparezca el nuevo
        const res2 = await fetch("http://localhost:4000/api/buenas_practicas");
        const data = await res2.json();
        setCompromisos(data);
      } else {
        alert("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error enviando formulario:", error);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      {!enviado ? (
        <Formulario onSubmitCompromiso={agregarCompromiso} />
      ) : (
        <Desfile compromisos={compromisos} />
      )}
    </div>
  );
}
