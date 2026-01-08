import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Headset, ArrowRight, Play, Globe, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const FinalLogisticsTemplate = () => {
  const videoRef = useRef(null);

  const handleVideoToggle = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
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
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-wrap lg:flex-nowrap min-h-[450px] w-full"
      >
        {/* BLOCK 1 */}
        <motion.div
          variants={itemVariants}
          className="w-full lg:w-1/4 relative group overflow-hidden"
        >
          <motion.img
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 1.5 }}
            src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=800"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-[#0a1d37]/50 mix-blend-multiply" />
        </motion.div>

        {/* BLOCK 2 – Explore Solutions → /contact */}
        <motion.div
          variants={itemVariants}
          className="w-full lg:w-1/4 bg-[#04152d] p-12 flex flex-col justify-center items-center text-center relative"
        >
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
            <Globe className="text-red-600" size={40} />
          </div>

          <h4 className="text-white text-4xl font-black uppercase italic mb-6 leading-[0.9]">
            Need Our <br /> <span className="text-red-600">Services?</span>
          </h4>

          <Link
            to="/contact"
            className="flex items-center gap-3 text-red-500 font-black uppercase text-[11px] tracking-widest hover:translate-x-2 transition-transform"
          >
            Explore Solutions
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* BLOCK 3 – VIDEO SECTION */}
        <motion.div
          variants={itemVariants}
          className="w-full lg:w-1/4 relative group overflow-hidden cursor-pointer"
          onClick={handleVideoToggle}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800"
            muted
            loop
          >
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1d37]/70 via-transparent to-transparent" />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(250,204,21,0.4)]"
            >
              <Play fill="currentColor" size={32} className="ml-1" />
            </motion.div>

            <p className="text-white font-black uppercase text-xs mt-6 tracking-[0.4em]">
              Play Video
            </p>
          </div>
        </motion.div>

        {/* BLOCK 4 – Request Callback → CALL */}
        <motion.div
          variants={itemVariants}
          className="w-full lg:w-1/4 bg-red-600 p-12 flex flex-col justify-center items-center text-center relative"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="bg-white p-5 rounded-3xl shadow-2xl mb-8"
          >
            <Headset className="text-red-600" size={42} />
          </motion.div>

          <h4 className="text-white text-4xl font-black uppercase italic mb-6 leading-[0.9]">
            Discuss With <br /> <span className="text-[#0a1d37]">Agents</span>
          </h4>

          <a
            href="tel:+918826262858"
            className="bg-white text-red-600 font-black italic uppercase px-8 py-3 rounded-full text-[10px] tracking-widest flex items-center gap-3 shadow-xl hover:bg-[#0a1d37] hover:text-white transition-all"
          >
            Request Callback <ExternalLink size={14} />
          </a>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default FinalLogisticsTemplate;
