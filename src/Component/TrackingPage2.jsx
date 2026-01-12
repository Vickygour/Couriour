import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  MapPin,
  Anchor,
  Plane,
  Activity,
  Zap,
  ShieldCheck,
} from "lucide-react";

const GlobalNetwork = () => {
  const [activeUnits, setActiveUnits] = useState(2540);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUnits((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const liveShipments = [
    {
      id: "LM-7721",
      from: "Singapore",
      to: "Mumbai",
      status: "In Transit",
      icon: <Anchor size={14} />,
      progress: 65,
    },
    {
      id: "LM-8812",
      from: "London",
      to: "New York",
      status: "Departed",
      icon: <Plane size={14} />,
      progress: 40,
    },
    {
      id: "LM-5501",
      from: "Dubai",
      to: "Berlin",
      status: "Clearing",
      icon: <MapPin size={14} />,
      progress: 90,
    },
  ];

  return (
    <section className="bg-slate-100 py-24 px-6 relative overflow-hidden font-sans text-slate-900">
      {/* Soft Accent Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-red-600/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-slate-400/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: LIVE FEED */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center justify-between mb-10 bg-white/70 p-5 rounded-2xl border border-slate-200 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600/10 rounded-xl flex items-center justify-center text-red-600 border border-red-600/20">
                  <Activity size={20} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="font-black   uppercase text-sm text-slate-800">
                    Live Feed
                  </h4>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest">
                    Satellite Online
                  </p>
                </div>
              </div>
              <span className="text-red-600 font-black text-xs animate-pulse">
                ● LIVE
              </span>
            </div>

            <div className="space-y-4 flex-grow">
              {liveShipments.map((ship, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 6 }}
                  className="bg-white/80 border border-slate-200 p-5 rounded-3xl relative overflow-hidden shadow-sm"
                >
                  {/* Progress */}
                  <div className="absolute bottom-0 left-0 h-[2px] bg-slate-200 w-full">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${ship.progress}%` }}
                      className="h-full bg-red-600"
                    />
                  </div>

                  <div className="flex justify-between mb-3">
                    <span className="text-red-600 text-[10px] font-black tracking-widest">
                      {ship.id}
                    </span>
                    <span className="text-[9px] text-slate-500 uppercase">
                      {ship.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-red-600">
                      {ship.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between text-[10px] font-black uppercase   tracking-widest mb-1 text-slate-700">
                        <span>{ship.from}</span>
                        <Zap size={10} className="text-red-600" />
                        <span>{ship.to}</span>
                      </div>
                      <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-1/2 h-full bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-40"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="mt-8 py-5 bg-red-600 text-white rounded-2xl font-black uppercase   text-[10px] tracking-[0.4em] hover:bg-red-700 transition-all shadow-md">
              Initialize Global Search
            </button>
          </div>

          {/* RIGHT: GLOBAL HUB */}
          <div className="lg:col-span-8 bg-white/70 border border-slate-200 rounded-[4rem] p-10 lg:p-16 relative flex flex-col h-[650px] overflow-hidden backdrop-blur shadow-lg">
            {/* Globe */}
            <Globe className="absolute inset-0 m-auto w-[700px] h-[700px] text-slate-300/30 animate-[spin_60s_linear_infinite]" />

            <div className="relative z-10 flex justify-between">
              <div>
                <p className="text-red-600 text-[10px] uppercase tracking-[0.4em] font-black">
                  Network Topology
                </p>
                <h3 className="text-6xl font-black   uppercase leading-none mt-2 text-slate-900">
                  Global <br />
                  <span className="text-slate-400">Control</span>
                </h3>
              </div>

              <div className="bg-slate-100 border border-slate-200 px-8 py-4 rounded-2xl">
                <p className="text-[9px] text-slate-500 uppercase text-center">
                  Active Agents
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeUnits}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-black   text-slate-900"
                  >
                    {activeUnits.toLocaleString()}
                    <span className="text-red-600">+</span>
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* CORE */}
            <div className="flex-grow flex items-center justify-center relative z-10">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-red-600/20 blur-[50px] rounded-full animate-pulse" />
                <div className="p-6 bg-red-600 rounded-3xl shadow-lg">
                  <ShieldCheck size={42} className="text-white" />
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-10 border-t border-slate-200 pt-8 relative z-10">
              <Stat label="Active Routes" value="1,450" />
              <Stat label="Daily Volume" value="120M" />
              <Stat label="Latency" value="12ms" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ label, value }) => (
  <div>
    <p className="text-[9px] text-slate-500 uppercase tracking-[0.4em] mb-2">
      {label}
    </p>
    <div className="flex items-end gap-2">
      <p className="text-4xl font-black   text-slate-900">{value}</p>
      <span className="w-2 h-2 bg-red-600 rounded-full mb-1" />
    </div>
  </div>
);

export default GlobalNetwork;
