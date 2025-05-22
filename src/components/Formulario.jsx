import { useState } from "react";
import { validarFormulario } from "../utils/validarFormulario";
import Modal from "./Modal";

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
  "Utilización de material plástico de un solo uso (bolsas, empaques, envases, cubiertos, etc.)",
  "Afectación a la fauna (animales) por emisión de ruido",
  "Exceso de visitantes o de turistas al predio familiar"
];

export default function Formulario({ onSubmitCompromiso, onConfirm }) {
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
    descripcion: "",
    redes: ""
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


  async function handleSubmit(e) {
    e.preventDefault();
    const nuevosErrores = validarFormulario(form);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    try {
      const exito = await onSubmitCompromiso(form);
      if (exito) {
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error al enviar:", error);
    }
  }

  return (
    <div className="flex justify-center px-4 py-8 bg-gray-10 min-h-screen">

      <form onSubmit={handleSubmit} className="w-full max-w-xl p-6 rounded-2xl shadow-lg space-y-4"
        style={{ backgroundColor: 'rgba(223, 130, 38, 0.80)' }} noValidate>

        {/* Nombre completo */}
        <div>
          <label htmlFor="nombre_completo" className="block text-sm font-medium text-white">Nombre completo</label>
          <input
            id="nombre_completo"
            name="nombre_completo"
            value={form.nombre_completo}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errores.nombre_completo && <p className="text-red-600 text-sm mt-1">{errores.nombre_completo}</p>}
        </div>

        {/* Familia */}
        <div>
          <label htmlFor="familia" className="block text-sm font-medium text-white">Grupo familiar proponente</label>
          <input
            id="familia"
            name="familia"
            value={form.familia}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errores.familia && <p className="text-red-600 text-sm mt-1">{errores.familia}</p>}
        </div>

        {/* Vereda */}
        <div>
          <label htmlFor="vereda" className="block text-sm font-medium text-white">Vereda o sector de Santa Elena</label>
          <select
            id="vereda"
            name="vereda"
            value={form.vereda}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Seleccione una vereda</option>
            {VEREDAS.map((v, i) => <option key={i} value={v}>{v}</option>)}
          </select>
          {errores.vereda && <p className="text-red-600 text-sm mt-1">{errores.vereda}</p>}
        </div>

        {/* Otra vereda */}
        {form.vereda === "Otra" && (
          <div>
            <label htmlFor="otra_vereda" className="block text-sm font-medium text-white">Otra sector</label>
            <input
              id="otra_vereda"
              name="otra_vereda"
              value={form.otra_vereda}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errores.otra_vereda && <p className="text-red-600 text-sm mt-1">{errores.otra_vereda}</p>}
          </div>
        )}

        {/* Organizaciones */}
        <div>
          <label className="block text-sm font-medium text-white">Organización a la que pertenece</label>
          <div className="space-y-2 mt-2">
            {ORGANIZACIONES.map((org) => (
              <label key={org} className="flex items-center gap-2 text-sm text-white">
                <input
                  type="checkbox"
                  value={org}
                  checked={form.organizaciones.includes(org)}
                  onChange={handleCheckboxChange}
                />
                {org}
              </label>
            ))}
          </div>
          {errores.organizaciones && <p className="text-red-600 text-sm mt-1">{errores.organizaciones}</p>}
        </div>

        {/* Otra organización */}
        {form.organizaciones.includes("Otra") && (
          <div>
            <label htmlFor="otra_organizacion" className="block text-sm font-medium text-white">Otra organización</label>
            <input
              id="otra_organizacion"
              name="otra_organizacion"
              value={form.otra_organizacion}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errores.otra_organizacion && <p className="text-red-600 text-sm mt-1">{errores.otra_organizacion}</p>}
          </div>
        )}

        {/* Correo */}
        <div>
          <label htmlFor="correo_electronico" className="block text-sm font-medium text-white">Correo electrónico</label>
          <input
            id="correo_electronico"
            type="email"
            name="correo_electronico"
            value={form.correo_electronico}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errores.correo_electronico && <p className="text-red-600 text-sm mt-1">{errores.correo_electronico}</p>}
        </div>

        {/* Celular */}
        <div>
          <label htmlFor="numero_celular" className="block text-sm font-medium text-white">Número celular</label>
          <input
            id="numero_celular"
            name="numero_celular"
            value={form.numero_celular}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errores.numero_celular && <p className="text-red-600 text-sm mt-1">{errores.numero_celular}</p>}
        </div>

        {/* Problema */}
        <div>
          <label htmlFor="problema" className="block text-sm font-medium text-white">¿Qué problema quieres ayudar a resolver?</label>
          <select
            id="problema"
            name="problema"
            value={form.problema}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Seleccione una opción</option>
            {PROBLEMAS.map((p, i) => <option key={i} value={p}>{p}</option>)}
          </select>
          {errores.problema && <p className="text-red-600 text-sm mt-1">{errores.problema}</p>}
        </div>

        {/* Nombre práctica */}
        <div>
          <label htmlFor="nombre_practica" className="block text-sm font-medium text-white">Nombre de la buena práctica</label>
          <input
            id="nombre_practica"
            name="nombre_practica"
            value={form.nombre_practica}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errores.nombre_practica && <p className="text-red-600 text-sm mt-1">{errores.nombre_practica}</p>}
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-white">Explique la buena práctica</label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows="4"
            value={form.descripcion}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errores.descripcion && <p className="text-red-600 text-sm mt-1">{errores.descripcion}</p>}
        </div>

        {/* Redes */}
        <div>
          <label htmlFor="redes" className="block text-sm font-medium text-white">Resgistra tus redes sociales</label>
          <input
            id="redes"
            name="redes"
            value={form.redes}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>


        {/* Botón */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
          >
            Enviar compromiso
          </button>
        </div>
      </form>


      <Modal visible={showModal} onClose={() => { setShowModal(false); onConfirm(); }}>
        <h2 className="text-xl font-semibold mb-4 text-green-600">✅ ¡Formulario enviado con éxito!</h2>

        <p className="mb-2">La confirmación ha sido enviada a tu correo electrónico. Recuerda revisar tu carpeta de spam o correo no deseado</p>
        <p className="mb-2 text-sm text-gray-600">
        </p>
        <p className="mb-2">
          📸 No olvides enviar tus evidencias de buenas prácticas al correo: <span className="mb-4 font-medium text-orange-700 break-words">evaluacionpesmcsilletera@gmail.com</span> 
        </p>
        
        <p className="mb-6">Te invitamos a conocer nuestro <span className="font-semibold">Desfile de Buenas Prácticas de Salvaguardia de la Cultura Silletera</span></p>

        <button
          onClick={() => {
            setShowModal(false);
            onConfirm();
          }}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Aceptar
        </button>
      </Modal>

    </div>


  );
}