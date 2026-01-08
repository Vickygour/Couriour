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

/* --- 3D Tilt Card --- */
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX / rect.width - 0.5);
    y.set(e.clientY / rect.height - 0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
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
      title: "Smart Inventory Replenishment",
      icon: <Settings size={28} />,
      desc: "AI-powered systems that automatically replenish inventory before stock levels drop, ensuring uninterrupted supply chains.",
      accent: "from-[#0a1d37] to-[#030c18]",
    },
    {
      id: "02",
      title: "Advanced Warehousing",
      icon: <Box size={28} />,
      desc: "High-security, technology-driven warehouses designed for speed, accuracy, and scalable logistics operations.",
      accent: "from-red-700 to-red-900",
    },
    {
      id: "03",
      title: "Intelligent Route Optimization",
      icon: <TrendingUp size={28} />,
      desc: "Data-driven routing that adapts to traffic, weather, and demand to reduce delays and operational costs.",
      accent: "from-[#0a1d37] to-[#030c18]",
    },
  ];

  const features = [
    { title: "Global Logistics Network", icon: <Globe size={22} />, id: "01" },
    { title: "Direct Transportation", icon: <Truck size={22} />, id: "02" },
    { title: "Eco-Friendly Packaging", icon: <Package size={22} />, id: "03" },
    {
      title: "High Operational Flexibility",
      icon: <Zap size={22} />,
      id: "04",
    },
    {
      title: "Enterprise-Grade Security",
      icon: <ShieldCheck size={22} />,
      id: "05",
    },
    { title: "Premium Air Freight", icon: <Zap size={22} />, id: "06" },
  ];

  return (
    <section
      className="bg-[#0a1d37] py-24 px-6 font-sans relative overflow-hidden"
      aria-labelledby="premium-logistics-heading"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-32">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="flex items-center gap-3 px-5 py-2 border border-red-600/20 rounded-full mb-8 bg-red-600/5 backdrop-blur-sm"
          >
            <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.5em]">
              Future of Logistics
            </span>
          </motion.div>

          <motion.h2
            id="premium-logistics-heading"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-6xl font-black text-white italic uppercase leading-[0.85]"
          >
            The Modern <span className="text-red-600">Standard</span>
            <br />
            <span className="text-outline-white opacity-40">
              Of Smart Logistics
            </span>
          </motion.h2>
        </div>

        {/* STEP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-40">
          {steps.map((step) => (
            <TiltCard
              key={step.id}
              className={`relative p-12 rounded-[3.5rem] border border-white/5 bg-gradient-to-br ${step.accent} shadow-2xl`}
            >
              <div className="relative z-10">
                <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-12 border border-white/10">
                  <div className="text-white">{step.icon}</div>
                </div>

                <h4 className="text-3xl font-black text-white uppercase italic mb-6">
                  {step.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-12">
                  {step.desc}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-5xl font-black italic opacity-20">
                    {step.id}
                  </span>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5">
            <h3 className="text-5xl md:text-7xl font-black text-white italic uppercase mb-10">
              Why <span className="text-red-600">Localmate</span>
              <br /> Leads the Industry
            </h3>
            <p className="text-gray-400 text-xl italic leading-relaxed max-w-md">
              “Localmate delivers more than shipments — we build reliable,
              scalable logistics ecosystems that power long-term business
              growth.”
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 p-8 rounded-[2rem] bg-zinc-900/50 border border-white/5"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-red-500">
                  {item.icon}
                </div>
                <div>
                  <h5 className="text-white font-black italic uppercase text-sm tracking-widest">
                    {item.title}
                  </h5>
                  <p className="text-[9px] text-gray-500 uppercase font-black mt-2">
                    Level {item.id} Optimized
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .text-outline-white {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </section>
  );
};

export default PremiumLogisticsV2;
