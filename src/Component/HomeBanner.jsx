import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import AOS from "aos";
import CornerBanner from "../assets/CornerBanner.png";
import BikeBanner from "../assets/BikeBanner.jpg";
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
  const [activeTab, setActiveTab] = useState("Bike");

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const banners = {
    Bike: {
      title: "Bike Express Logistics",
      desc: "High-speed bike deliveries for urgent, same-day and hyper-local shipments.",
      img: BikeBanner,
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
    <div className="relative w-full h-[850px] overflow-hidden bg-[#001524] font-sans mt-20 md:mt-32 ">
      <img
        data-aos="fade-up"
        data-aos-delay="200"
        src={CornerBanner}
        alt="banner"
        className="hidden md:block absolute bottom-0 left-0 z-70 w-32 md:w-48 opacity-80"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center overflow-hidden">
        {/* --- LEFT SIDE (Text) --- */}
        <div className="text-white">
          <div
            data-aos="fade-right"
            className="flex items-center space-x-2 mb-4"
          >
            <span className="bg-red-600 p-1 rounded-sm">
              <Zap size={14} fill="white" />
            </span>
            <span className="text-white font-black tracking-[0.25em] uppercase text-[10px] sm:text-xs">
              Premium Logistics Solution
            </span>
          </div>

          <h1
            data-aos="zoom-in-right"
            data-aos-delay="200"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black   uppercase leading-tight lg:leading-[0.9] mb-4 lg:mb-8"
          >
            {banners[activeTab].title.split(" ")[0]} <br />
            <span className="text-transparent stroke-text">
              {banners[activeTab].title.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-gray-300 text-sm sm:text-base lg:text-xl mb-6 lg:mb-10 max-w-md border-l-4 border-red-600 pl-4 lg:pl-6 leading-relaxed"
          >
            {banners[activeTab].desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <Link
              to="/CreateShipment"
              className="bg-red-600 hover:bg-white hover:text-red-600 text-white px-6 py-3 sm:px-10 sm:py-5 font-black transition-all group flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.4)]"
            >
              Create Shipment
              <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>

            <Link
              to="/track"
              className="border border-white/30 backdrop-blur-md px-6 py-3 sm:px-10 sm:py-5 font-black hover:bg-white hover:text-black transition-all uppercase text-center"
            >
              Track Order
            </Link>
          </div>
        </div>

        {/* --- RIGHT SIDE ANIMATION (DESKTOP ONLY) --- */}
        <div className="hidden lg:flex relative h-full items-center justify-center">
          <div className="relative w-full h-[360px]">
            {/* Radar */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-80 h-80 border-2 border-red-600/30 rounded-full absolute"
              />
              <div className="w-[420px] h-[420px] border border-white/5 rounded-full animate-spin-slow absolute"></div>
            </div>

            {/* Parachute */}
            <motion.div
              initial={{ y: -400, opacity: 0 }}
              animate={{ y: 120, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute left-1/4 flex flex-col items-center"
            >
              <div className="w-16 h-14 bg-red-600 rounded-t-full" />
              <Package
                size={32}
                className="text-white mt-3 bg-red-600 p-1 rounded"
              />
            </motion.div>

            {/* Bike */}
            <motion.div
              animate={{ x: [-80, 350] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-8"
            >
              <Bike size={70} className="text-white drop-shadow-lg" />
            </motion.div>

            {/* Home */}
            <div className="absolute right-0 bottom-8 text-white text-center">
              <Home size={50} className="text-red-600" />
              <span className="text-xs font-black mt-2 block">
                Safe Delivery
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- FOOTER TABS --- */}
      <div className="absolute bottom-0 w-full bg-black/50 backdrop-blur-2xl border-t border-white/10 z-50">
        <div className="max-w-7xl mx-auto flex">
          {["Bike", "Ocean", "Land"].map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`flex-1 py-10 flex flex-col items-center justify-center transition-all relative overflow-hidden group ${
                activeTab === type
                  ? "text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3 text-xl font-black uppercase   tracking-tighter">
                {type === "Bike" && <Bike size={24} className="text-red-600" />}
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
