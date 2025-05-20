import React from "react";
import "./Desfile.css";
import { db, collection, onSnapshot, query } from "../firebase";


function Desfile({ compromisos }) {
  if (compromisos.length === 0) {
    return <p className="text-center mt-10 text-gray-600 italic">No hay compromisos desfilando aún.</p>;
  }

  return (
    <div className="relative overflow-hidden rounded-l bg-yellow-0 p-20 h-[450px] font-['font-quicksand']">
      <div className="whitespace-nowrap animate-marquee flex gap-8">
      {compromisos.map((c, i) => (
  <div
    key={i}
    className="inline-block w-[300px] p-10 animate-fade-in"
    style={{ animationDelay: `${i * 0.2}s` }}
  >
    <div className="relative w-[320px] h-[320px] mx-auto">
      {/* Imagen floral */}
      <img
        src="/silla.png"
        alt="silleta"
        className="absolute inset-0 w-full h-full object-contain  rounded-full"
      />
      
      {/* Contenido dentro de la corona */}
  <div className="absolute inset-0 flex items-center justify-center text-center px-4">
  <div className="w-[180px] h-[180px] flex flex-col justify-center items-center text-black text-center break-words px-2">
  <p className="text-[14px] font-bold leading-tight break-words word-break w-full">
    {c.familia || "Anónimo"}
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