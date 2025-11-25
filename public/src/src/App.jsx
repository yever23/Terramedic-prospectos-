import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building2, Landmark, User, Phone, ExternalLink, ArrowRight, Download } from 'lucide-react';

const estados = [
  "Aguascalientes","Baja California","Baja California Sur","Campeche","Chiapas","Chihuahua",
  "CDMX","Coahuila","Colima","Durango","Guanajuato","Guerrero","Hidalgo","Jalisco",
  "México","Michoacán","Morelos","Nayarit","Nuevo León","Oaxaca","Puebla","Querétaro",
  "Quintana Roo","San Luis Potosí","Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala",
  "Veracruz","Yucatán","Zacatecas"
];

const datos = {
  "CDMX": { portal: "https://tianguisdigital.finanzas.cdmx.gob.mx/", hospitales: ["Ángeles Pedregal","Médica Sur","ABC Santa Fe"] },
  "Jalisco": { portal: "https://contratacionesabiertas.jalisco.gob.mx/", hospitales: ["Puerta de Hierro","San Javier","Real San José"] },
  "Nuevo León": { portal: "https://www.nl.gob.mx/contrataciones", hospitales: ["Zambrano Hellion","Muguerza","Doctors Hospital"] },
  "General": { portal: "https://compranet.hacienda.gob.mx/" }
};

export default function App() {
  const [estado, setEstado] = useState("");
  const [tab, setTab] = useState("gobierno");
  const info = datos[estado] || datos["General"];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-teal-700 text-white p-4 sticky top-0">
        <h1 className="text-2xl font-bold text-center">TM HUNTER 2025</h1>
        <div className="mt-3 relative">
          <MapPin className="absolute left-3 top-3 w-6 h-6" />
          <select className="w-full pl-12 pr-4 py-3 rounded-lg text-black font-bold" value={estado} onChange={e=>setEstado(e.target.value)}>
            <option value="">Elige estado...</option>
            {estados.map(e=><option key={e}>{e}</option>)}
          </select>
        </div>
      </header>

      {!estado ? (
        <div className="text-center pt-20">
          <Search className="w-24 h-24 mx-auto text-gray-300" />
          <p className="text-xl mt-4">Selecciona un estado para cazar licitaciones y contactos</p>
        </div>
      ) : (
        <div className="p-4">
          <div className="flex gap-2 mb-4">
            <button onClick={()=>setTab("gobierno")} className={`flex-1 py-3 rounded ${tab==="gobierno"?"bg-teal-600 text-white":"bg-gray-200"}`}>Gobierno</button>
            <button onClick={()=>setTab("privado")} className={`flex-1 py-3 rounded ${tab==="privado"?"bg-blue-600 text-white":"bg-gray-200"}`}>Privado</button>
          </div>

          {tab==="gobierno" && (
            <div className="space-y-4">
              <a href={`https://www.google.com/search?q=site:gob.mx+osteosíntesis+${estado}+2025+filetype:pdf`} target="_blank" className="block bg-white p-6 rounded-xl shadow text-center">
                <Search className="w-12 h-12 mx-auto text-teal-600" />
                <p className="font-bold mt-2">Licitaciones activas 2025-2026</p>
              </a>
              <a href={info.portal} target="_blank" className="block bg-teal-600 text-white text-center py-4 rounded-xl font-bold">
                Portal oficial {estado} <ExternalLink className="inline ml-2" />
              </a>
            </div>
          )}

          {tab==="privado" && info.hospitales?.length > 0 && (
            <div className="space-y-4">
              {info.hospitales.map(h => (
                <div key={h} className="bg-white p-6 rounded-xl shadow">
                  <h3 className="font-bold text-lg">{h}</h3>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <a href={`https://www.google.com/search?q="${h}"+"Jefe de compras"+LinkedIn`} target="_blank" className="bg-blue-600 text-white text-center py-3 rounded">LinkedIn</a>
                    <a href={`https://www.google.com/search?q="${h}"+teléfono+compras`} target="_blank" className="bg-gray-200 text-center py-3 rounded">Teléfono</a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
