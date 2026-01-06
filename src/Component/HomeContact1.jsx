import React from "react";
import { motion } from "framer-motion";
import { Headset, ArrowRight, Play, Globe, ExternalLink } from "lucide-react";

const FinalLogisticsTemplate = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-white font-sans overflow-hidden">
      {/* --- REFINED BOTTOM CTA SECTION --- */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-wrap lg:flex-nowrap min-h-[450px] w-full"
      >
        {/* Block 1: The Ambient Visual */}
        <motion.div
          variants={itemVariants}
          className="w-full lg:w-1/4 relative group overflow-hidden cursor-crosshair"
        >
          <motion.img
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 1.5 }}
            src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=800"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
          />
          {/* Overlay with subtle pattern */}
          <div className="absolute inset-0 bg-[#0a1d37]/50 mix-blend-multiply group-hover:bg-transparent transition-colors duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d37] to-transparent opacity-60" />

          <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">
              Global Logistics
            </p>
            <h5 className="text-xl font-black italic italic uppercase tracking-tighter">
              01. Efficiency
            </h5>
          </div>
        </motion.div>

        {/* Block 2: Service CTA (Deep Dark) */}
        <motion.div
          variants={itemVariants}
          whileHover={{ zIndex: 10 }}
          className="w-full lg:w-1/4 bg-[#04152d] p-12 flex flex-col justify-center items-center text-center group relative overflow-hidden cursor-pointer"
        >
          {/* Background Animated Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/10 blur-[80px] group-hover:bg-red-600/20 transition-all duration-500" />

          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="relative z-10 w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 group-hover:border-red-600/50 transition-colors"
          >
            <Globe
              className="text-red-600 group-hover:animate-pulse"
              size={40}
            />
          </motion.div>

          <h4 className="relative z-10 text-white text-4xl font-black uppercase italic mb-6 leading-[0.9] tracking-tighter">
            Need Our <br /> <span className="text-red-600">Services?</span>
          </h4>

          <motion.div
            whileHover={{ x: 10 }}
            className="relative z-10 flex items-center gap-3 text-red-500 font-black uppercase text-[11px] tracking-widest group"
          >
            Explore Solutions
            <span className="w-8 h-[1px] bg-red-600 group-hover:w-12 transition-all" />
            <ArrowRight size={18} />
          </motion.div>

          {/* Decorative numbering */}
          <span className="absolute top-10 right-10 text-white/5 font-black italic text-6xl">
            02
          </span>
        </motion.div>

        {/* Block 3: Video Interaction (Dynamic Center) */}
        <motion.div
          variants={itemVariants}
          className="w-full lg:w-1/4 relative group cursor-pointer overflow-hidden"
        >
          <motion.img
            whileHover={{ scale: 1.1 }}
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800"
            className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1d37]/80 via-transparent to-transparent opacity-60" />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-black shadow-[0_0_50px_rgba(250,204,21,0.3)] relative"
            >
              {/* Spinning Ring Animation */}
              <div className="absolute inset-0 border-2 border-dashed border-yellow-400 rounded-full animate-[spin_8s_linear_infinite]" />
              <Play fill="currentColor" size={32} className="ml-1" />
            </motion.div>
            <p className="text-white font-black italic uppercase text-xs mt-6 tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-opacity">
              Watch Process
            </p>
          </div>
        </motion.div>

        {/* Block 4: Agent Connect (High Energy) */}
        <motion.div
          variants={itemVariants}
          className="w-full lg:w-1/4 bg-red-600 p-12 flex flex-col justify-center items-center text-center group relative overflow-hidden cursor-pointer"
        >
          {/* Subtle Texture Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="bg-white p-5 rounded-3xl shadow-2xl mb-8 group-hover:bg-[#0a1d37] transition-colors duration-500"
          >
            <Headset
              className="text-red-600 group-hover:text-white transition-colors"
              size={42}
            />
          </motion.div>

          <h4 className="text-white text-4xl font-black uppercase italic mb-6 leading-[0.9] tracking-tighter">
            Discuss With <br /> <span className="text-[#0a1d37]">Agents</span>
          </h4>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#0a1d37" }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-red-600 font-black italic uppercase px-8 py-3 rounded-full text-[10px] tracking-widest flex items-center gap-3 shadow-xl transition-all"
          >
            Request Callback <ExternalLink size={14} />
          </motion.button>

          {/* Ambient Lighting */}
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/20 blur-[50px] rounded-full" />
        </motion.div>
      </motion.section>
    </div>
  );
};

export default FinalLogisticsTemplate;
