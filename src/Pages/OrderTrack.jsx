import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  MapPin,
  Truck,
  Box,
  Camera,
  Thermometer,
  Wind,
  Search,
  Download,
  PhoneCall,
  MessageSquare,
  FileText,
  Eye,
  Cpu,
  Activity,
  Globe,
} from "lucide-react";

const TacticalTrackingView = () => {
  const [searchId, setSearchId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Simulated Database
  const shipmentData = {
    id: "LM-9920-X82",
    customer: "Vikram Rathore",
    origin: "New Delhi Terminal",
    destination: "Mumbai Central Hub",
    velocity: "62 km/h",
    temp: "22°C",
    status: "In Transit",
    driver: "Ravi Kumar",
    eta: "2 Hours",
    progress: 75,
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId) return;
    setIsSearching(true);
    // Neuro-simulation delay
    setTimeout(() => {
      setIsSearching(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <section className="bg-[#010409] min-h-screen py-20 px-6 font-sans relative overflow-hidden mt-32">
      {/* Background HUD Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full" />
        <Globe
          className="absolute -bottom-20 -left-20 w-[600px] h-[600px] text-white/5 animate-spin-slow"
          strokeWidth={0.5}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- SEARCH BAR: NEURAL UPLINK --- */}
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-white text-5xl font-black italic uppercase tracking-tighter mb-6">
              Global <span className="text-red-600">Trace.</span>
            </h2>
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 flex items-center">
                <div className="p-4 text-red-600">
                  <Cpu
                    size={24}
                    className={isSearching ? "animate-spin" : ""}
                  />
                </div>
                <input
                  type="text"
                  placeholder="ENTER DISPATCH ID (e.g. LM-9920-X82)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-white font-black italic tracking-widest placeholder:text-gray-700 uppercase"
                />
                <button className="bg-red-600 hover:bg-white text-white hover:text-black px-10 py-4 rounded-xl font-black uppercase italic text-xs transition-all flex items-center gap-2">
                  {isSearching ? "SYNCING..." : "LOCATE"} <Search size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* --- LEFT: LIVE METRICS --- */}
              <div className="lg:col-span-8 space-y-8">
                {/* Header Info */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                      Authenticated User
                    </p>
                    <h3 className="text-white text-3xl font-black italic uppercase italic leading-none">
                      {shipmentData.customer}
                    </h3>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                      <p className="text-gray-500 text-[8px] font-black uppercase tracking-widest">
                        Active ETA
                      </p>
                      <p className="text-white font-black text-xl italic">
                        {shipmentData.eta}
                      </p>
                    </div>
                    <div className="h-10 w-[1px] bg-white/10" />
                    <div className="bg-red-600 px-6 py-3 rounded-xl flex flex-col items-center justify-center shadow-lg">
                      <span className="text-[8px] font-black text-white/80 uppercase">
                        Progress
                      </span>
                      <span className="text-sm font-black text-white italic">
                        {shipmentData.progress}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tactical Pills */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatusPill
                    icon={<Truck size={18} />}
                    label="Speed"
                    value={shipmentData.velocity}
                  />
                  <StatusPill
                    icon={<Thermometer size={18} />}
                    label="Climate"
                    value={shipmentData.temp}
                  />
                  <StatusPill
                    icon={<ShieldCheck size={18} />}
                    label="Seal"
                    value="Verified"
                    color="text-green-500"
                  />
                  <StatusPill
                    icon={<Activity size={18} />}
                    label="Uplink"
                    value="99.9%"
                    color="text-blue-400"
                  />
                </div>

                {/* Live PDF Preview Simulation */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-10 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                      <FileText className="text-red-600" />
                      <h4 className="text-white font-black italic uppercase text-sm tracking-widest">
                        Manifest PDF Preview
                      </h4>
                    </div>
                    <button className="text-[10px] font-black text-gray-500 hover:text-white uppercase flex items-center gap-2">
                      <Download size={14} /> Full Download
                    </button>
                  </div>

                  {/* PDF UI Container */}
                  <div className="bg-white p-8 rounded-2xl text-black font-mono shadow-2xl relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90 z-10" />
                    <div className="flex justify-between border-b-2 border-black pb-4 mb-6">
                      <span className="font-black italic">
                        LOCALMATE LOGISTICS
                      </span>
                      <span className="text-[8px]">ORIGINAL COPY</span>
                    </div>
                    <div className="space-y-2 text-[10px]">
                      <p>SHIPPER: {shipmentData.customer.toUpperCase()}</p>
                      <p>
                        DESTINATION: {shipmentData.destination.toUpperCase()}
                      </p>
                      <p>TRACKING ID: {shipmentData.id}</p>
                      <p className="pt-4 border-t border-dotted border-black/20">
                        QUANTITY: 01 BOX [HEAVY DUTY]
                      </p>
                      <p>DECLARED VALUE: ₹45,000.00</p>
                    </div>
                    <div className="mt-10 pt-4 border-t border-black flex justify-between">
                      <div className="w-12 h-12 bg-black rounded" />
                      <span className="text-[8px] italic">
                        Authenticated by Neural Signature
                      </span>
                    </div>
                    <button className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-black text-white px-6 py-2 rounded-full font-black text-[8px] uppercase tracking-widest flex items-center gap-2 shadow-2xl">
                      <Eye size={12} /> View Full Manifest
                    </button>
                  </div>
                </div>
              </div>

              {/* --- RIGHT: AGENT & EVIDENCE --- */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-red-600 p-8 rounded-[3rem] shadow-[0_20px_60px_rgba(220,38,38,0.3)]">
                  <div className="flex items-center gap-4 mb-10">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${shipmentData.driver}`}
                      className="w-16 h-16 bg-white/20 rounded-2xl p-1"
                      alt=""
                    />
                    <div>
                      <p className="text-white font-black italic uppercase text-lg leading-none">
                        {shipmentData.driver}
                      </p>
                      <p className="text-white/60 text-[8px] font-black uppercase tracking-widest mt-1">
                        Elite Ops Driver
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full bg-white text-red-600 py-4 rounded-2xl font-black uppercase italic text-xs flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all">
                      <PhoneCall size={16} /> Direct Comms
                    </button>
                    <button className="w-full bg-black/20 text-white py-4 border border-white/20 rounded-2xl font-black uppercase italic text-xs flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all">
                      <MessageSquare size={16} /> Secure Message
                    </button>
                  </div>
                </div>

                {/* Evidence Box */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-6">
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800"
                      className="w-full h-full object-cover grayscale opacity-50"
                      alt=""
                    />
                    <div className="absolute top-3 left-3 bg-red-600 px-2 py-1 rounded text-[7px] font-black text-white uppercase italic animate-pulse">
                      Live Cam A-1
                    </div>
                  </div>
                  <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest text-center px-2">
                    Warehouse loading visual evidence. Package integrity: 100%
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 30s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

// Internal Status Pill
const StatusPill = ({ icon, label, value, color = "text-white" }) => (
  <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] hover:border-red-600/30 transition-all group">
    <div className="text-red-600 mb-3 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <p className="text-gray-500 text-[8px] font-black uppercase tracking-widest mb-1">
      {label}
    </p>
    <p
      className={`${color} text-sm font-black italic uppercase tracking-tighter`}
    >
      {value}
    </p>
  </div>
);

export default TacticalTrackingView;
