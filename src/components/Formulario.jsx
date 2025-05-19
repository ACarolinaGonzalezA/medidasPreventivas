import { useState } from "react";
import { validarFormulario } from "../utils/validarFormulario";

const VEREDAS = [
  "Barro Blanco", "El Cerro", "El Llano", "El Plan", "El Placer",
  "El Porvenir", "El Rosario", "La Palma", "La Quiebra", "Mazo",
  "Media Luna", "Piedra Gorda", "Piedras Blancas", "Sector Central",
  "San Ignacio", "San Miguel", "Perico", "Pantanillo", "Otra"
];

const ORGANIZACIONES = [
  "Cosse", "Cortusigu", "Corporación flores del silletero",
  "Familia Londoño 2", "Casa de las flores", "Ninguna", "Otra"
];

const PROBLEMAS = [
  "Uso indiscriminado del agua",
  "Deterioro de jardines y zonas verdes en los predios silleteros",
  "Mal manejo de residuos sólidos o basura",
  "Desaprovechamiento y mal manejo de residuos orgánicos",
  "Utilización de material plástico de un solo uso",
  "Afectación a la fauna (animales) por emisión de ruido",
  "Exceso de visitantes o turistas al predio familiar"
];

export default function Formulario({ onSubmitCompromiso }) {
  const [form, setForm] = useState({
    nombre_completo: "",
    familia: "",
    vereda: "",
    otra_vereda: "",
    organizaciones: "",
    otra_organizacion: "",
    correo_electronico: "",
    numero_celular: "",
    nombre_practica: "",
    problema: "",
    descripcion: ""
  });

  const [errores, setErrores] = useState({});
  const [showModal, setShowModal] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  
  function handleCheckboxChange(e) {
    const value = e.target.value;
    let seleccionadas = form.organizaciones ? form.organizaciones.split(", ") : [];

    if (e.target.checked) {
      if (!seleccionadas.includes(value)) {
        seleccionadas.push(value);
      }
    } else {
      seleccionadas = seleccionadas.filter((org) => org !== value);
    }

    setForm({ ...form, organizaciones: seleccionadas.join(", ") });
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    const nuevosErrores = validarFormulario(form);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    onSubmitCompromiso(form);
    setShowModal(true);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-xl mx-auto" noValidate>
        <input
          name="nombre_completo"
          placeholder="Nombre completo *"
          value={form.nombre_completo}
          onChange={handleChange}
        />
        {errores.nombre_completo && <p className="text-red-600 text-sm">{errores.nombre_completo}</p>}

        <input
          name="familia"
          placeholder="Nombre de la familia *"
          value={form.familia}
          onChange={handleChange}
        />
        {errores.familia && <p className="text-red-600 text-sm">{errores.familia}</p>}

        <select name="vereda" value={form.vereda} onChange={handleChange}>
          <option value="">Seleccione una vereda *</option>
          {VEREDAS.map((v, i) => <option key={i} value={v}>{v}</option>)}
        </select>
        {errores.vereda && <p className="text-red-600 text-sm">{errores.vereda}</p>}

        {form.vereda === "Otra" && (
          <>
            <input
              name="otra_vereda"
              placeholder="Otra vereda"
              value={form.otra_vereda}
              onChange={handleChange}
            />
            {errores.otra_vereda && <p className="text-red-600 text-sm">{errores.otra_vereda}</p>}
          </>
        )}

        <label><strong>Organizaciones a las que pertenece:</strong></label>
        {ORGANIZACIONES.map((org) => (
          <label key={org} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={org}
              checked={form.organizaciones.includes(org)}
              onChange={handleCheckboxChange}
            />
            {org}
          </label>
        ))}
        {errores.organizaciones && <p className="text-red-600 text-sm">{errores.organizaciones}</p>}

        {form.organizaciones.includes("Otra") && (
          <>
            <input
              name="otra_organizacion"
              placeholder="Escribe el nombre de la otra organización"
              value={form.otra_organizacion}
              onChange={handleChange}
            />
            {errores.otra_organizacion && <p className="text-red-600 text-sm">{errores.otra_organizacion}</p>}
          </>
        )}

        <input
          type="email"
          name="correo_electronico"
          placeholder="Correo electrónico *"
          value={form.correo_electronico}
          onChange={handleChange}
        />
        {errores.correo_electronico && <p className="text-red-600 text-sm">{errores.correo_electronico}</p>}

        <input
          name="numero_celular"
          placeholder="Número celular (10 dígitos)"
          value={form.numero_celular}
          onChange={handleChange}
        />
        {errores.numero_celular && <p className="text-red-600 text-sm">{errores.numero_celular}</p>}

        <input
          name="nombre_practica"
          placeholder="Nombre de la buena práctica *"
          value={form.nombre_practica}
          onChange={handleChange}
        />
        {errores.nombre_practica && <p className="text-red-600 text-sm">{errores.nombre_practica}</p>}

        <select name="problema" value={form.problema} onChange={handleChange}>
          <option value="">¿Qué problema ayuda a resolver?</option>
          {PROBLEMAS.map((p, i) => <option key={i} value={p}>{p}</option>)}
        </select>

        <textarea
          name="descripcion"
          placeholder="Explique la buena práctica"
          value={form.descripcion}
          onChange={handleChange}
        />
        {errores.descripcion && <p className="text-red-600 text-sm">{errores.descripcion}</p>}

        <button
          type="submit"
          className="bg-green-600 text-white rounded px-4 py-2"
        >
          Enviar
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-2">¡Haz parte del compromiso con la cultura silletera!</h2>
            <p className="mb-4">
              Registra tus buenas prácticas o medidas preventivas para la salvaguardia de la pintura silletera a través de fotos o videos (con la fecha visible) y envíalas al correo <b>evaluacionpesmcsilletera@gmail.com</b>.
              <br /><br />
              Tu dedicación será valorada: quienes participen podrán recibir un reconocimiento especial por su compromiso con esta tradición viva.
              <br /><br />
              ¡Sé ejemplo y deja huella!
            </p>
            <button onClick={() => setShowModal(false)} className="bg-green-600 text-white px-4 py-2 rounded">Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}