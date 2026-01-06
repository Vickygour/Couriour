import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Package,
  Truck,
  Globe,
  Box,
  ShieldCheck,
  Zap,
  Settings,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

// --- 3D Tilt Card Component ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const PremiumLogisticsV2 = () => {
  const steps = [
    {
      id: "01",
      title: "Smart Replenishment",
      icon: <Settings size={28} />,
      desc: "AI algorithms jo aapke stock ko khatam hone se pehle hi refill kar dete hain.",
      accent: "from-[#0a1d37] to-[#030c18]",
    },
    {
      id: "02",
      title: "Advanced Warehousing",
      icon: <Box size={28} />,
      desc: "Robotic sorted facilities jahan safety aur speed ka naya benchmark hai.",
      accent: "from-red-700 to-red-900",
    },
    {
      id: "03",
      title: "Neural Processing",
      icon: <TrendingUp size={28} />,
      desc: "Neural networks jo traffic aur weather ke hisaab se route optimize karte hain.",
      accent: "from-[#0a1d37] to-[#030c18]",
    },
  ];

  const features = [
    { title: "Global Network", icon: <Globe size={22} />, id: "01" },
    { title: "Direct Logistics", icon: <Truck size={22} />, id: "02" },
    { title: "Eco-Packaging", icon: <Package size={22} />, id: "03" },
    { title: "High Flexibility", icon: <Zap size={22} />, id: "04" },
    {
      title: "Bulletproof Security",
      icon: <ShieldCheck size={22} />,
      id: "05",
    },
    { title: "Elite Air Freight", icon: <Zap size={22} />, id: "06" },
  ];

  return (
    <div className="bg-[#0a1d37] py-24 px-6 font-sans relative overflow-hidden selection:bg-red-600 selection:text-white">
      {/* Dynamic Mouse Spotlight Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col items-center text-center mb-32">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="flex items-center gap-3 px-5 py-2 border border-red-600/20 rounded-full mb-8 bg-red-600/5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.5em]">
              Future of Cargo
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-6xl font-black text-white italic uppercase leading-[0.85] tracking-tighter"
          >
            The Modern{" "}
            <span className="text-red-600 inline-block hover:scale-110 transition-transform cursor-default">
              Standard
            </span>{" "}
            <br />
            <span className="text-outline-white opacity-40">Of Logistics</span>
          </motion.h2>
        </div>

        {/* --- STEP CARDS (3D TILT & GLASSMORPHISM) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-40">
          {steps.map((step, index) => (
            <TiltCard
              key={step.id}
              className={`relative p-12 rounded-[3.5rem] border border-white/5 bg-gradient-to-br ${step.accent} group cursor-pointer shadow-2xl`}
            >
              {/* Card Inner Glow */}
              <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-[3.5rem] blur-xl" />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.7 }}
                  className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-12 backdrop-blur-xl border border-white/10 group-hover:bg-red-600 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all"
                >
                  <div className="text-white">{step.icon}</div>
                </motion.div>

                <h4 className="text-3xl font-black text-white uppercase italic mb-6 tracking-tight leading-none">
                  {step.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-12 group-hover:text-gray-200 transition-colors">
                  {step.desc}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-5xl font-black italic opacity-10 group-hover:opacity-100 group-hover:text-red-600 transition-all">
                    {step.id}
                  </span>
                  <motion.div
                    whileHover={{ x: 5, y: -5 }}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all"
                  >
                    <ArrowUpRight size={20} />
                  </motion.div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* --- FEATURE GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="lg:col-span-5"
          >
            <div className="w-20 h-1 bg-red-600 mb-8 rounded-full" />
            <h3 className="text-5xl md:text-7xl font-black text-white italic uppercase leading-[0.9] mb-10">
              Why <span className="text-red-600">Localmate</span> <br />{" "}
              Dominates
            </h3>
            <p className="text-gray-400 text-xl font-medium italic leading-relaxed max-w-md">
              "Hum sirf parcel nahi pohanchate, hum aapke business ki legacy
              deliver karte hain."
            </p>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-6 p-8 rounded-[2rem] bg-zinc-900/50 border border-white/5 hover:border-red-600/50 hover:bg-zinc-900 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all">
                  {item.icon}
                </div>
                <div>
                  <h5 className="text-white font-black italic uppercase text-sm tracking-widest">
                    {item.title}
                  </h5>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-6 h-[1px] bg-red-600" />
                    <p className="text-[9px] text-gray-500 uppercase font-black">
                      Level {item.id} Security
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .text-outline-white {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.4);
        }
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(20px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(20px) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default PremiumLogisticsV2;
