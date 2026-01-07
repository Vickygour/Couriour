import React from "react";
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
  return (
    <footer className="bg-[#0D1B2A] font-sans text-slate-200">
      {/* TOP INFO STRIP (FROM IMAGE) */}
      <div className="bg-[#081422] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 grid grid-cols-1 md:grid-cols-4 gap-4 text-[11px] font-bold">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-red-600" />
            <span>55 Main Street, Malborne, Australia</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-red-600" />
            <span>support@example.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-red-600" />
            <span>contact@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-red-600" />
            <span>734 H, Bryan Burlington, NC</span>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* BRAND */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
              <Truck size={20} className="text-white" />
            </div>
            <span className="text-2xl font-black italic uppercase">
              Local<span className="text-red-600">mate</span>
            </span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Smart logistics solutions with global reach, engineered for speed,
            security and reliability.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-red-600" />
              <span className="font-bold">+91 (450) 8822 11</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-red-600" />
              <span className="text-sm text-slate-400">
                Sector 62, Logistics Hub, New Delhi
              </span>
            </div>
          </div>
        </div>

        {/* LINKS + NEWSLETTER */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* LINKS */}
          <div>
            <h4 className="text-sm font-black uppercase mb-4 border-l-2 border-red-600 pl-3">
              Services
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>Express Parcel</li>
              <li>Warehousing</li>
              <li>Part Truckload</li>
              <li>Full Truckload</li>
              <li>International</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase mb-4 border-l-2 border-red-600 pl-3">
              Company
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>About Us</li>
              <li>News</li>
              <li>Careers</li>
              <li>Data Intelligence</li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="bg-[#081422] p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-black uppercase mb-2">Newsletter</h3>
            <p className="text-xs text-slate-400 mb-4">
              Get logistics insights & updates
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-[#0D1B2A] border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm outline-none"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-red-600 px-3 rounded-lg text-white">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SOCIAL + BOTTOM */}
      <div className="border-t border-white/10 bg-[#081422]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-4">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-lg bg-[#0D1B2A] border border-white/10 flex items-center justify-center hover:bg-red-600 transition"
              >
                <Icon size={16} />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <ShieldCheck size={16} className="text-green-500" />
            Secure & Encrypted Network
          </div>

          <p className="text-[11px] text-slate-500">© 2026 Localmate Systems</p>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
