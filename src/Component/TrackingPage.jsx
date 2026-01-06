import React from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Package, Clock, CheckCircle } from "lucide-react";

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
                <button className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase italic tracking-widest hover:bg-white hover:text-[#0a1d37] transition-all shadow-lg shadow-red-600/20">
                  Track Parcel Now
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual Status Steps */}
          <div className="lg:col-span-7 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "Order Placed",
                  time: "09:00 AM",
                  done: true,
                  icon: <Package />,
                },
                {
                  label: "In Warehouse",
                  time: "11:30 AM",
                  done: true,
                  icon: <MapPin />,
                },
                {
                  label: "In Transit",
                  time: "02:15 PM",
                  done: false,
                  icon: <Clock />,
                },
                {
                  label: "Delivered",
                  time: "Waiting",
                  done: false,
                  icon: <CheckCircle />,
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-6 rounded-3xl border-2 transition-all ${
                    step.done
                      ? "border-red-600 bg-white shadow-xl"
                      : "border-slate-200 bg-transparent opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`${
                        step.done ? "text-red-600" : "text-slate-400"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="font-black italic uppercase text-slate-900">
                        {step.label}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {step.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Live Delivery Preview Image */}
            <div className="mt-8 rounded-[2rem] overflow-hidden h-48 relative group">
              <img
                src="https://images.unsplash.com/photo-1551829141-947c397a82fb?q=80&w=1000"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                alt="map"
              />
              <div className="absolute inset-0 bg-red-600/20 mix-blend-multiply"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur px-6 py-2 rounded-full font-black italic text-[#0a1d37] flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                  LIVE TRACKING MAP ACTIVE
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
