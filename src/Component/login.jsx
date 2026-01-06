import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DeliverBoy from "../assets/DeliverBoy.png";
import {
  Mail,
  Phone,
  MapPin,
  Truck,
  ShieldCheck,
  ArrowRight,
  Globe,
  ChevronDown,
  Clock,
  Package,
  User,
  Briefcase,
} from "lucide-react";

const TransportAuth = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
    <div className="min-h-screen bg-[#F4F7F9] flex items-center justify-center p-4 font-sans selection:bg-red-600 selection:text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.12)] overflow-hidden border border-gray-100"
      >
        {/* LEFT SIDE: BRANDING (Compact Version) */}
        <div className="lg:col-span-5 bg-[#0D1B2A] relative p-10 overflow-hidden flex flex-col justify-between group">
          <div className="absolute top-0 right-0 w-24 h-full bg-red-600/10 skew-x-[-15deg] translate-x-8 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-red-600 rounded-xl shadow-lg shadow-red-600/30">
                <Truck className="text-white" size={20} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-black text-white tracking-tighter uppercase italic">
                Localmate
              </span>
            </div>

            <h1 className="text-4xl font-black text-white leading-[1.1] mb-4 uppercase italic tracking-tighter">
              Master of <br /> <span className="text-red-600">Global</span>{" "}
              <br /> Logistics
            </h1>

            <p className="text-gray-400 font-medium text-xs border-l-2 border-red-600 pl-3">
              "Bharosa aur Raftaar, har baar."
            </p>
          </div>

          <div className="relative z-10 my-4">
            <motion.img
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src={DeliverBoy}
              alt="Delivery"
              className="w-[80%] mx-auto h-auto drop-shadow-[0_20px_40px_rgba(255,0,0,0.2)]"
            />
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-3">
            <div className="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <Globe className="text-red-600 mb-1" size={18} />
              <p className="text-white text-[9px] font-black uppercase tracking-widest leading-none">
                150+ Countries
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <ShieldCheck className="text-red-600 mb-1" size={18} />
              <p className="text-white text-[9px] font-black uppercase tracking-widest leading-none">
                24/7 Secure
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: QUOTE FORM (Optimized Height) */}
        <div className="lg:col-span-7 bg-white p-8 lg:px-12 lg:py-10 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-3xl font-black text-[#0D1B2A] italic uppercase tracking-tighter leading-none">
              Request a{" "}
              <span className="text-red-600 underline decoration-2">Quote</span>
            </h2>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
              Precision Logistics Data Entry
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">
                  Agent Details
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600"
                    size={16}
                  />
                  <input
                    name="name"
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-100 focus:border-red-600 focus:bg-white outline-none rounded-xl py-3 pl-11 pr-4 text-xs font-bold transition-all shadow-sm"
                    placeholder="Full Name"
                  />
                </div>
              </div>
              <div className="space-y-1 pt-4">
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600"
                    size={16}
                  />
                  <input
                    name="email"
                    onChange={handleChange}
                    required
                    type="email"
                    className="w-full bg-gray-50 border border-gray-100 focus:border-red-600 focus:bg-white outline-none rounded-xl py-3 pl-11 pr-4 text-xs font-bold transition-all shadow-sm"
                    placeholder="Email Address"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600"
                  size={16}
                />
                <select
                  name="deliveryCity"
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-100 focus:border-red-600 focus:bg-white outline-none rounded-xl py-3 pl-11 pr-10 text-xs font-bold transition-all appearance-none cursor-pointer"
                >
                  <option value="">Destination City</option>
                  <option value="ny">New York (USA)</option>
                  <option value="del">Delhi (IND)</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
              </div>
              <div className="relative">
                <Package
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600"
                  size={16}
                />
                <select
                  name="freightType"
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-100 focus:border-red-600 focus:bg-white outline-none rounded-xl py-3 pl-11 pr-10 text-xs font-bold transition-all appearance-none cursor-pointer"
                >
                  <option value="">Freight Mode</option>
                  <option value="air">Air Freight</option>
                  <option value="sea">Ocean Cargo</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
              </div>
            </div>

            <div className="relative">
              <Briefcase
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <select
                name="incoterms"
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-100 focus:border-red-600 focus:bg-white outline-none rounded-xl py-3 pl-11 pr-10 text-xs font-bold transition-all appearance-none cursor-pointer"
              >
                <option value="">Incoterms (Select Method)</option>
                <option value="exw">EXW - Ex Works</option>
                <option value="fob">FOB - Free on Board</option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>

            <div className="flex flex-wrap gap-3 py-2">
              {[
                { name: "fragile", label: "Fragile" },
                { name: "expressDelivery", label: "Express" },
                { name: "insurance", label: "Insured" },
              ].map((item) => (
                <label
                  key={item.name}
                  className="flex items-center gap-2 cursor-pointer group bg-gray-50 px-4 py-2 rounded-lg hover:bg-red-50 transition-all border border-gray-100 hover:border-red-200"
                >
                  <input
                    type="checkbox"
                    name={item.name}
                    onChange={handleChange}
                    className="w-3.5 h-3.5 accent-red-600"
                  />
                  <span className="text-[10px] font-black uppercase text-gray-600 group-hover:text-red-600">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-[#0D1B2A] text-white py-4 rounded-xl font-black uppercase italic tracking-[0.2em] text-xs shadow-lg shadow-[#0D1B2A]/10 hover:bg-red-600 transition-all flex items-center justify-center gap-3 group"
            >
              Get Custom Quote
              <ArrowRight
                className="group-hover:translate-x-2 transition-transform"
                size={18}
              />
            </motion.button>
          </form>

          <div className="mt-6 flex items-center justify-between opacity-40">
            <div className="h-[1px] w-full bg-gray-200" />
            <span className="px-4 text-[8px] font-black uppercase tracking-widest whitespace-nowrap">
              Secure Gateway v2.0
            </span>
            <div className="h-[1px] w-full bg-gray-200" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TransportAuth;
