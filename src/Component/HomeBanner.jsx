import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import CornerBanner from "../assets/CornerBanner.png";
import "aos/dist/aos.css";
import {
  Bike,
  Ship,
  Plane,
  Truck,
  Home,
  ArrowRight,
  Package,
  Navigation,
  Wind,
  Zap,
} from "lucide-react";

const HeroBanner = () => {
  const [activeTab, setActiveTab] = useState("Air");

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const banners = {
    Air: {
      title: "Global Sky Logistics",
      desc: "Fastest air cargo network connecting continents in hours, not days.",
      img: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&q=80&w=1600",
      color: "from-blue-900/95",
    },
    Ocean: {
      title: "Deep Sea Freight",
      desc: "Cost-effective international shipping with real-time vessel tracking.",
      img: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=1600",
      color: "from-slate-900/95",
    },
    Land: {
      title: "Express Road Delivery",
      desc: "Last-mile delivery experts bringing your parcel to your doorstep.",
      img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1600",
      color: "from-red-900/95",
    },
  };

  return (
    <div className="relative w-full h-[850px] overflow-hidden bg-[#001524] font-sans mt-32">
      <img
        data-aos="fade-up"
        data-aos-delay="600"
        src={CornerBanner}
        alt="banner"
        className="absolute bottom-0 left-0 z-100 w-32 md:w-48 opacity-80"
      />
      {/* --- CINEMATIC BACKGROUND --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={banners[activeTab].img}
            className="w-full h-full object-cover grayscale-[20%]"
            alt="bg"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${banners[activeTab].color} via-transparent to-black/80`}
          ></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* --- LEFT SIDE (Text with AOS) --- */}
        <div className="text-white">
          <div
            data-aos="fade-right"
            className="flex items-center space-x-3 mb-6"
          >
            <span className="bg-red-600 p-1 rounded-sm">
              <Zap size={16} fill="white" />
            </span>
            <span className="text-red-500 font-black tracking-[0.3em] uppercase text-xs">
              Premium Logistics Solution
            </span>
          </div>

          <h1
            data-aos="zoom-in-right"
            data-aos-delay="200"
            className="text-7xl lg:text-8xl font-black leading-[0.9] mb-8 italic uppercase"
          >
            {banners[activeTab].title.split(" ")[0]} <br />
            <span className="text-transparent stroke-text">
              {banners[activeTab].title.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="400"
            className="text-gray-300 text-xl mb-10 max-w-md border-l-4 border-red-600 pl-6 leading-relaxed"
          >
            {banners[activeTab].desc}
          </p>

          <div data-aos="fade-up" data-aos-delay="600" className="flex gap-6">
            <button className="bg-red-600 hover:bg-white hover:text-red-600 text-white px-10 py-5 font-black transition-all group flex items-center shadow-[0_0_20px_rgba(220,38,38,0.4)]">
              SHIP NOW{" "}
              <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="border border-white/30 backdrop-blur-md px-10 py-5 font-black hover:bg-white hover:text-black transition-all uppercase">
              Track Order
            </button>
          </div>
        </div>

        {/* --- RIGHT SIDE: THE HEAVY ANIMATION --- */}
        <div className="relative h-full flex items-center justify-center">
          {/* 1. Radar Effect Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-96 h-96 border-2 border-red-600/30 rounded-full absolute"
            />
            <div className="w-[500px] h-[500px] border border-white/5 rounded-full animate-spin-slow absolute"></div>
          </div>

          {/* 2. Parachute & Bike Journey */}
          <div className="relative w-full h-[400px]">
            {/* Parachute Landing (Top to Mid) */}
            <motion.div
              key={activeTab + "-drop"}
              initial={{ y: -500, opacity: 0, rotate: -15 }}
              animate={{ y: 150, opacity: [0, 1, 1, 0], rotate: 0 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                times: [0, 0.2, 0.8, 1],
              }}
              className="absolute left-1/4 flex flex-col items-center"
            >
              <div className="w-20 h-16 bg-red-600 rounded-t-full shadow-2xl relative">
                <div className="absolute -bottom-4 left-2 w-[1px] h-6 bg-white/40 rotate-12"></div>
                <div className="absolute -bottom-4 right-2 w-[1px] h-6 bg-white/40 -rotate-12"></div>
              </div>
              <Package
                size={40}
                className="text-white mt-4 bg-red-600 p-1 rounded shadow-lg"
              />
            </motion.div>

            {/* Bike Express Delivery (Left to Right) */}
            <motion.div
              animate={{ x: [-100, 400] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-10 flex flex-col items-center"
            >
              <div className="relative">
                {/* Speed Lines */}
                <div className="absolute -left-10 top-1/2 space-y-1">
                  <div className="h-1 w-10 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="h-[2px] w-14 bg-white/30 rounded-full"></div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold text-red-500 bg-white px-2 py-0.5 rounded-full mb-1">
                    EXPRESS
                  </span>
                  <Bike
                    size={80}
                    className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  />
                </div>
              </div>
            </motion.div>

            {/* Home Icon (Fixed Goal) */}
            <div className="absolute right-0 bottom-10 flex flex-col items-center text-white">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Home
                  size={60}
                  className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.6)]"
                />
              </motion.div>
              <span className="text-xs font-black mt-2 tracking-widest uppercase">
                Safe Delivery
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- FOOTER TABS --- */}
      <div className="absolute bottom-0 w-full bg-black/50 backdrop-blur-2xl border-t border-white/10 z-50">
        <div className="max-w-7xl mx-auto flex">
          {["Air", "Ocean", "Land"].map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`flex-1 py-10 flex flex-col items-center justify-center transition-all relative overflow-hidden group ${
                activeTab === type
                  ? "text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3 text-xl font-black uppercase italic tracking-tighter">
                {type === "Air" && <Plane size={24} className="text-red-600" />}
                {type === "Ocean" && (
                  <Ship size={24} className="text-red-600" />
                )}
                {type === "Land" && (
                  <Truck size={24} className="text-red-600" />
                )}
                <span>{type} Freight</span>
              </div>
              {activeTab === type && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 w-full h-1 bg-red-600 shadow-[0_0_20px_rgba(220,38,38,1)]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroBanner;
