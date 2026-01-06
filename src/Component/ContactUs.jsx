import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Clock,
  Globe,
  ShieldCheck,
  Headphones,
  Package,
  Truck,
  ArrowRight,
} from "lucide-react";

// --- Magnetic 3D Effect for the Form ---
const ContactCard3D = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full h-full"
    >
      {children}
    </motion.div>
  );
};

const CourierContactPremium = () => {
  return (
    <div className="bg-[#0a1d37] min-h-screen py-20 px-4 md:px-10 overflow-hidden relative selection:bg-red-600">
      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- Header Section --- */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="h-[2px] w-12 bg-red-600 inline-block" />
            <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px]">
              Direct Connection
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-6xl font-black text-white italic uppercase leading-[0.8] tracking-tighter"
          >
            Contact <span className="text-red-600">Localmate</span> <br />
            <span className="text-outline-white opacity-30">Global Hub</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* --- LEFT: Contact Details & Visuals --- */}
          <div className="lg:col-span-5 space-y-12">
            {/* Visual Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: <Package size={24} />,
                  title: "Track Order",
                  desc: "Live Shipment tracking",
                  link: "Track now",
                },
                {
                  icon: <Truck size={24} />,
                  title: "Partner with us",
                  desc: "Become a courier partner",
                  link: "Join us",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    y: -5,
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                  className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md cursor-pointer group transition-all"
                >
                  <div className="text-red-600 mb-4 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <h4 className="text-white font-black uppercase italic text-sm">
                    {card.title}
                  </h4>
                  <p className="text-gray-500 text-[10px] mt-1 uppercase font-bold">
                    {card.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-white text-[9px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    {card.link} <ArrowRight size={12} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Core Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-[0_10px_30px_rgba(220,38,38,0.3)] group-hover:rotate-12 transition-transform">
                  <MapPin />
                </div>
                <div>
                  <h5 className="text-white font-black uppercase italic tracking-widest text-xs mb-2">
                    Main Headquarters
                  </h5>
                  <p className="text-gray-400 leading-relaxed font-medium">
                    12/B Global Logistics Park, South Cargo Terminal,
                    <br />
                    New Delhi, India - 110001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-[#0a1d37] rounded-2xl border border-white/10 flex items-center justify-center text-red-600 group-hover:-rotate-12 transition-transform">
                  <Headphones />
                </div>
                <div>
                  <h5 className="text-white font-black uppercase italic tracking-widest text-xs mb-2">
                    24/7 Support Line
                  </h5>
                  <p className="text-3xl font-black text-white italic">
                    +1800-LOCAL-MATE
                  </p>
                  <p className="text-red-600 text-[10px] font-black uppercase mt-1">
                    Average Wait Time: 2 Mins
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: 3D FORM SECTION --- */}
          <div className="lg:col-span-7 perspective-[1500px]">
            <ContactCard3D>
              <div className="bg-gradient-to-br from-[#0d1117] to-[#161b22] p-8 md:p-12 rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                {/* Internal Glow */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/20 blur-[100px] pointer-events-none group-hover:bg-red-600/30 transition-all duration-700" />

                <div style={{ transform: "translateZ(60px)" }}>
                  <h3 className="text-white text-3xl font-black uppercase italic mb-2">
                    Request a Quote
                  </h3>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-10">
                    Get a response within 15 minutes
                  </p>
                </div>

                <form
                  className="space-y-6"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="FULL NAME"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 focus:bg-white/10 transition-all outline-none uppercase font-bold text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <input
                        type="email"
                        placeholder="EMAIL ADDRESS"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 focus:bg-white/10 transition-all outline-none uppercase font-bold text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-gray-400 focus:text-white outline-none appearance-none uppercase font-bold text-xs">
                      <option>Service Type</option>
                      <option>Express Delivery</option>
                      <option>Global Freight</option>
                      <option>Warehouse Storage</option>
                    </select>
                    <input
                      type="text"
                      placeholder="PICKUP PINCODE"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 focus:bg-white/10 transition-all outline-none uppercase font-bold text-xs"
                    />
                  </div>

                  <textarea
                    rows="4"
                    placeholder="HOW CAN WE HELP?"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 focus:bg-white/10 transition-all outline-none uppercase font-bold text-xs"
                  />

                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(220,38,38,0.2)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-red-600 text-white font-black italic uppercase py-6 rounded-2xl flex items-center justify-center gap-4 group transition-all"
                  >
                    Send Dispatch Message
                    <Send
                      size={20}
                      className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform"
                    />
                  </motion.button>
                </form>

                {/* Shipping Icons Overlay */}
                <div className="absolute -bottom-10 -right-5 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                  <Truck size={300} strokeWidth={1} />
                </div>
              </div>
            </ContactCard3D>
          </div>
        </div>
      </div>

      <style jsx>{`
        .text-outline-white {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default CourierContactPremium;
