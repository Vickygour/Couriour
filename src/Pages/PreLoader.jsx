import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, CheckCircle2 } from "lucide-react";
import LocalmateVideo from "../assets/Localmate.mp4"; // Path sahi check karlein

const Preloader = ({ isDelivered }) => {
  return (
    <motion.div
      key="preloader"
      exit={{
        opacity: 0,
        scale: 1.1,
        filter: "blur(20px)",
        transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] },
      }}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* --- VIDEO BACKGROUND --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isDelivered ? 0.4 : 0 }}
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

      {/* Ambient Glow */}
      <div className="absolute w-[600px] h-[600px] bg-red-600/20 blur-[150px] rounded-full mix-blend-screen" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative h-72 w-72 flex items-center justify-center">
          {/* --- PARCEL --- */}
          <AnimatePresence>
            {!isDelivered && (
              <motion.div
                key="parcel-box"
                initial={{ y: -1000, rotateX: 45, scale: 0 }}
                animate={{ y: 0, rotateX: 0, scale: 1 }}
                exit={{ scale: 2, opacity: 0, filter: "blur(10px)" }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 80,
                  duration: 1.2,
                }}
                className="bg-gradient-to-br from-white to-gray-200 p-10 rounded-[2.5rem] shadow-[0_50px_100px_rgba(255,0,0,0.2)] flex items-center justify-center"
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  <Package
                    size={100}
                    className="text-red-600"
                    strokeWidth={1.5}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* --- SUCCESS STATE --- */}
          <AnimatePresence>
            {isDelivered && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute flex flex-col items-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.1 }}
                  transition={{ type: "spring", bounce: 0.6 }}
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
                  <h1 className="text-white text-4xl font-black tracking-tighter  ">
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
          <h2 className="text-white font-black   uppercase tracking-[1em] text-2xl ml-[1em]">
            LOCAL<span className="text-red-600">MATE</span>
          </h2>
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
