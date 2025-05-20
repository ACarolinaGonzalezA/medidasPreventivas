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
        // Recargar compromisos para que aparezca el nuevo
        const res2 = await fetch("http://localhost:4000/api/buenas_practicas");
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
    <div>
      <h1 className="text-4xl font-bold text-black text-center my-5">
      Buenas pácticas de salvaguardia 
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
