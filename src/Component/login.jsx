import React, { useState } from "react";
import { motion } from "framer-motion";
import DeliverBoy from "../assets/DeliverBoy.png";
import {
  Mail,
  Truck,
  ShieldCheck,
  ArrowRight,
  Globe,
  ChevronDown,
  Package,
  User,
  Briefcase,
  Activity,
} from "lucide-react";

const TransportAuth = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    deliveryCity: "",
    freightType: "",
    incoterms: "",
    fragile: false,
    expressDelivery: false,
    insurance: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-[#0a1d37] flex items-center justify-center p-4 font-sans selection:bg-red-600 overflow-hidden relative">
      {/* Background Decorative Elements - Inse page bhara hua lagega */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] scale-150 grayscale"
          style={{
            backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')`,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, rotateY: -15, scale: 0.9 }}
        animate={{ opacity: 1, rotateY: -5, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 bg-[#0D1B2A] rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10 perspective-[1500px]"
      >
        {/* LEFT SIDE: HERO SECTION */}
        <div className="lg:col-span-6 relative p-10 flex flex-col justify-between overflow-hidden border-r border-white/5">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-red-600 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                <Truck className="text-white" size={20} />
              </div>
              <span className="text-xl font-black text-white tracking-tighter uppercase italic">
                Localmate
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h1 className="text-5xl font-black text-white leading-none uppercase italic tracking-tighter mb-4">
                  GLOBAL <br />
                  <span className="text-red-600">FREIGHT</span>
                  <br />
                  MASTER
                </h1>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] border-l-2 border-red-600 pl-4">
                  Efficiency in Every Mile
                </p>
              </div>
              {/* Delivery Boy image side me */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="hidden md:block w-68 h-68 relative"
              >
                <img
                  src={DeliverBoy}
                  alt="Delivery"
                  className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(220,38,38,0.3)]"
                />
              </motion.div>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-4 mt-8">
            {[
              { icon: Globe, label: "150+ HUBs" },
              { icon: ShieldCheck, label: "SECURED" },
              { icon: Activity, label: "REAL-TIME" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center"
              >
                <stat.icon className="text-red-600 mx-auto mb-2" size={20} />
                <p className="text-white text-[8px] font-black uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: GLASS FORM */}
        <div className="lg:col-span-6 bg-white p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-[#0D1B2A] uppercase italic flex items-center gap-3">
              Quote Request <div className="h-1 w-12 bg-red-600 rounded-full" />
            </h2>
            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest mt-1">
              Tier-1 Logistics Analytics
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative border-b-2 border-gray-100 focus-within:border-red-600 transition-all">
                <User
                  className="absolute left-0 top-3 text-gray-400"
                  size={16}
                />
                <input
                  name="name"
                  required
                  className="w-full py-3 pl-7 bg-transparent outline-none text-xs font-bold uppercase"
                  placeholder="Client Name"
                />
              </div>
              <div className="relative border-b-2 border-gray-100 focus-within:border-red-600 transition-all">
                <Mail
                  className="absolute left-0 top-3 text-gray-400"
                  size={16}
                />
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full py-3 pl-7 bg-transparent outline-none text-xs font-bold uppercase"
                  placeholder="Work Email"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative bg-gray-50 rounded-xl p-1">
                <Briefcase
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
                <select className="w-full bg-transparent py-3 pl-10 pr-8 outline-none text-[10px] font-black uppercase appearance-none cursor-pointer">
                  <option>Air Freight</option>
                  <option>Ocean Cargo</option>
                  <option>Road Transport</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={14}
                />
              </div>
              <div className="relative bg-gray-50 rounded-xl p-1">
                <Package
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
                <select className="w-full bg-transparent py-3 pl-10 pr-8 outline-none text-[10px] font-black uppercase appearance-none cursor-pointer">
                  <option>EXW - Ex Works</option>
                  <option>FOB - Free On Board</option>
                  <option>CIF - Cost & Insurance</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={14}
                />
              </div>
            </div>

            <div className="flex gap-2 py-2">
              {["Fragile", "Express", "Insurance"].map((item) => (
                <label
                  key={item}
                  className="flex-1 text-center py-2 bg-gray-50 rounded-lg cursor-pointer border border-gray-100 hover:border-red-600 transition-all group"
                >
                  <input type="checkbox" className="hidden peer" />
                  <span className="text-[9px] font-black uppercase text-gray-500 peer-checked:text-red-600 group-hover:text-red-600">
                    {item}
                  </span>
                </label>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#dc2626" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#0D1B2A] text-white py-4 rounded-2xl font-black uppercase italic tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(13,27,42,0.3)] transition-all"
            >
              Analyze & Generate Quote
              <ArrowRight size={18} />
            </motion.button>
          </form>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-red-600 rounded-full animate-pulse"
                />
              ))}
            </div>
            <span className="text-[8px] font-black text-gray-300 tracking-[0.3em] uppercase">
              Security Level: Encrypted x64
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TransportAuth;
