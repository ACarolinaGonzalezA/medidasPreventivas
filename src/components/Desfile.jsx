import React from "react";
import "./Desfile.css";
import { db, collection, onSnapshot, query } from "../firebase";


function Desfile({ compromisos }) {
  if (compromisos.length === 0) {
    return <p className="text-center mt-10 text-gray-600 italic">No hay compromisos desfilando aún.</p>;
  }

  return (
    <div className="relative overflow-hidden border rounded-l bg-green-100 p-5 h-[320px] font-['font-quicksand']">
      <h2 className="text-lg font-bold text-green-800 mb-4 text-center">Desfile de compromisos</h2>
      <div className="whitespace-nowrap animate-marquee flex gap-8">
      {compromisos.map((c, i) => (
  <div
    key={i}
    className="inline-block w-[220px] p-2 animate-fade-in"
    style={{ animationDelay: `${i * 0.2}s` }}
  >
    <div className="relative w-[200px] h-[200px] mx-auto">
      {/* Imagen floral */}
      <img
        src="/corona.jpg"
        alt="corona floral"
        className="absolute inset-0 w-full h-full object-contain border-2 border-gray-300 rounded-full"
      />
      
      {/* Contenido dentro de la corona */}
  <div className="absolute inset-0 flex items-center justify-center text-center px-4">
  <div className="w-[180px] h-[180px] flex flex-col justify-center items-center text-black text-center break-words px-2">
  <p className="text-[14px] font-bold leading-tight break-words word-break w-full">
    {c.nombre_completo || "Anónimo"}
  </p>
  <p className="text-[12px] leading-tight break-words word-break w-full mt-">
    {c.nombre_practica}
  </p>
</div>
  </div>
</div>


    </div>
  
))}

      </div>
    </div>
  );
}

export default Desfile;