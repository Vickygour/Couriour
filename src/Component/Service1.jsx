import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import {
  Plane,
  Train,
  Ship,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  PackageCheck,
  AlertOctagon,
} from "lucide-react";
import DeliveryPng from "../assets/delivery.png";

const PremiumServiceSection = () => {
  const [activeId, setActiveId] = useState(1);

  const services = [
    {
      id: 1,
      title: "Air Transportation",
      subtitle: "Fastest Global Delivery",
      icon: <Plane size={24} />,
      img: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=1200",
      description:
        "Priority network for time-critical shipments with real-time global tracking.",
      points: ["Express Delivery", "Secure Handling", "Customs Clearance"],
    },
    {
      id: 2,
      title: "Train Transportation",
      subtitle: "Eco-Friendly Bulk Logistics",
      icon: <Train size={24} />,
      img: "https://images.unsplash.com/photo-1515165504760-7053f3e1346d?q=80&w=1200",
      description:
        "Cost-effective and sustainable solutions for heavy industrial and bulk cargo.",
      points: ["Cost-Effective", "Massive Volume", "Safe Transit"],
    },
    {
      id: 3,
      title: "Maritime Shipping",
      subtitle: "Ocean Freight Solutions",
      icon: <Ship size={24} />,
      img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200",
      description:
        "Full container load (FCL) and LCL services across all major international ports.",
      points: ["Port-to-Port", "FCL & LCL", "Global Network"],
    },
  ];

  return (
    <section className="bg-[#0a1d37] py-24 px-6 relative overflow-hidden font-sans min-h-[950px] flex items-center">
      {/* Background Stylized Elements */}
      <div
        data-aos="fade-right"
        className="absolute top-0 right-0 text-[12rem] font-black text-white/[0.01] select-none pointer-events-none uppercase italic leading-none"
      >
        Localmate
      </div>
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 blur-[150px] rounded-full"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="bg-red-600 px-3 py-1 rounded-sm">
                <span className="text-white font-black tracking-tighter text-sm uppercase">
                  Localmate
                </span>
              </div>
              <span className="text-gray-500 uppercase font-bold tracking-widest text-[10px]">
                Premium Logistics
              </span>
            </motion.div>

            <h2
              data-aos="fade-right"
              className="text-2xl md:text-4xl lg:text-6xl font-black text-white uppercase italic leading-[1.1]"
            >
              Smart{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px #dc2626" }}
              >
                Shipping
              </span>{" "}
              <br />& Secured System
            </h2>
          </div>

          <div className="lg:max-w-xs border-l-2 border-red-600 pl-6 py-2">
            <p
              data-aos="fade-right"
              className="text-gray-400 text-sm leading-relaxed italic"
            >
              "Hum sirf deliver nahi karte, hum ek bharosa pohanchate hain aapke
              bade sapno ke liye."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* --- LEFT SIDE: THE INTERACTIVE LIST (5 Columns) --- */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
            {services.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setActiveId(item.id)}
                className={`relative group cursor-pointer overflow-hidden transition-all duration-500 p-6 rounded-3xl border ${
                  activeId === item.id
                    ? "bg-white/5 border-white/10 shadow-2xl"
                    : "bg-transparent border-transparent"
                }`}
              >
                <div className="flex items-center gap-6 relative z-10">
                  {/* Icon Container */}
                  <div
                    className={`p-4 rounded-2xl transition-all duration-500 ${
                      activeId === item.id
                        ? "bg-red-600 text-white rotate-[360deg] shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                        : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {item.icon}
                  </div>

                  <div className="flex-1">
                    <h4
                      className={`text-2xl font-black uppercase italic transition-colors ${
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

                {/* Expanded Content on Hover */}
                <AnimatePresence>
                  {activeId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-20 mt-4 overflow-hidden"
                    >
                      <p className="text-gray-400 text-xs leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.points.map((p, i) => (
                          <span
                            key={i}
                            className="text-[8px] font-bold bg-white/10 text-white px-2 py-1 rounded-full flex items-center gap-1"
                          >
                            <ShieldCheck size={10} className="text-red-500" />{" "}
                            {p}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Background Glow Effect */}
                {activeId === item.id && (
                  <motion.div
                    layoutId="glow"
                    className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent -z-10"
                  />
                )}
              </div>
            ))}
          </div>

          {/* --- RIGHT SIDE: THE DYNAMIC IMAGE SHOWCASE (7 Columns) --- */}
          <div className="lg:col-span-7 relative group">
            <div className="relative h-full min-h-[400px] w-full rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, scale: 1.15, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={services.find((s) => s.id === activeId).img}
                    alt="Logistics"
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#01070b] via-transparent to-transparent opacity-90"></div>
                </motion.div>
              </AnimatePresence>

              {/* Floating Tech Cards inside Image */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="absolute top-8 right-8 bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-3xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/40">
                    <PackageCheck className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-black italic uppercase text-xs">
                      Standard Quality
                    </p>
                    <p className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">
                      ISO 9001 Certified
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="absolute bottom-10 left-10">
                <div className="flex gap-4">
                  <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                    <Zap className="text-red-500 mb-2" size={20} />
                    <p className="text-white font-black text-xs italic">
                      99.9% Speed
                    </p>
                  </div>
                  <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                    <Globe className="text-red-500 mb-2" size={20} />
                    <p className="text-white font-black text-xs italic">
                      Global Reach
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- DYNAMIC DELIVERY BOY ANIMATION --- */}
      </div>
    </section>
  );
};

export default PremiumServiceSection;
