import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Desfile from "./components/Desfile";
import { db, collection, onSnapshot, addDoc } from "./firebase";


export default function App() {
  const [compromisos, setCompromisos] = useState([]);

  useEffect(() => {
    const q = collection(db, "compromisos");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const compromisosArr = [];
      querySnapshot.forEach((doc) => {
        compromisosArr.push({ id: doc.id, ...doc.data() });
      });
      setCompromisos(compromisosArr);
    });
    return () => unsubscribe();
  }, []);

  async function agregarCompromiso(form) {
    try {
      await addDoc(collection(db, "compromisos"), form);
    } catch (error) {
      console.error("Error guardando compromiso:", error);
    }
  }

  return (
    <div>
      <Formulario onSubmitCompromiso={agregarCompromiso} />
      <Desfile compromisos={compromisos} />
    </div>
  );
}
