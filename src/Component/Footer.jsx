import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  Truck,
  ShieldCheck,
  Globe,
  Clock,
} from "lucide-react";

const EnhancedFooter = () => {
  const partners = [
    {
      name: "Logotype",
      logo: "https://cdn-icons-png.flaticon.com/512/882/882731.png",
    },
    {
      name: "Duragas",
      logo: "https://cdn-icons-png.flaticon.com/512/882/882747.png",
    },
    {
      name: "Turbologo",
      logo: "https://cdn-icons-png.flaticon.com/512/882/882730.png",
    },
    {
      name: "Maxton",
      logo: "https://cdn-icons-png.flaticon.com/512/882/882736.png",
    },
  ];

  return (
    <footer className="bg-[#001D26] pt-24 font-sans relative overflow-hidden">
      {/* 2. MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20 border-b border-white/5">
        {/* BRAND & CONTACT (4 Columns) */}
        <div className="lg:col-span-4 space-y-10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
              <Truck size={20} className="text-white" />
            </div>
            <span className="text-white font-black italic text-2xl uppercase tracking-tighter">
              Local<span className="text-red-600">mate</span>
            </span>
          </div>

          <p className="text-gray-400 text-sm italic font-medium leading-relaxed max-w-sm">
            Leading the future of logistics through advanced neural networks and
            a legacy of trust since 1990.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                  Global Support
                </p>
                <p className="text-white font-black text-xl italic tracking-tight">
                  +880 (123) 456 88
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                  Headquarters
                </p>
                <p className="text-white font-bold text-xs uppercase tracking-wider leading-relaxed">
                  55 Main Street, 2nd block <br /> Malborne, Australia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NEWSLETTER CONSOLE (8 Columns - Full width feel) */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-6">
                <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] italic border-l-2 border-red-600 pl-3">
                  Expertise
                </h4>
                <ul className="space-y-4">
                  {[
                    "Request A Freight",
                    "Our Services",
                    "Abandonment Cart",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-500 hover:text-red-600 text-[10px] font-black uppercase tracking-widest transition-all"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] italic border-l-2 border-red-600 pl-3">
                  Network
                </h4>
                <ul className="space-y-4">
                  {["What We Do", "Shipments", "Pricing Flexibility"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-gray-500 hover:text-red-600 text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Newsletter Box (Inspired by Image 198941) */}
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-b from-red-600 to-transparent transform translate-x-10 -skew-x-12 opacity-40 group-hover:translate-x-0 transition-transform duration-1000" />

              <div className="relative z-10">
                <h3 className="text-white text-2xl font-black italic uppercase tracking-tighter leading-none mb-4">
                  Subscribe <br />{" "}
                  <span className="text-red-600">Newsletter</span>
                </h3>
                <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-6">
                  Every challenge is an opportunity
                </p>

                <form className="relative">
                  <input
                    type="email"
                    placeholder="CORPORATE EMAIL"
                    className="w-full bg-[#001D26] border border-white/10 rounded-xl py-4 pl-6 pr-12 text-[10px] font-black text-white outline-none focus:border-red-600 transition-all"
                  />
                  <button className="absolute right-2 top-2 bottom-2 bg-red-600 text-white px-4 rounded-lg hover:bg-white hover:text-red-600 transition-all">
                    <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Social Icons Strip */}
          <div className="mt-12 flex items-center justify-between pt-10 border-t border-white/5">
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 text-white/20">
              <ShieldCheck size={20} />
              <span className="text-[9px] font-black uppercase tracking-[0.4em]">
                End-to-End Encryption
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM STRIP */}
      <div className="py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.5em]">
            © 2026 Localmate Systems. Precision Logistics.
          </p>
          <div className="flex gap-10">
            {["Terms", "Privacy", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[9px] text-gray-500 font-black uppercase tracking-widest hover:text-red-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
};

export default EnhancedFooter;
