import React from "react";
import { motion } from "framer-motion";

const partners = [
  {
    id: 1,
    name: "Logotype",
    logo: "https://cdn-icons-png.flaticon.com/512/882/882731.png",
  },
  {
    id: 2,
    name: "Duragas",
    logo: "https://cdn-icons-png.flaticon.com/512/882/882747.png",
  },
  {
    id: 3,
    name: "Turbologo",
    logo: "https://cdn-icons-png.flaticon.com/512/882/882730.png",
  },
  {
    id: 4,
    name: "Maxton",
    logo: "https://cdn-icons-png.flaticon.com/512/882/882736.png",
  },
  {
    id: 5,
    name: "Logotype Alt",
    logo: "https://cdn-icons-png.flaticon.com/512/882/882731.png",
  },
];

const PartnerLogos = () => {
  return (
    <div className="w-full py-20 bg-[#020617] relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-red-600/50 flex-grow hidden md:block"></div>

          <div className="text-center px-4">
            <h2 className="text-white font-black   uppercase text-xs md:text-sm tracking-[0.4em] mb-2">
              Strategic <span className="text-red-600">Alliances</span>
            </h2>
            <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">
              Trusted by more than{" "}
              <span className="text-white border-b border-red-600">900+</span>{" "}
              global enterprises
            </p>
          </div>

          <div className="h-[1px] bg-gradient-to-l from-transparent via-white/10 to-red-600/50 flex-grow hidden md:block"></div>
        </div>

        {/* --- LOGOS GRID WITH INTERACTIVE CARDS --- */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 items-center">
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              whileHover={{
                y: -5,
                backgroundColor: "rgba(255, 255, 255, 0.03)",
              }}
              className="group relative flex items-center justify-center h-24 md:h-32 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm transition-all duration-500 overflow-hidden"
            >
              {/* Hover Red Line Effect */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 group-hover:w-full transition-all duration-500" />

              <img
                src={partner.logo}
                alt={partner.name}
                className="h-8 md:h-10 w-auto object-contain opacity-20 grayscale brightness-200 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-90 group-hover:scale-100"
              />

              {/* Subtle Scanline Animation on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-600/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* --- OPTIONAL BOTTOM DECOR --- */}
        <div className="mt-16 flex justify-center">
          <div className="px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500  ">
              Network Status: Fully Synchronized
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogos;
