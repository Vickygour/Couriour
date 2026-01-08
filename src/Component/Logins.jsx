import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  Truck,
  Loader2,
} from "lucide-react";

const Logins = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/login" : "/register";

      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };

      const response = await API.post(endpoint, payload);

      if (response.data.success) {
        // --- LOGIC UPDATED FOR ROUTE PROTECTION ---
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));

        setTimeout(() => {
          setLoading(false);
          const userRole = response.data.data.user.role;

          // Successful login ke baad redirection
          if (userRole === "admin") {
            navigate("/admin/dashboard");
          } else if (userRole === "deliveryman") {
            navigate("/delivery/dashboard");
          } else {
            // Seedha Create Shipment page par redirect
            navigate("/CreateShipment");
          }
        }, 1000);
      } else {
        setError(response.data.message);
        setLoading(false);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Connection failed. Please try again."
      );
      setLoading(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#010409] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-red-600/30 mt-10 md:mt-15"
    >
      <style>
        {`
          @keyframes shine { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
          .shining-text {
            background: linear-gradient(90deg, #ffffff 0%, #ef4444 25%, #ffffff 50%, #ef4444 75%, #ffffff 100%);
            background-size: 200% auto; color: transparent; -webkit-background-clip: text; animation: shine 4s linear infinite;
          }
        `}
      </style>

      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 bg-[#001D26] rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative z-10 overflow-hidden border border-white/5"
      >
        <div className="md:col-span-5 bg-[#001D26] p-10 text-white flex flex-col justify-between relative overflow-hidden border-r border-white/5 ">
          <div className="absolute top-0 right-0 h-full w-24 bg-red-600 transform translate-x-12 -skew-x-12 opacity-80" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-16 group cursor-pointer">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-[0_10px_20px_rgba(220,38,38,0.4)] group-hover:rotate-12 transition-transform">
                <Truck size={20} className="text-white" />
              </div>
              <span className="text-xl font-black italic uppercase shining-text tracking-tighter">
                Localmate
              </span>
            </div>
            <h2 className="text-5xl font-black italic uppercase leading-[0.85] tracking-tighter mb-6">
              The <br /> Golden <br />{" "}
              <span className="text-red-600">Route.</span>
            </h2>
            <p className="text-gray-400 text-xs italic border-l-2 border-red-600 pl-4 mt-8 leading-relaxed max-w-[200px]">
              Global standard logistics and agency network since 1990.
            </p>
          </div>
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-red-600" />
              <div>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                  System Status
                </p>
                <p className="text-sm font-bold text-green-400 uppercase italic tracking-tighter">
                  Encrypted & Active
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 p-10 lg:p-14 bg-white/[0.02] flex flex-col justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-12">
                <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none mb-3">
                  {isLogin ? "Portal Access" : "Create Registry"}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="h-[2px] w-8 bg-red-600" />
                  <p className="text-red-500 font-bold uppercase text-[9px] tracking-[0.4em] shining-text">
                    Secure Identity Hub
                  </p>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-600/10 border border-red-600/30 rounded-lg"
                >
                  <p className="text-red-500 text-xs font-bold uppercase tracking-wide">
                    {error}
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-7">
                {!isLogin && (
                  <div className="relative group border-b border-white/10 focus-within:border-red-600 transition-all">
                    <User
                      className="absolute left-0 bottom-4 text-white/10 group-focus-within:text-red-600 transition-colors"
                      size={18}
                    />
                    <input
                      name="name"
                      required
                      placeholder="IDENTIFIER NAME"
                      onChange={handleChange}
                      value={formData.name}
                      className="w-full pl-8 pb-4 bg-transparent text-white outline-none font-black text-[11px] tracking-widest uppercase placeholder:text-white/5"
                    />
                  </div>
                )}
                <div className="relative group border-b border-white/10 focus-within:border-red-600 transition-all">
                  <Mail
                    className="absolute left-0 bottom-4 text-white/10 group-focus-within:text-red-600 transition-colors"
                    size={18}
                  />
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="CORPORATE EMAIL"
                    onChange={handleChange}
                    value={formData.email}
                    className="w-full pl-8 pb-4 bg-transparent text-white outline-none font-black text-[11px] tracking-widest uppercase placeholder:text-white/5"
                  />
                </div>
                <div className="relative group border-b border-white/10 focus-within:border-red-600 transition-all">
                  <Lock
                    className="absolute left-0 bottom-4 text-white/10 group-focus-within:text-red-600 transition-colors"
                    size={18}
                  />
                  <input
                    name="password"
                    required
                    type="password"
                    placeholder="SECURE KEYCODE"
                    onChange={handleChange}
                    value={formData.password}
                    className="w-full pl-8 pb-4 bg-transparent text-white outline-none font-black text-[11px] tracking-widest uppercase placeholder:text-white/5"
                  />
                </div>

                <div className="pt-8">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{
                      scale: loading ? 1 : 1.02,
                      letterSpacing: loading ? "0.3em" : "0.5em",
                    }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full bg-red-600 text-white py-6 rounded-full font-black uppercase italic tracking-[0.3em] flex items-center justify-center gap-4 transition-all duration-700 text-xs shadow-[0_20px_40px_rgba(220,38,38,0.3)] relative overflow-hidden group/btn disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2 relative z-10">
                        <Loader2 className="animate-spin" size={20} />
                        {isLogin ? "Authenticating..." : "Registering..."}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 relative z-10">
                        {isLogin ? "Authenticate" : "Register Unit"}{" "}
                        <ArrowRight size={16} />
                      </span>
                    )}
                  </motion.button>
                </div>
              </form>

              <div className="mt-12 text-center">
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                  }}
                  disabled={loading}
                  className="group text-white/30 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all duration-500 flex items-center justify-center gap-3 w-full"
                >
                  <span className="h-[1px] w-6 bg-white/5 group-hover:w-12 group-hover:bg-red-600 transition-all" />
                  {isLogin ? "Request New Registry" : "Return to Console"}
                  <span className="h-[1px] w-6 bg-white/5 group-hover:w-12 group-hover:bg-red-600 transition-all" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="absolute bottom-10 right-10 flex items-center gap-4 opacity-20 pointer-events-none">
        <div className="text-right">
          <p className="text-white font-black italic uppercase text-[10px] tracking-widest leading-none">
            Security Protocol
          </p>
          <p className="text-red-600 font-bold uppercase text-[8px] tracking-[0.4em] mt-1">
            L-MATE AI VERIFIED
          </p>
        </div>
        <ShieldCheck className="text-white" size={40} strokeWidth={1} />
      </div>
    </motion.div>
  );
};

export default Logins;
