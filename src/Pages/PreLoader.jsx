import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import LocalmateVideo from "../assets/Localmate.mp4";
import logo from "../assets/logo.png";

const Preloader = ({ isDelivered }) => {
  return (
    <motion.div
      key="preloader"
      exit={{
        opacity: 0,
        scale: 1.1,
        filter: "blur(20px)",
        transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
      }}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* --- VIDEO BACKGROUND --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isDelivered ? 0.4 : 0.2 }}
        className="absolute inset-0 z-0"
      >
        <video
          src={LocalmateVideo}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
      </motion.div>

      {/* Dynamic Ambient Glow - Moving with mouse or pulsing */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-[600px] h-[600px] bg-red-600/20 blur-[120px] rounded-full mix-blend-screen"
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative h-96 w-96 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isDelivered ? (
              <motion.div
                key="logo-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ scale: 1.5, opacity: 0, filter: "blur(20px)" }}
                className="relative flex items-center justify-center"
              >
                {/* 1. Background Pulse Rings */}
                {[1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: [0, 0.3, 0],
                      scale: [1, 2.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.8,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 border border-red-500/30 rounded-full"
                  />
                ))}

                {/* 2. The Main Logo with Reveal Animation */}
                <motion.div
                  initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="relative"
                >
                  <motion.img
                    src={logo}
                    alt="Localmate Logo"
                    animate={{
                      y: [0, -15, 0],
                      filter: [
                        "drop-shadow(0 0 20px rgba(220,38,38,0.3))",
                        "drop-shadow(0 0 40px rgba(220,38,38,0.6))",
                        "drop-shadow(0 0 20px rgba(220,38,38,0.3))",
                      ],
                    }}
                    transition={{
                      y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                      filter: { repeat: Infinity, duration: 2, ease: "linear" },
                    }}
                    className="w-72 h-auto object-contain relative z-20"
                  />
                </motion.div>

                {/* 3. "Scanning" Line Effect */}
                <motion.div
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-red-500 shadow-[0_0_15px_#dc2626] z-30 opacity-50"
                />
              </motion.div>
            ) : (
              /* --- SUCCESS STATE --- */
              <motion.div
                key="success-container"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute flex flex-col items-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1.1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                  className="bg-green-500/10 backdrop-blur-xl border border-green-500/50 p-8 rounded-full shadow-[0_0_80px_rgba(34,197,94,0.3)]"
                >
                  <CheckCircle2
                    size={90}
                    className="text-green-400"
                    strokeWidth={1.5}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 text-center"
                >
                  <h1 className="text-white text-4xl font-black tracking-tighter">
                    ARRIVED.
                  </h1>
                  <p className="text-green-400 text-xs tracking-[0.5em] font-bold uppercase mt-2">
                    Your Localmate is here
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Branding Section */}
        <motion.div
          animate={{
            y: isDelivered ? 50 : 0,
            opacity: isDelivered ? 0 : 1,
          }}
          className="mt-12 text-center"
        >
          <motion.h2
            initial={{ letterSpacing: "0.2em", opacity: 0 }}
            animate={{ letterSpacing: "1em", opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-white font-black uppercase text-2xl ml-[1em]"
          >
            LOCAL<span className="text-red-600">MATE</span>
          </motion.h2>

          <div className="mt-8 flex flex-col items-center">
            <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "circInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600 to-transparent"
              />
            </div>
            <p className="text-gray-500 font-medium uppercase text-[9px] tracking-[0.4em] mt-4">
              Securing your delivery line
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;
