import React from "react";
import { motion } from "framer-motion";

const partners = [
  {
    id: 1,
    name: "Logotype",
    logo: "https://via.placeholder.com/150x50?text=Logotype",
  },
  {
    id: 2,
    name: "Duragas",
    logo: "https://via.placeholder.com/150x50?text=Duragas",
  },
  {
    id: 3,
    name: "Turbologo",
    logo: "https://via.placeholder.com/150x50?text=Turbologo",
  },
  {
    id: 4,
    name: "Maxton Design",
    logo: "https://via.placeholder.com/150x50?text=Maxton",
  },
  {
    id: 5,
    name: "Turbologo Alt",
    logo: "https://via.placeholder.com/150x50?text=Turbologo",
  },
];

const PartnerLogos = () => {
  return (
    <div className="w-full py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header Section with Lines */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-[1px] bg-gray-200 flex-grow max-w-[400px]"></div>
          <h2 className="text-[#001529] font-bold text-lg md:text-xl whitespace-nowrap">
            Trusted and funded by more then{" "}
            <span className="text-red-600">900</span> companies
          </h2>
          <div className="h-[1px] bg-gray-200 flex-grow max-w-[400px]"></div>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 md:h-12 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerLogos;
