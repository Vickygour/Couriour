import React from "react";
import { motion } from "framer-motion";
import { Globe, ShieldCheck, Zap, Users, ArrowRight } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#050b18] py-20 px-6 mt-20 md:mt-32">
      {/* --- Background High-Tech Elements --- */}
      <div className="absolute inset-0 z-0">
        {/* Animated Gradient Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>

        {/* Abstract Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* --- Left Side: Content --- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Zap size={16} className="text-red-500 fill-red-500" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">
              Since 1998 — Legacy of Speed
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white italic leading-[1.1] mb-8 uppercase tracking-tighter">
            We Don’t Just <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
              Move Parcels.
            </span>
            <br />
            We Move <span className="text-white">Trust.</span>
          </h1>

          <p className="text-gray-400 text-md md:text-lg font-medium leading-relaxed mb-10 max-w-xl italic">
            At Localmate, every shipment represents responsibility and trust.
            Our integrated logistics network connects local routes, major
            cities, and international borders to ensure fast, secure, and
            reliable deliveries— exactly when your business needs them.
          </p>

          <div className="flex flex-wrap gap-6">
            <button className="px-10 py-5 bg-red-600 text-white font-black italic uppercase tracking-widest rounded-2xl hover:bg-white hover:text-black transition-all duration-300 shadow-[0_20px_40px_-10px_rgba(220,38,38,0.5)] flex items-center gap-3">
              Learn Our Story <ArrowRight size={20} />
            </button>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-[#050b18]"
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="user"
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                Trusted by <br /> 2M+ Global Clients
              </p>
            </div>
          </div>
        </motion.div>

        {/* --- Right Side: Visual 3D Stack --- */}
        <div className="relative">
          {/* Main Visual Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            className="relative z-20 rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=1000"
              alt="Logistics"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050b18] via-transparent to-transparent"></div>
          </motion.div>

          {/* Floating Glass Cards */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 z-30 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl hidden md:block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center">
                <Globe className="text-white" size={24} />
              </div>
              <div>
                <p className="text-3xl font-black text-white leading-none">
                  220+
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">
                  Countries Reached
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute -bottom-6 -left-10 z-30 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl hidden md:block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <div>
                <p className="text-3xl font-black text-white leading-none">
                  99.9%
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">
                  Delivery Success
                </p>
              </div>
            </div>
          </motion.div>

          {/* Background Decorative Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full -z-10 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
