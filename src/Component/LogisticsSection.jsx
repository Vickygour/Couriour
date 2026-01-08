import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  ShieldCheck,
  Truck,
  Package,
  Plane,
  Settings,
  CheckCircle2,
} from "lucide-react";

const BestLogisticsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const leftFeatures = [
    {
      id: "01",
      title: "Global Trade Network",
      icon: <Globe size={24} />,
      desc: "Localmate connects businesses with optimized global trade routes, ensuring faster deliveries and seamless cross-border logistics.",
    },
    {
      id: "02",
      title: "Direct Transportation",
      icon: <Truck size={24} />,
      desc: "We provide point-to-point transportation that reduces handling time and improves overall delivery efficiency.",
    },
    {
      id: "03",
      title: "Secure Packaging",
      icon: <Package size={24} />,
      desc: "Our industrial-grade packaging solutions protect fragile, high-value, and bulk shipments during transit.",
    },
  ];

  const rightFeatures = [
    {
      id: "04",
      title: "Flexible Logistics Solutions",
      icon: <Settings size={24} />,
      desc: "Customized logistics strategies designed to match your business size, industry, and operational needs.",
    },
    {
      id: "05",
      title: "Safe & Reliable Delivery",
      icon: <ShieldCheck size={24} />,
      desc: "Every shipment is monitored with real-time tracking, security checks, and compliance standards.",
    },
    {
      id: "06",
      title: "Air Freight Services",
      icon: <Plane size={24} />,
      desc: "Fast and dependable air freight services for urgent domestic and international shipments.",
    },
  ];

  return (
    <section
      className="bg-[#fcfcfc] py-24 px-6 relative overflow-hidden font-sans"
      aria-labelledby="best-logistics-heading"
    >
      {/* Background Brand Text */}
      <motion.div
        animate={{ x: [0, 50, 0], opacity: [0.01, 0.03, 0.01] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none select-none"
      >
        <div className="absolute top-10 left-10 text-[10rem] font-black italic uppercase leading-none">
          Localmate
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            className="text-red-600 font-bold uppercase text-[10px] mb-4"
          >
            Safe Transportation & Logistics
          </motion.p>

          <motion.h2
            id="best-logistics-heading"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 uppercase italic leading-none"
          >
            Why Localmate is considered <br />
            <span className="text-red-600">the best in logistics</span>
          </motion.h2>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          {/* Left Features */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {leftFeatures.map((f) => (
              <motion.div
                key={f.id}
                variants={itemLeft}
                whileHover={{ x: 15 }}
                className="group flex gap-6 items-start"
              >
                <div className="relative shrink-0">
                  <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center group-hover:bg-red-600 group-hover:rotate-[360deg] transition-all duration-700">
                    <span className="text-red-600 group-hover:text-white">
                      {f.icon}
                    </span>
                  </div>
                  <span className="absolute -top-3 -left-3 text-[12px] font-black text-slate-300 italic">
                    {f.id}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 uppercase italic mb-2 group-hover:text-red-600">
                    {f.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-[260px]">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Center Image */}
          <div className="relative flex justify-center py-10">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="relative z-20"
            >
              <div className="bg-white p-6 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                  alt="Localmate logistics operations"
                  className="rounded-[3rem] w-full h-[450px] object-cover"
                />
              </div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white px-10 py-5 rounded-3xl shadow-2xl border border-slate-50 flex flex-col items-center"
              >
                <div className="text-3xl font-black text-slate-900 italic">
                  Localmate <span className="text-red-600">2026</span>
                </div>
                <div className="h-[2px] w-12 bg-red-600 my-1 rounded-full"></div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Global Logistics Partner
                </p>
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 bg-red-600 p-5 rounded-3xl shadow-2xl text-white border-4 border-white"
              >
                <CheckCircle2 size={32} />
              </motion.div>
            </motion.div>
          </div>

          {/* Right Features */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12 lg:pl-10"
          >
            {rightFeatures.map((f) => (
              <motion.div
                key={f.id}
                variants={itemRight}
                whileHover={{ x: -15 }}
                className="group flex flex-row-reverse lg:flex-row gap-6 items-start"
              >
                <div className="relative shrink-0">
                  <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center group-hover:bg-red-600 group-hover:rotate-[-360deg] transition-all duration-700">
                    <span className="text-red-600 group-hover:text-white">
                      {f.icon}
                    </span>
                  </div>
                  <span className="absolute -top-3 -right-3 text-[12px] font-black text-slate-300 italic">
                    {f.id}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 uppercase italic mb-2 group-hover:text-red-600">
                    {f.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-[240px]">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BestLogisticsSection;
