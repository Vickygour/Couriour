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
  // Animation Variants
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
      title: "Decentralized Trade",
      icon: <Globe size={24} />,
      desc: "Global trade routes optimized for efficiency and local market speed.",
    },
    {
      id: "02",
      title: "Direct Transport",
      icon: <Truck size={24} />,
      desc: "Point-to-point delivery minimizing handling and transit time.",
    },
    {
      id: "03",
      title: "Good Packaging",
      icon: <Package size={24} />,
      desc: "Industrial grade secured packaging for fragile and bulk goods.",
    },
  ];

  const rightFeatures = [
    {
      id: "04",
      title: "Highly Flexible",
      icon: <Settings size={24} />,
      desc: "Customized logistics plans tailored to your specific business needs.",
    },
    {
      id: "05",
      title: "Secure Delivery",
      icon: <ShieldCheck size={24} />,
      desc: "End-to-end encryption and real-time monitoring for every parcel.",
    },
    {
      id: "06",
      title: "Air Freight Facility",
      icon: <Plane size={24} />,
      desc: "Express air network for your most urgent global shipments.",
    },
  ];

  return (
    <section className="bg-[#fcfcfc] py-24 px-6 relative overflow-hidden font-sans">
      {/* Background Decor - Floating Text Animation */}
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
        {/* Top Header - Reveal Animation */}
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
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 uppercase italic leading-none"
          >
            Why we are considered the <br />
            <span className="text-red-600">best in business</span>
          </motion.h2>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          {/* Left Features - Staggered Slide In */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {leftFeatures.map((f) => (
              <motion.div
                key={f.id}
                variants={itemLeft}
                whileHover={{ x: 15 }}
                className="group flex gap-6 items-start text-left cursor-default"
              >
                <div className="relative shrink-0">
                  <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center group-hover:bg-red-600 group-hover:rotate-[360deg] transition-all duration-700">
                    <span className="text-red-600 group-hover:text-white transition-colors">
                      {f.icon}
                    </span>
                  </div>
                  <span className="absolute -top-3 -left-3 text-[12px] font-black text-slate-300 italic group-hover:text-red-300">
                    {f.id}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 uppercase italic mb-2 group-hover:text-red-600 transition-colors">
                    {f.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-[260px]">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Center Showcase - 3D Zoom & Pulse */}
          <div className="relative flex justify-center py-10">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="relative z-20"
            >
              <div className="bg-white p-6 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-slate-100 relative">
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600"
                  alt="Logistics"
                  className="rounded-[3rem] w-full h-[450px] object-cover"
                />
              </div>

              {/* Center Floating Badge */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white px-10 py-5 rounded-3xl shadow-2xl border border-slate-50 flex flex-col items-center min-w-[240px]"
              >
                <div className="text-3xl font-black text-slate-900 italic tracking-tighter">
                  Localmate <span className="text-red-600">2026</span>
                </div>
                <div className="h-[2px] w-12 bg-red-600 my-1 rounded-full"></div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Global Logistics Leader
                </p>
              </motion.div>

              {/* Orbiting Tech Icon */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -top-10 -right-10 bg-red-600 p-5 rounded-3xl shadow-2xl text-white border-4 border-white"
              >
                <CheckCircle2 size={32} />
              </motion.div>
            </motion.div>

            {/* Pulsing Background Glow */}
            <motion.div
              animate={{ opacity: [0.05, 0.15, 0.05], scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-red-600 blur-[120px] -z-10 rounded-full"
            />
          </div>

          {/* Right Features - Staggered Slide In */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12 lg:pl-10"
          >
            {rightFeatures.map((f) => (
              <motion.div
                key={f.id}
                variants={itemRight}
                whileHover={{ x: -15 }}
                className="group flex flex-row-reverse lg:flex-row gap-6 items-start text-right lg:text-left cursor-default"
              >
                <div className="relative shrink-0">
                  <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center group-hover:bg-red-600 group-hover:rotate-[-360deg] transition-all duration-700">
                    <span className="text-red-600 group-hover:text-white transition-colors">
                      {f.icon}
                    </span>
                  </div>
                  <span className="absolute -top-3 -right-3 lg:-right-3 lg:left-auto text-[12px] font-black text-slate-300 italic group-hover:text-red-300">
                    {f.id}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 uppercase italic mb-2 group-hover:text-red-600 transition-colors">
                    {f.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-[240px] ml-auto lg:ml-0">
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
