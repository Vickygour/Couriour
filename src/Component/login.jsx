import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  Truck,
  Loader2,
  Minus,
  Sparkles,
} from "lucide-react";

const LuxuryShineAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#010409] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* --- PREMIUM CSS FOR SHINE EFFECT --- */}
      <style>
        {`
          @keyframes shine {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          .shining-text {
            background: linear-gradient(90deg, #ffffff 0%, #ef4444 25%, #ffffff 50%, #ef4444 75%, #ffffff 100%);
            background-size: 200% auto;
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            animation: shine 4s linear infinite;
          }
          .glass-panel {
            background: rgba(0, 29, 38, 0.85);
            backdrop-filter: blur(25px);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
        `}
      </style>

      {/* Background Decor */}
      <div className="absolute inset-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 glass-panel rounded-[4rem] shadow-[0_60px_120px_rgba(0,0,0,0.9)] relative z-10 overflow-hidden"
      >
        {/* --- LEFT SIDE: THE ELITE BRANDING --- */}
        <div className="p-16 text-white flex flex-col justify-between relative overflow-hidden hidden lg:flex border-r border-white/5">
          <div className="relative z-10">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 mb-24"
            >
              <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Truck size={24} className="text-white" />
              </div>
              <span className="text-2xl font-black italic tracking-tighter uppercase shining-text">
                Localmate
              </span>
            </motion.div>

            <div className="space-y-4">
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-7xl font-black italic uppercase leading-[0.85] tracking-tighter"
              >
                The Art <br /> Of Perfect <br />
                <span className="shining-text">Logistics.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-gray-400 text-lg italic border-l-2 border-red-600 pl-6 max-w-sm mt-8"
              >
                Experience the golden standard of global freight management.
              </motion.p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-10">
            <div className="flex flex-col gap-1">
              <span className="text-white font-black text-2xl italic">
                1990
              </span>
              <span className="text-white/20 text-[8px] uppercase tracking-[0.4em]">
                Est. Legacy
              </span>
            </div>
            <div className="h-10 w-[1px] bg-white/10" />
            <div className="flex flex-col gap-1">
              <span className="text-red-600 font-black text-2xl italic">
                24/7
              </span>
              <span className="text-white/20 text-[8px] uppercase tracking-[0.4em]">
                Priority Care
              </span>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: THE SHINING AUTH FORM --- */}
        <div className="p-12 lg:p-24 flex flex-col justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-16">
                <h3 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-4 leading-none">
                  {isLogin ? "Portal Access" : "Join Agency"}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="h-[2px] w-12 bg-red-600" />
                  <p className="text-red-500 font-bold uppercase text-[9px] tracking-[0.5em] shining-text">
                    Secure Identity Layer
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                {!isLogin && (
                  <div className="relative group">
                    <User
                      className="absolute left-0 bottom-4 text-white/10 group-focus-within:text-red-600 transition-all duration-500"
                      size={18}
                    />
                    <input
                      name="name"
                      required
                      placeholder="Full Name"
                      className="w-full pl-8 pb-4 bg-transparent border-b border-white/10 text-white outline-none font-bold text-xs tracking-[0.2em] uppercase placeholder:text-white/5 transition-all focus:border-red-600"
                    />
                  </div>
                )}

                <div className="relative group">
                  <Mail
                    className="absolute left-0 bottom-4 text-white/10 group-focus-within:text-red-600 transition-all duration-500"
                    size={18}
                  />
                  <input
                    name="email"
                    required
                    placeholder="Email Address"
                    className="w-full pl-8 pb-4 bg-transparent border-b border-white/10 text-white outline-none font-bold text-xs tracking-[0.2em] uppercase placeholder:text-white/5 transition-all focus:border-red-600"
                  />
                </div>

                <div className="relative group">
                  <Lock
                    className="absolute left-0 bottom-4 text-white/10 group-focus-within:text-red-600 transition-all duration-500"
                    size={18}
                  />
                  <input
                    name="password"
                    required
                    type="password"
                    placeholder="Password"
                    className="w-full pl-8 pb-4 bg-transparent border-b border-white/10 text-white outline-none font-bold text-xs tracking-[0.2em] uppercase placeholder:text-white/5 transition-all focus:border-red-600"
                  />
                </div>

                <div className="pt-10">
                  <motion.button
                    whileHover={{ scale: 1.02, letterSpacing: "0.5em" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-red-600 text-white py-8 rounded-full font-black uppercase italic tracking-[0.3em] flex items-center justify-center gap-6 transition-all duration-700 text-xs shadow-[0_30px_60px_rgba(220,38,38,0.3)] relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    {loading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <span className="flex items-center gap-4">
                        {isLogin ? "Authenticate" : "Create Account"}{" "}
                        <ArrowRight size={18} />
                      </span>
                    )}
                  </motion.button>
                </div>
              </form>

              <div className="mt-20">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-white/30 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all duration-500 flex items-center justify-center gap-4 group"
                >
                  <span className="h-[1px] w-10 bg-white/5 group-hover:w-20 group-hover:bg-red-600 transition-all" />
                  {isLogin ? "Register with Agency" : "Back to Access Console"}
                  <span className="h-[1px] w-10 bg-white/5 group-hover:w-20 group-hover:bg-red-600 transition-all" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 flex gap-4 opacity-10">
        <ShieldCheck className="text-white" size={40} />
      </div>
    </div>
  );
};

export default LuxuryShineAuth;
