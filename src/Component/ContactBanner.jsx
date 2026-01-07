import React from "react";
import { motion } from "framer-motion";
import { Globe, ShieldCheck, Users, ArrowRight } from "lucide-react";

const ContactHero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#050b18] px-6 py-24 mt-32">
      {/* --- Background Effects --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 blur-[140px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[140px] rounded-full"></div>
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* --- Left Content --- */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Users size={16} className="text-red-500" />
            <span className="text-xs font-extrabold uppercase tracking-[0.3em] text-gray-400">
              Let’s Connect
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 uppercase tracking-tight">
            Get In Touch <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
              With Our Team
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
            Whether you have a question, need expert support, or want to explore
            new opportunities, our team is always ready to help you. We believe
            strong communication builds long-term trust.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex -space-x-3 ">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i + 20}`}
                  alt="Team"
                  className="w-11 h-11 rounded-full border-2 border-[#050b18]"
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
              Trusted by professionals <br /> across the globe
            </p>
          </div>
        </motion.div>

        {/* --- Right Visual --- */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative  rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1000"
              alt="Contact Team"
              className="w-full h-[480px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050b18] via-transparent to-transparent"></div>
          </motion.div>

          {/* Floating Card - Global Support */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-10 -right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl hidden md:block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center">
                <Globe className="text-white" />
              </div>
              <div>
                <p className="text-3xl font-black text-white">24/7</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">
                  Global Support
                </p>
              </div>
            </div>
          </motion.div>

          {/* Floating Card - Security */}
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-6 -left-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl hidden md:block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="text-white" />
              </div>
              <div>
                <p className="text-3xl font-black text-white">100%</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">
                  Secure Communication
                </p>
              </div>
            </div>
          </motion.div>

          <div className="absolute inset-0 border border-white/5 rounded-full -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
