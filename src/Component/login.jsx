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
  Sparkles,
} from "lucide-react";

const LuxuryShineAuth = ({ onLoginSuccess }) => {
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

    // Yahan backend logic aayegi
    setTimeout(() => {
      setLoading(false);
      if (onLoginSuccess) onLoginSuccess(); // Triggering the Preloader & Website flow
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#010409] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <style>
        {`
          @keyframes shine { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
          .shining-text {
            background: linear-gradient(90deg, #ffffff 0%, #ef4444 25%, #ffffff 50%, #ef4444 75%, #ffffff 100%);
            background-size: 200% auto; color: transparent; -webkit-background-clip: text; animation: shine 4s linear infinite;
          }
          .glass-panel {
            background: rgba(0, 29, 38, 0.9); backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
        `}
      </style>

      {/* Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-red-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[300px] h-[300px] bg-blue-900/10 blur-[100px] rounded-full" />
      </div>

      {/* Reduced Size Main Card (Max-w-4xl for better fit) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 glass-panel rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
      >
        {/* LEFT SIDE: Branding (More compact padding) */}
        <div className="p-10 text-white flex flex-col justify-between relative hidden md:flex border-r border-white/5">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-16">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Truck size={20} />
              </div>
              <span className="text-xl font-black italic uppercase shining-text tracking-tighter">
                Localmate
              </span>
            </div>
            <h2 className="text-5xl font-black italic uppercase leading-none tracking-tighter">
              The Art <br /> Of <span className="shining-text">Logistics.</span>
            </h2>
            <p className="text-gray-400 text-sm italic border-l-2 border-red-600 pl-4 mt-6 leading-relaxed">
              Global standard freight management.
            </p>
          </div>
          <div className="relative z-10 flex gap-6 mt-10">
            <div className="flex flex-col">
              <span className="text-white font-black text-xl italic">1990</span>
              <span className="text-white/20 text-[7px] uppercase tracking-widest">
                Legacy
              </span>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div className="flex flex-col">
              <span className="text-red-600 font-black text-xl italic">
                24/7
              </span>
              <span className="text-white/20 text-[7px] uppercase tracking-widest">
                Support
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Form (Optimized spacing) */}
        <div className="p-10 md:p-12 flex flex-col justify-center relative bg-white/[0.01]">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-10">
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none mb-3">
                  {isLogin ? "Access Portal" : "Join Agency"}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="h-[1px] w-8 bg-red-600" />
                  <p className="text-red-500 font-bold uppercase text-[8px] tracking-[0.4em] shining-text">
                    Secure Identity
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="relative group border-b border-white/10">
                    <User
                      className="absolute left-0 bottom-3 text-white/10 group-focus-within:text-red-600 transition-all"
                      size={16}
                    />
                    <input
                      name="name"
                      required
                      placeholder="Name"
                      onChange={handleChange}
                      className="w-full pl-6 pb-3 bg-transparent text-white outline-none font-bold text-xs uppercase placeholder:text-white/5"
                    />
                  </div>
                )}
                <div className="relative group border-b border-white/10">
                  <Mail
                    className="absolute left-0 bottom-3 text-white/10 group-focus-within:text-red-600 transition-all"
                    size={16}
                  />
                  <input
                    name="email"
                    required
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full pl-6 pb-3 bg-transparent text-white outline-none font-bold text-xs uppercase placeholder:text-white/5"
                  />
                </div>
                <div className="relative group border-b border-white/10">
                  <Lock
                    className="absolute left-0 bottom-3 text-white/10 group-focus-within:text-red-600 transition-all"
                    size={16}
                  />
                  <input
                    name="password"
                    required
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full pl-6 pb-3 bg-transparent text-white outline-none font-bold text-xs uppercase placeholder:text-white/5"
                  />
                </div>

                <div className="pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02, letterSpacing: "0.4em" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-red-600 text-white py-4 rounded-full font-black uppercase italic tracking-widest flex items-center justify-center gap-4 transition-all duration-500 text-[10px] shadow-lg relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    {loading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <span className="flex items-center gap-2">
                        {isLogin ? "Authenticate" : "Create Account"}{" "}
                        <ArrowRight size={14} />
                      </span>
                    )}
                  </motion.button>
                </div>
              </form>

              <div className="mt-10">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-white/30 text-[9px] font-black uppercase tracking-widest hover:text-white transition-all flex items-center justify-center gap-2 w-full group"
                >
                  <span className="h-[1px] w-6 bg-white/5 group-hover:bg-red-600 transition-all" />
                  {isLogin ? "Join Agency" : "Access Console"}
                  <span className="h-[1px] w-6 bg-white/5 group-hover:bg-red-600 transition-all" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Minimal Icon */}
      <div className="absolute bottom-6 left-6 opacity-10">
        <ShieldCheck className="text-white" size={30} />
      </div>
    </div>
  );
};

export default LuxuryShineAuth;
