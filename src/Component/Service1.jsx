import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Aeroplane from "../assets/Aeroplane1.png";
import Railway from "../assets/Railway.png";
import Ocean from "../assets/Ocean.png";
import {
  Plane,
  Train,
  Ship,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  PackageCheck,
} from "lucide-react";

const PremiumServiceSection = () => {
  const [activeId, setActiveId] = useState(1);

  const services = [
    {
      id: 1,
      title: "Air Transportation",
      subtitle: "Fastest Global Delivery",
      icon: <Plane size={24} />,
      img: Aeroplane,
      description:
        "Localmate’s air freight services ensure time-critical shipments are delivered with precision, speed, and complete real-time visibility.",
      points: ["Express Shipping", "Secure Handling", "Customs Support"],
    },
    {
      id: 2,
      title: "Rail Transportation",
      subtitle: "Eco-Friendly Bulk Logistics",
      icon: <Train size={24} />,
      img: Railway,
      description:
        "Rail logistics by Localmate provide cost-efficient and sustainable transportation for heavy, long-distance, and bulk cargo.",
      points: ["Lower Cost", "High Capacity", "Safe Transit"],
    },
    {
      id: 3,
      title: "Ocean Freight",
      subtitle: "Global Maritime Shipping",
      icon: <Ship size={24} />,
      img: Ocean,
      description:
        "We offer FCL and LCL ocean freight solutions with global port coverage, reliable schedules, and end-to-end cargo management.",
      points: ["FCL & LCL", "Port-to-Port", "Worldwide Network"],
    },
  ];

  return (
    <section
      className="bg-[#0a1d37] py-24 px-6 relative overflow-hidden font-sans min-h-[950px] flex items-center"
      aria-labelledby="premium-logistics-heading"
    >
      {/* Background Branding */}
      <div className="absolute top-0 right-0 text-[12rem] font-black text-white/[0.02] select-none pointer-events-none uppercase italic leading-none">
        Localmate
      </div>
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 blur-[150px] rounded-full"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-600 px-3 py-1 rounded-sm">
                <span className="text-white font-black text-sm uppercase">
                  Localmate
                </span>
              </div>
              <span className="text-gray-500 uppercase font-bold tracking-widest text-[10px]">
                Premium Logistics Solutions
              </span>
            </div>

            <h2
              id="premium-logistics-heading"
              className="text-2xl md:text-4xl lg:text-6xl font-black text-white uppercase italic leading-[1.1]"
            >
              Smart{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px #dc2626" }}
              >
                Shipping
              </span>{" "}
              <br /> & Secure Logistics Systems
            </h2>
          </div>

          <div className="lg:max-w-xs border-l-2 border-red-600 pl-6 py-2">
            <p className="text-gray-400 text-sm leading-relaxed italic">
              “At Localmate, we don’t just move cargo — we deliver trust,
              reliability, and long-term logistics partnerships.”
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT – SERVICE LIST */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
            {services.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setActiveId(item.id)}
                className={`relative group cursor-pointer transition-all duration-500 p-6 rounded-3xl border ${
                  activeId === item.id
                    ? "bg-white/5 border-white/10 shadow-2xl"
                    : "bg-transparent border-transparent"
                }`}
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`p-4 rounded-2xl transition-all duration-500 ${
                      activeId === item.id
                        ? "bg-red-600 text-white rotate-[360deg]"
                        : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {item.icon}
                  </div>

                  <div className="flex-1">
                    <h4
                      className={`text-2xl font-black uppercase italic ${
                        activeId === item.id ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p className="text-red-600 text-[9px] font-bold uppercase tracking-widest">
                      {item.subtitle}
                    </p>
                  </div>

                  <motion.div
                    animate={{
                      x: activeId === item.id ? 0 : -10,
                      opacity: activeId === item.id ? 1 : 0,
                    }}
                  >
                    <ArrowRight className="text-red-600" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {activeId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-20 mt-4"
                    >
                      <p className="text-gray-400 text-xs mb-4">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.points.map((p, i) => (
                          <span
                            key={i}
                            className="text-[8px] font-bold bg-white/10 text-white px-2 py-1 rounded-full flex items-center gap-1"
                          >
                            <ShieldCheck size={10} className="text-red-500" />
                            {p}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* RIGHT – IMAGE SHOWCASE */}
          <div className="lg:col-span-7 relative">
            <div className="relative h-full min-h-[400px] rounded-[3rem] overflow-hidden border-8 border-white/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <img
                    src={services.find((s) => s.id === activeId).img}
                    alt={`${
                      services.find((s) => s.id === activeId).title
                    } logistics service by Localmate`}
                    className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                </motion.div>
              </AnimatePresence>

              {/* Floating Badges */}
              <div className="absolute bottom-10 left-10 flex gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <Zap className="text-red-500 mb-2" size={20} />
                  <p className="text-white font-black text-xs italic">
                    99.9% On-Time
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <Globe className="text-red-500 mb-2" size={20} />
                  <p className="text-white font-black text-xs italic">
                    Global Coverage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumServiceSection;
