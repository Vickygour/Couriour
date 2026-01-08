import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Navigation,
  Radar,
  ShieldAlert,
  Cpu,
  Crosshair,
  Globe2,
} from "lucide-react";

const TrackingBanner = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="relative w-full h-auto lg:h-[550px] flex items-center justify-center overflow-hidden bg-[#010409] py-16 px-6 border-t border-white/5 mt-20 md:mt-32">
      {/* --- CYBER DYNAMIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Scanning Beam */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-red-600/5 to-transparent skew-x-12"
        />

        {/* Tactical HUD Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.03] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.02] rounded-full" />

        {/* Glowing Orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* --- LEFT: TRACKING INTERFACE (7 Cols) --- */}
        <motion.div
          className="lg:col-span-7 flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Status Badge */}
          <div className="flex items-center gap-4 mb-8">
            <div className="px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 italic">
                Satellite Link: Active
              </span>
            </div>
            <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest hidden md:block">
              Latency: 14ms
            </p>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white italic leading-[0.9] mb-6 uppercase tracking-tighter">
            Real-Time <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1px #dc2626" }}
            >
              Visual Telemetry
            </span>
          </h2>

          <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed mb-10 max-w-lg italic">
            Synchronize with the Localmate neural network to trace your assets
            across 190+ sovereign territories.
          </p>

          {/* --- THE INPUT CONSOLE --- */}
          <div
            className={`relative max-w-xl transition-all duration-500 ${
              isFocused ? "scale-105" : "scale-100"
            }`}
          >
            {/* Glow effect on focus */}
            <div
              className={`absolute -inset-1 bg-red-600 rounded-2xl blur-lg transition-opacity duration-500 ${
                isFocused ? "opacity-20" : "opacity-0"
              }`}
            ></div>

            <div className="relative bg-[#0a0f1a] border border-white/10 rounded-2xl flex items-center p-2 backdrop-blur-xl group">
              <div className="p-4 text-red-600">
                <Radar
                  size={24}
                  className={`${isFocused ? "animate-spin" : "animate-pulse"}`}
                />
              </div>

              <input
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                type="text"
                placeholder="INPUT TRACKING CODE (EX: LM-X900)"
                className="w-full bg-transparent border-none outline-none text-white font-black italic tracking-widest placeholder:text-slate-700 text-sm"
              />

              <button className="bg-red-600 hover:bg-white text-white hover:text-black transition-all px-10 py-4 rounded-xl font-black uppercase italic text-xs flex items-center gap-3 shadow-[0_10px_30px_rgba(220,38,38,0.3)]">
                LOCATE <Crosshair size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT: DATA HUD VISUAL (5 Cols) --- */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, rotate: -10 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            className="relative w-full max-w-[400px] aspect-square bg-[#0a0f1a] border border-white/5 rounded-[3rem] p-10 flex flex-col items-center justify-center shadow-2xl overflow-hidden group"
          >
            {/* Background Map Graphic Overlay */}
            <Globe2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.03] scale-[4]" />

            {/* Radar Circle */}
            <div className="relative w-56 h-56 border border-red-600/20 rounded-full flex items-center justify-center">
              <div className="absolute inset-4 border border-white/[0.03] rounded-full" />
              <div className="absolute inset-10 border border-white/[0.03] rounded-full" />

              {/* Center Core */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-20 h-20 bg-red-600/10 rounded-2xl border border-red-600 flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.2)]"
              >
                <Cpu size={32} className="text-red-500" />
              </motion.div>

              {/* Sweeping Radar Arm */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-t from-red-600/30 to-transparent rounded-full origin-center"
                style={{
                  clipPath:
                    "polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%)",
                  opacity: 0.1,
                }}
              />
            </div>

            {/* Micro Data Labels */}
            <div className="absolute top-10 left-10 text-[8px] font-black text-slate-600 uppercase tracking-widest">
              Sector_09 // Grid_A
            </div>
            <div className="absolute bottom-10 right-10 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-white italic uppercase tracking-widest">
                Live Flow
              </span>
            </div>
          </motion.div>

          {/* Floating Indicator */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-8 -right-4 bg-white p-5 rounded-2xl shadow-2xl flex items-center gap-4 z-20 border-b-4 border-red-600"
          >
            <div className="p-2 bg-red-600 rounded-lg text-white">
              <Navigation size={18} fill="currentColor" />
            </div>
            <div className="leading-tight">
              <p className="text-[10px] font-black text-black uppercase tracking-tighter">
                Current Vector
              </p>
              <p className="text-xs font-bold text-red-600 italic">
                TRANS-ATLANTIC 09
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrackingBanner;
