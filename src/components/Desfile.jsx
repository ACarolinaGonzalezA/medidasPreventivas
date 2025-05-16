import React from "react";
import "./Desfile.css";
import { useEffect, useState } from "react";
import { db, collection, onSnapshot, query } from "../firebase";


const perfiles = [
  "/niña.png",
  "/joven.png",
  "/adulto.png",
];

function Desfile({ compromisos }) {
    
  if (compromisos.length === 0) {
    return <p className="text-center mt-10">No hay compromisos desfilando aún.</p>;
  }

  return (
    <div className="relative overflow-hidden border rounded-lg bg-green-100 p-5 h-[300px]">
      <div className="whitespace-nowrap animate-marquee flex gap-10">
        {compromisos.map((c, i) => {
          const img = perfiles[i % perfiles.length];
          return (
            <div key={i} className="inline-block w-[200px] text-center">
              <img src={img} alt="silletero" className="h-32 mx-auto" />
              <p className="font-bold">{c.nombre || "Anónimo"}</p>
              <p className="text-sm italic">{c.medida}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Desfile;
