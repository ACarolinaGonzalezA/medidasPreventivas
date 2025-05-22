import React from "react";
import "./Desfile.css";



function Desfile({ compromisos }) {
  if (compromisos.length === 0) {
    return <p className="text-center mt-10 text-gray-600 italic">No hay compromisos desfilando aún.</p>;
  }

  return (
    <div className="relative overflow-x-auto overflow-y-hidden bg-transparent py-4 px-8 h-[500px] sm:h-[500px]">
      <div className="whitespace-nowrap animate-marquee flex gap-8 items-end">
        {compromisos.map((c, i) => (
          <div
            key={i}
            className="inline-block w-[300px] p-4 animate-fade-in"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <div className="relative w-[320px] h-[320px] mx-auto">
              {/* Imagen floral */}
              <img
                src="/silleta.png"
                alt="silleta"
                className="absolute inset-0 w-full h-full object-contain z-[1]"
              />

              {/* Contenido dentro de la corona */}
              <div className="absolute inset-0 flex items-center justify-center text-center z-[2]">
                <div className="w-[160px] h-[160px] flex flex-col justify-center items-center px-1 text-white text-[12px] sm:text-[13px] md:text-[14px] leading-tight">
                  <p className="text-[16px] font-bold leading-tight break-words word-break w-full">
                    {c.familia || "Anónimo"}
                  </p>
                  <p className="text-[16px] leading-tight break-words word-break w-full mt-">
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