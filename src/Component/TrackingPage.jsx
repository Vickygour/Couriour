import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Package,
  Clock,
  CheckCircle,
  Navigation,
} from "lucide-react";

const TrackingDashboard = () => {
  return (
    <section className="bg-[#f8fafc] py-20 px-6 relative overflow-hidden">
      {/* Decorative Text Background */}
      <div className="absolute top-0 right-0 text-[15rem] font-black text-slate-100 italic select-none pointer-events-none uppercase leading-none opacity-40">
        Trace
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Input Box */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-[#0a1d37] p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-3xl rounded-full"></div>

              {/* Live Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </span>
                <span className="text-red-600 text-[10px] font-black uppercase tracking-widest">
                  System Online
                </span>
              </div>

              <h3 className="text-3xl font-black text-white italic uppercase mb-6 tracking-tighter">
                Real-Time <span className="text-red-600">Tracking</span>
              </h3>
              <p className="text-gray-400 text-sm mb-8 italic">
                Apne parcel ka status check karein instantaneous live updates ke
                saath.
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tracking ID: LM-9920-X"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-red-600 outline-none transition-all italic font-bold"
                  />
                  <Search className="absolute right-6 top-5 text-red-600" />
                </div>
                <button className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase italic tracking-widest hover:bg-white hover:text-[#0a1d37] transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-3">
                  <Navigation size={18} className="animate-pulse" />
                  Track Parcel Now
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual Status Steps */}
          <div className="lg:col-span-7 pt-10 relative">
            {/* The Connecting Line (Vertical in mobile, Horizontal/Grid logic here) */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full h-[2px] bg-slate-200 hidden md:block -z-0">
              {/* Animated Progress Filler */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "45%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-red-600 shadow-[0_0_10px_#dc2626]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {[
                {
                  label: "Order Placed",
                  time: "09:00 AM",
                  done: true,
                  active: false,
                  icon: <Package />,
                },
                {
                  label: "In Warehouse",
                  time: "11:30 AM",
                  done: true,
                  active: false,
                  icon: <MapPin />,
                },
                {
                  label: "In Transit",
                  time: "Live Moving",
                  done: true,
                  active: true, // This is the current state
                  icon: <Navigation className="animate-bounce" />,
                },
                {
                  label: "Delivered",
                  time: "Estimated: 06:00 PM",
                  done: false,
                  active: false,
                  icon: <CheckCircle />,
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-6 rounded-3xl border-2 transition-all relative overflow-hidden ${
                    step.active
                      ? "border-red-600 bg-white shadow-2xl scale-105 z-20"
                      : step.done
                      ? "border-slate-300 bg-white shadow-md"
                      : "border-slate-100 bg-slate-50 opacity-60"
                  }`}
                >
                  {/* Active Step Glow */}
                  {step.active && (
                    <div className="absolute top-0 right-0 p-2">
                      <span className="flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-2xl ${
                        step.done
                          ? "bg-red-50 text-red-600"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <h4
                        className={`font-black italic uppercase ${
                          step.active ? "text-red-600" : "text-slate-900"
                        }`}
                      >
                        {step.label}
                      </h4>
                      <p
                        className={`text-[10px] font-bold uppercase tracking-widest ${
                          step.active
                            ? "text-red-500 animate-pulse"
                            : "text-slate-400"
                        }`}
                      >
                        {step.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Live Delivery Preview Image */}
            <div className="mt-8 rounded-[2.5rem] overflow-hidden h-64 relative group border-4 border-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000"
                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                alt="map"
              />

              {/* Radar Effect Over Map */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-red-500/20 rounded-full animate-[ping_3s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-red-500/30 rounded-full animate-[ping_4s_linear_infinite]"></div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d37] via-transparent to-transparent opacity-60"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[#0a1d37]/90 backdrop-blur-md px-8 py-4 rounded-2xl font-black italic text-white flex flex-col items-center gap-1 shadow-2xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_#dc2626]"></span>
                    <span className="tracking-[0.2em] text-sm uppercase">
                      GPS: Signal Strong
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 not-italic font-medium">
                    Last updated: 2 mins ago
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackingDashboard;
