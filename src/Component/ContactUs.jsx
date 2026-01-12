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

const TransportAuth = () => {
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

  // ✅ MAILTO SUBMIT (REAL WORKING)
  const handleSubmit = (e) => {
    e.preventDefault();

    const mailBody = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Inquiry Type: ${formData.inquiryType}

Message:
${formData.message}
    `;

    window.location.href = `mailto:localmate2025@gmail.com
?subject=New Contact Enquiry - Localmate
&body=${encodeURIComponent(mailBody)}`;
  };

  return (
    <div className="min-h-screen bg-[#0a1d37] flex items-center justify-center p-4 font-sans overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, rotateY: -15, scale: 0.9 }}
        animate={{ opacity: 1, rotateY: -5, scale: 1 }}
        transition={{ duration: 1 }}
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 bg-[#0D1B2A] rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10"
      >
        {/* LEFT */}
        <div className="lg:col-span-6 p-10 border-r border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-red-600 rounded-lg">
                <Truck className="text-white" size={20} />
              </div>
              <span className="text-xl font-black text-white uppercase  ">
                Localmate
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-5xl font-black text-white uppercase   leading-none mb-4">
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
            {[Globe, ShieldCheck, Activity].map((Icon, i) => (
              <div
                key={i}
                className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center"
              >
                <Icon className="text-red-600 mx-auto mb-2" size={20} />
                <p className="text-white text-[8px] font-black uppercase">
                  {i === 0 ? "GLOBAL" : i === 1 ? "SECURE" : "24/7"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="lg:col-span-6 bg-white p-8 lg:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-black uppercase   mb-2">Contact Us</h2>
          <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest mb-8">
            We usually reply within 24 hours
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                name="name"
                required
                onChange={handleChange}
                placeholder="Full Name"
                className="border-b-2 py-3 text-xs font-bold uppercase outline-none"
              />
              <input
                name="email"
                type="email"
                required
                onChange={handleChange}
                placeholder="Email Address"
                className="border-b-2 py-3 text-xs font-bold uppercase outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="phone"
                onChange={handleChange}
                placeholder="Phone Number"
                className="border-b-2 py-3 text-xs font-bold uppercase outline-none"
              />
              <select
                name="inquiryType"
                onChange={handleChange}
                className="bg-gray-50 py-3 px-3 rounded-xl text-[10px] font-black uppercase outline-none"
              >
                <option>Inquiry Type</option>
                <option>General Inquiry</option>
                <option>Support</option>
                <option>Business</option>
                <option>Feedback</option>
              </select>
            </div>

            <textarea
              name="message"
              rows="3"
              onChange={handleChange}
              placeholder="Your Message"
              className="border-b-2 py-3 text-xs font-bold uppercase outline-none resize-none"
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-[#0D1B2A] text-white py-4 rounded-2xl font-black uppercase   tracking-[0.2em] flex items-center justify-center gap-3"
            >
              Send Message <ArrowRight size={18} />
            </motion.button>
          </form>

          <p className="mt-6 text-[8px] font-black text-gray-300 uppercase tracking-widest">
            Secure & Encrypted Communication
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TransportAuth;
