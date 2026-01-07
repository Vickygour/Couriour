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
  User,
  Briefcase,
  Activity,
  Phone,
  MessageSquare,
} from "lucide-react";

const TransportAuth = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-[#0a1d37] flex items-center justify-center p-4 font-sans selection:bg-red-600 overflow-hidden relative">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.03] scale-150"
          style={{
            backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')`,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, rotateY: -15, scale: 0.9 }}
        animate={{ opacity: 1, rotateY: -5, scale: 1 }}
        transition={{ duration: 1 }}
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 bg-[#0D1B2A] rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10"
      >
        {/* LEFT SIDE (UNCHANGED) */}
        <div className="lg:col-span-6 relative p-10 flex flex-col justify-between border-r border-white/5">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-red-600 rounded-lg">
                <Truck className="text-white" size={20} />
              </div>
              <span className="text-xl font-black text-white uppercase italic">
                Localmate
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-5xl font-black text-white uppercase italic leading-none mb-4">
                  CONTACT <br />
                  <span className="text-red-600">OUR</span>
                  <br />
                  TEAM
                </h1>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] border-l-2 border-red-600 pl-4">
                  We’re here to help you
                </p>
              </div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="hidden md:block w-64"
              >
                <img src={DeliverBoy} alt="Support" />
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { icon: Globe, label: "GLOBAL" },
              { icon: ShieldCheck, label: "SECURE" },
              { icon: Activity, label: "24/7" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center"
              >
                <stat.icon className="text-red-600 mx-auto mb-2" size={20} />
                <p className="text-white text-[8px] font-black uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE – CONTACT FORM */}
        <div className="lg:col-span-6 bg-white p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-[#0D1B2A] uppercase italic">
              Contact Us
            </h2>
            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest mt-1">
              We usually reply within 24 hours
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative border-b-2 border-gray-100">
                <User
                  className="absolute left-0 top-3 text-gray-400"
                  size={16}
                />
                <input
                  name="name"
                  required
                  onChange={handleChange}
                  className="w-full py-3 pl-7 outline-none text-xs font-bold uppercase"
                  placeholder="Full Name"
                />
              </div>

              <div className="relative border-b-2 border-gray-100">
                <Mail
                  className="absolute left-0 top-3 text-gray-400"
                  size={16}
                />
                <input
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  className="w-full py-3 pl-7 outline-none text-xs font-bold uppercase"
                  placeholder="Email Address"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative border-b-2 border-gray-100">
                <Phone
                  className="absolute left-0 top-3 text-gray-400"
                  size={16}
                />
                <input
                  name="phone"
                  onChange={handleChange}
                  className="w-full py-3 pl-7 outline-none text-xs font-bold uppercase"
                  placeholder="Phone Number"
                />
              </div>

              <div className="relative bg-gray-50 rounded-xl p-1">
                <Briefcase
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <select
                  name="inquiryType"
                  onChange={handleChange}
                  className="w-full bg-transparent py-3 pl-10 pr-8 outline-none text-[10px] font-black uppercase appearance-none"
                >
                  <option>Inquiry Type</option>
                  <option>General Inquiry</option>
                  <option>Support</option>
                  <option>Business</option>
                  <option>Feedback</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={14}
                />
              </div>
            </div>

            <div className="relative border-b-2 border-gray-100">
              <MessageSquare
                className="absolute left-0 top-3 text-gray-400"
                size={16}
              />
              <textarea
                name="message"
                rows="3"
                onChange={handleChange}
                className="w-full py-3 pl-7 outline-none text-xs font-bold uppercase resize-none"
                placeholder="Your Message"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#0D1B2A] text-white py-4 rounded-2xl font-black uppercase italic tracking-[0.2em] text-[11px] flex items-center justify-center gap-3"
            >
              Send Message
              <ArrowRight size={18} />
            </motion.button>
          </form>

          <div className="mt-8 text-[8px] font-black text-gray-300 uppercase tracking-widest">
            Secure & Encrypted Communication
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TransportAuth;
