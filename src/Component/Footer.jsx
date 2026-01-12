import React from "react";
import { Link } from "react-router-dom"; // Link import karna na bhulein
import logo from "../assets/logo.png";
import {
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  Truck,
  ShieldCheck,
  Mail,
} from "lucide-react";

const EnhancedFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D1B2A] font-sans text-slate-200">
      {/* TOP INFO STRIP */}
      <div className="bg-[#081422] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] font-bold">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-red-600" />
            <span>Kamal Vihar, Burari, North Delhi-110084</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-red-600" />
            <a
              href="mailto:localmate2025@gmail.com"
              className="hover:text-red-500 transition"
            >
              localmate2025@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-red-600" />
            <a
              href="tel:+918826262858"
              className="hover:text-red-500 transition"
            >
              +91 8826262858
            </a>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* BRAND SECTION */}
        <div className="lg:col-span-4 space-y-6">
          <Link to="/" className="flex items-center gap-2 lg:gap-3 group">
            {/* LOGO CONTAINER: Added a subtle shadow and better scaling */}
            <div className="relative flex items-center justify-center transition-all duration-300 transform group-hover:rotate-3 group-hover:scale-110">
              <img
                src={logo}
                alt="Localmate"
                className="w-22 lg:w-32 h-auto object-contain drop-shadow-md"
              />
            </div>

            {/* TEXT BRANDING: Better font weight and spacing */}
            <div className="flex flex-col leading-none">
              <span className="text-2xl lg:text-3xl font-black italic tracking-tighter text-white">
                LOCAL<span className="text-red-600">MATE</span>
              </span>
              {/* Optional Tagline: Branding ko complete karne ke liye */}
              <span className="text-[10px] lg:text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
                Fast Delivery
              </span>
            </div>
          </Link>

          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Smart logistics solutions with global reach, engineered for speed,
            security and reliability. Delivering excellence across India.
          </p>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-black uppercase mb-5 border-l-2 border-red-600 pl-3">
              Our Services
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <Link
                  to="/services/express"
                  className="hover:text-red-500 hover:pl-2 transition-all"
                >
                  Express Parcel
                </Link>
              </li>
              <li>
                <Link
                  to="/services/warehousing"
                  className="hover:text-red-500 hover:pl-2 transition-all"
                >
                  Warehousing
                </Link>
              </li>
              <li>
                <Link
                  to="/services/part-truck"
                  className="hover:text-red-500 hover:pl-2 transition-all"
                >
                  Part Truckload
                </Link>
              </li>
              <li>
                <Link
                  to="/services/full-truck"
                  className="hover:text-red-500 hover:pl-2 transition-all"
                >
                  Full Truckload
                </Link>
              </li>
              <li>
                <Link
                  to="/services/Bike-service"
                  className="hover:text-red-500 hover:pl-2 transition-all"
                >
                  Bike Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-black uppercase mb-5 border-l-2 border-red-600 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-red-500 hover:pl-2 transition-all"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/tracking"
                  className="hover:text-red-500 hover:pl-2 transition-all"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-red-500 hover:pl-2 transition-all"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  to="/logins"
                  className="hover:text-red-500 hover:pl-2 transition-all"
                >
                  Partner Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="lg:col-span-3">
          <div className="bg-[#081422] p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-black uppercase mb-2">Stay Updated</h3>
            <p className="text-xs text-slate-400 mb-4">
              Subscribe for logistics insights.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-[#0D1B2A] border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm outline-none focus:border-red-600 transition"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-red-600 px-3 rounded-lg text-white hover:bg-red-700">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SOCIAL + BOTTOM STRIP */}
      <div className="border-t border-white/10 bg-[#081422]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:row justify-between items-center gap-6">
          <div className="flex gap-4">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-lg bg-[#0D1B2A] border border-white/10 flex items-center justify-center hover:bg-red-600 hover:-translate-y-1 transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <ShieldCheck size={16} className="text-green-500" />
            ISO 9001:2026 Certified Operations
          </div>
          <p className="text-[11px] text-slate-500">
            © {currentYear} Localmate Logistics. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
