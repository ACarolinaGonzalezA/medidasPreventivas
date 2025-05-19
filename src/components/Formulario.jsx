import { useState } from "react";

export default function Formulario({ onSubmitCompromiso }) {
  const [form, setForm] = useState({
    nombre_completo: "",
    vereda: "",
    organizaciones: "",
    otra_organizacion: "",
    correo_electronico: "",
    numero_celular: "",
    nombre_practica: "",
    problema: "",
    descripcion: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validar campos obligatorios
    if (
      !form.nombre_completo ||
      !form.correo_electronico ||
      !form.nombre_practica
    ) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }

    onSubmitCompromiso(form);

    // Opcional: limpiar formulario
    // setForm({
    //   nombre_completo: "",
    //   vereda: "",
    //   organizaciones: "",
    //   otra_organizacion: "",
    //   correo_electronico: "",
    //   numero_celular: "",
    //   nombre_practica: "",
    //   problema: "",
    //   descripcion: ""
    // });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <input
        name="nombre_completo"
        placeholder="Nombre completo *"
        value={form.nombre_completo}
        onChange={handleChange}
        required
      />
      <input
        name="vereda"
        placeholder="Vereda"
        value={form.vereda}
        onChange={handleChange}
      />
      <input
        name="organizaciones"
        placeholder="Organizaciones"
        value={form.organizaciones}
        onChange={handleChange}
      />
      <input
        name="otra_organizacion"
        placeholder="Otra organización"
        value={form.otra_organizacion}
        onChange={handleChange}
      />
      <input
        type="email"
        name="correo_electronico"
        placeholder="Correo electrónico *"
        value={form.correo_electronico}
        onChange={handleChange}
        required
      />
      <input
        name="numero_celular"
        placeholder="Número celular"
        value={form.numero_celular}
        onChange={handleChange}
      />
      <input
        name="nombre_practica"
        placeholder="Nombre de la práctica *"
        value={form.nombre_practica}
        onChange={handleChange}
        required
      />
      <input
        name="problema"
        placeholder="Problema"
        value={form.problema}
        onChange={handleChange}
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
      />
      <button type="submit" style={{ padding: 10 }}>
        Enviar
      </button>
    </form>
  );
}
