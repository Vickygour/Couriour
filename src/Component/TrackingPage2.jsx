import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  MapPin,
  Anchor,
  Plane,
  Activity,
  Signal,
  Zap,
  ShieldCheck,
} from "lucide-react";

const GlobalNetwork = () => {
  // --- REAL-TIME DATA SIMULATION ---
  const [activeUnits, setActiveUnits] = useState(2540);
  const [pulseColor, setPulseColor] = useState("#ef4444");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUnits((prev) => prev + Math.floor(Math.random() * 5) - 2);
      setPulseColor(Math.random() > 0.5 ? "#ef4444" : "#ffffff");
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
    <section className="bg-[#010409] py-24 px-6 relative overflow-hidden font-sans selection:bg-red-600/30">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* --- LEFT: LIVE COMMAND FEED (4 Cols) --- */}
          <div className="lg:col-span-4 flex flex-col h-full">
            <div className="flex items-center justify-between mb-10 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center text-red-600 border border-red-600/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  <Activity size={20} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="text-white font-black italic uppercase text-sm leading-none">
                    Live Feed
                  </h4>
                  <p className="text-[8px] text-gray-500 font-black uppercase tracking-[0.3em] mt-1">
                    Satellite Uplink: Stable
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-black text-xs animate-pulse">
                  ● LIVE
                </p>
                <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">
                  v.2.0.4
                </p>
              </div>
            </div>

            <div className="space-y-4 flex-grow">
              {liveShipments.map((ship, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    x: 10,
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                  className="bg-white/[0.02] border border-white/5 p-5 rounded-3xl relative overflow-hidden group cursor-pointer transition-all"
                >
                  {/* Internal Progress Bar */}
                  <div className="absolute bottom-0 left-0 h-[1px] bg-red-600/30 w-full">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${ship.progress}%` }}
                      className="h-full bg-red-600 shadow-[0_0_10px_#ef4444]"
                    />
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-red-500 text-[10px] font-black tracking-[0.2em] uppercase">
                      {ship.id}
                    </span>
                    <span className="text-[8px] text-gray-500 font-bold uppercase">
                      {ship.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-white">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:text-red-600 transition-colors border border-white/5">
                      {ship.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase italic tracking-widest mb-1">
                        <span>{ship.from}</span>
                        <Zap size={10} className="text-red-600 mx-2" />
                        <span>{ship.to}</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
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

            <button className="w-full py-5 mt-8 bg-red-600 text-white rounded-2xl font-black uppercase italic text-[10px] tracking-[0.4em] hover:bg-white hover:text-black transition-all shadow-[0_20px_40px_rgba(220,38,38,0.2)]">
              Initialize Global Search
            </button>
          </div>

          {/* --- RIGHT: INTERACTIVE SATELLITE HUB (8 Cols) --- */}
          <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-[4rem] p-10 lg:p-16 relative group overflow-hidden flex flex-col justify-between h-[650px] transition-all hover:border-red-600/20">
            {/* Background Decorative Radar */}
            <div className="absolute inset-0 pointer-events-none">
              <Globe
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] text-white/[0.03] animate-[spin_60s_linear_infinite]"
                strokeWidth={0.5}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-red-600/10 rounded-full animate-ping" />
            </div>

            <div className="relative z-10 flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-10 bg-red-600 rounded-full" />
                  <p className="text-red-600 font-black text-[10px] uppercase tracking-[0.5em]">
                    Network Topology
                  </p>
                </div>
                <h3 className="text-5xl lg:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
                  Global <br />{" "}
                  <span
                    className="text-transparent"
                    style={{ WebkitTextStroke: "1px white" }}
                  >
                    Control
                  </span>
                </h3>
              </div>

              <div className="bg-[#010409] border border-white/10 px-8 py-4 rounded-[2rem] shadow-2xl backdrop-blur-xl">
                <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest mb-1 text-center">
                  Active Agents
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeUnits}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-black text-white italic leading-none"
                  >
                    {activeUnits.toLocaleString()}
                    <span className="text-red-600">+</span>
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* --- MAP VISUALIZER --- */}
            <div className="relative flex-grow flex items-center justify-center my-12">
              {/* Center Core */}
              <div className="relative z-20 w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-red-600/20 blur-[40px] rounded-full animate-pulse" />
                <div className="p-6 bg-red-600 rounded-3xl shadow-[0_0_50px_rgba(220,38,38,0.5)] rotate-12 transition-transform hover:rotate-0 cursor-help">
                  <ShieldCheck size={40} className="text-white" />
                </div>
              </div>

              {/* Orbital Blinking Nodes */}
              <div className="absolute top-[10%] left-[20%]">
                <BlinkingDot color="#ef4444" delay="0s" label="New York" />
              </div>
              <div className="absolute top-[40%] right-[10%]">
                <BlinkingDot color="white" delay="1.5s" label="Tokyo" />
              </div>
              <div className="absolute bottom-[20%] left-[30%]">
                <BlinkingDot color="#ef4444" delay="0.8s" label="Sydney" />
              </div>
              <div className="absolute top-[15%] right-[35%]">
                <BlinkingDot color="white" delay="2.2s" label="London" />
              </div>
            </div>

            {/* Bottom Stats Grid */}
            <div className="grid grid-cols-3 gap-12 border-t border-white/5 pt-10 relative z-10">
              <StatItem
                label="Active Routes"
                value="1,450"
                detail="Direct Connections"
              />
              <StatItem
                label="Daily Volume"
                value="120M"
                detail="Metric Tons"
              />
              <StatItem label="Response" value="12ms" detail="Global Latency" />
            </div>

            {/* Aesthetic Corner SKEW Accent */}
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-600 transform -rotate-45 -translate-x-12 translate-y-12 opacity-40 group-hover:opacity-100 transition-all duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
};

const BlinkingDot = ({ color = "white", delay = "0s", label }) => (
  <div
    className="flex flex-col items-center gap-2 group/dot cursor-pointer"
    style={{ animationDelay: delay }}
  >
    <span className="relative flex h-5 w-5">
      <span
        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-40"
        style={{ backgroundColor: color }}
      ></span>
      <span
        className="relative inline-flex rounded-full h-5 w-5 border border-white/20 shadow-xl"
        style={{ backgroundColor: color }}
      ></span>
    </span>
    <span className="text-[7px] font-black text-white/20 group-hover/dot:text-red-600 uppercase tracking-widest transition-colors">
      {label}
    </span>
  </div>
);

const StatItem = ({ label, value, detail }) => (
  <div className="group cursor-default">
    <p className="text-[8px] text-gray-600 font-black uppercase tracking-[0.4em] mb-2 group-hover:text-red-600 transition-colors">
      {label}
    </p>
    <div className="flex items-end gap-2">
      <p className="text-3xl lg:text-4xl font-black text-white italic uppercase tracking-tighter leading-none">
        {value}
      </p>
      <div className="w-1.5 h-1.5 bg-red-600 rounded-full mb-1 animate-bounce" />
    </div>
    <p className="text-[7px] text-white/20 font-bold uppercase mt-2">
      {detail}
    </p>
  </div>
);

export default GlobalNetwork;
