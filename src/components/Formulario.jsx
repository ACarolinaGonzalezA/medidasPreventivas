import { useState } from "react";
import { db, collection, addDoc } from "../firebase";

export default function Formulario({ onSubmitCompromiso }) {
    const [form, setForm] = useState({
      nombre: "",
      medida: "",
      contacto: "",
    });
  
    function handleChange(e) {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      if (!form.medida || !form.contacto) return;
      onSubmitCompromiso(form);
      setForm({ nombre: "", medida: "", contacto: "" });
    }
  
    return (
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Tu nombre (opcional)"
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <textarea
          name="medida"
          value={form.medida}
          onChange={handleChange}
          placeholder="Escribe tu medida preventiva"
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          name="contacto"
          value={form.contacto}
          onChange={handleChange}
          placeholder="Tu contacto"
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ padding: 10, width: "100%" }}>
          Guardar compromiso
        </button>
      </form>
    );
  }
