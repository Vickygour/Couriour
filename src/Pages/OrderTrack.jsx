import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../utils/api";
import {
  ShieldCheck,
  MapPin,
  Truck,
  Box,
  Thermometer,
  Search,
  Download,
  PhoneCall,
  MessageSquare,
  FileText,
  Eye,
  Cpu,
  Activity,
  Globe,
  Loader2,
  AlertCircle,
  Navigation as NavigationIcon,
} from "lucide-react";

const TacticalTrackingView = () => {
  const [searchId, setSearchId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [shipmentData, setShipmentData] = useState(null);
  const [statusHistory, setStatusHistory] = useState([]);
  const [liveLocation, setLiveLocation] = useState(null);

  // Logic remains identical to original
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) {
      toast.error("Please enter a tracking ID!");
      return;
    }
    setIsSearching(true);
    setShowResult(false);
    try {
      const response = await API.get(`/track/${searchId.trim()}`);
      if (response.data.success) {
        const { shipment, statusHistory, liveLocation } = response.data.data;
        setShipmentData(shipment);
        setStatusHistory(statusHistory);
        setLiveLocation(liveLocation);
        setShowResult(true);
        toast.success("Shipment located!");
      } else {
        toast.error(response.data.message || "Shipment not found");
      }
    } catch (error) {
      toast.error("Invalid tracking code");
    } finally {
      setIsSearching(false);
    }
  };

  const getVelocity = () =>
    !liveLocation || !liveLocation.speed
      ? "0 km/h"
      : `${Math.round(liveLocation.speed)} km/h`;
  const getTemperature = () =>
    liveLocation?.temperature ? `${liveLocation.temperature}°C` : "22°C";
  const getProgress = () => {
    if (!shipmentData) return 0;
    const statusProgress = {
      pending: 10,
      confirmed: 20,
      assigned: 30,
      picked_up: 40,
      in_transit: 70,
      out_for_delivery: 90,
      delivered: 100,
    };
    return statusProgress[shipmentData.status] || 0;
  };

  return (
    <section className="bg-slate-100 min-h-screen py-24 mt-20 md:mt-32 px-6 font-sans relative overflow-hidden">
      <ToastContainer theme="light" />

      {/* Background Decor matching Global Network theme */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-slate-300/20 blur-[100px] rounded-full" />
        <Globe
          className="absolute -bottom-20 -left-20 w-[600px] h-[600px] text-slate-400/10 animate-[spin_60s_linear_infinite]"
          strokeWidth={0.5}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- SEARCH BAR: NEURAL UPLINK --- */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-red-600 text-[10px] uppercase tracking-[0.4em] font-black mb-2">
              Satellite Sync Online
            </p>
            <h2 className="text-slate-900 text-6xl font-black   uppercase tracking-tighter mb-8 leading-none">
              Tactical <span className="text-slate-400">Trace.</span>
            </h2>

            <form onSubmit={handleSearch} className="relative group">
              <div className="relative bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl p-2 flex items-center transition-all focus-within:border-red-600">
                <div className="p-4 text-red-600">
                  <Cpu
                    size={24}
                    className={isSearching ? "animate-spin" : ""}
                  />
                </div>
                <input
                  type="text"
                  placeholder="DISPATCH IDENTIFIER (LM-XXXXXX-IN)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                  disabled={isSearching}
                  className="w-full bg-transparent border-none outline-none text-slate-900 font-black   tracking-widest placeholder:text-slate-300 uppercase disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSearching || !searchId}
                  className="bg-red-600 hover:bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase   text-xs transition-all flex items-center gap-3 shadow-lg shadow-red-600/20"
                >
                  {isSearching ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      <Search size={16} /> Locate
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {showResult && shipmentData && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* --- LEFT: METRICS --- */}
              <div className="lg:col-span-8 space-y-8">
                {/* Header Info */}
                <div className="bg-white/70 border border-slate-200 p-8 rounded-[3rem] backdrop-blur flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
                  <div>
                    <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                      Origin Authority
                    </p>
                    <h3 className="text-slate-900 text-4xl font-black   uppercase leading-none">
                      {shipmentData.sender.name}
                    </h3>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2">
                      Terminal: {shipmentData.sender.address.city},{" "}
                      {shipmentData.sender.address.state}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                      <p className="text-slate-400 text-[8px] font-black uppercase tracking-widest">
                        Est. Completion
                      </p>
                      <p className="text-slate-900 font-black text-2xl   tracking-tighter">
                        02:44:00
                      </p>
                    </div>
                    <div className="h-10 w-[1px] bg-slate-200" />
                    <div className="bg-red-600 px-6 py-3 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-red-600/20">
                      <span className="text-[8px] font-black text-white/80 uppercase">
                        Progress
                      </span>
                      <span className="text-sm font-black text-white  ">
                        {getProgress()}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tactical Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatusPill
                    icon={<Truck size={18} />}
                    label="Velocity"
                    value={getVelocity()}
                  />
                  <StatusPill
                    icon={<Thermometer size={18} />}
                    label="Atmosphere"
                    value={getTemperature()}
                  />
                  <StatusPill
                    icon={<ShieldCheck size={18} />}
                    label="Seal Integrity"
                    value="Stable"
                    color="text-green-600"
                  />
                  <StatusPill
                    icon={<Activity size={18} />}
                    label="Signal"
                    value="99.9%"
                    color="text-blue-600"
                  />
                </div>

                {/* Manifest Simulation */}
                <div className="bg-white border border-slate-200 rounded-[3rem] p-10 relative shadow-lg">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                      <FileText className="text-red-600" />
                      <h4 className="text-slate-900 font-black   uppercase text-sm tracking-widest">
                        Shipment Manifest
                      </h4>
                    </div>
                    <button className="text-[10px] font-black text-slate-400 hover:text-red-600 uppercase flex items-center gap-2 transition-all">
                      <Download size={14} /> Initialize Download
                    </button>
                  </div>

                  <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-slate-700 font-mono relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/90 z-10" />
                    <div className="flex justify-between border-b-2 border-slate-300 pb-4 mb-6">
                      <span className="font-black   text-slate-900">
                        LOCALMATE OPS
                      </span>
                      <span className="text-[8px] font-bold text-slate-400 tracking-widest">
                        SYSTEM DATA V2.0
                      </span>
                    </div>
                    <div className="space-y-3 text-[10px] font-bold uppercase tracking-tight">
                      <p>
                        CONSIGNOR:{" "}
                        <span className="text-slate-900">
                          {shipmentData.sender.name}
                        </span>
                      </p>
                      <p>
                        CONSIGNEE:{" "}
                        <span className="text-slate-900">
                          {shipmentData.receiver.name}
                        </span>
                      </p>
                      <p>
                        ROUTE: {shipmentData.sender.address.city} {">>"}{" "}
                        {shipmentData.receiver.address.city}
                      </p>
                      <p>UID: {shipmentData.trackingCode}</p>
                      <div className="pt-4 border-t border-slate-200">
                        <p>NET WEIGHT: {shipmentData.package.weight} KG</p>
                        <p>
                          TRANSIT:{" "}
                          {shipmentData.deliveryMethod.replace("_", " ")}
                        </p>
                      </div>
                      <p className="text-red-600 pt-2 text-xs">
                        VALUATION: ₹{shipmentData.pricing.total.toFixed(2)}
                      </p>
                    </div>
                    <button className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-[9px] uppercase tracking-widest flex items-center gap-3 hover:bg-red-600 transition-all">
                      <Eye size={14} /> Full Verification
                    </button>
                  </div>
                </div>
              </div>

              {/* --- RIGHT: AGENT & GPS --- */}
              <div className="lg:col-span-4 space-y-8">
                {/* Agent Card */}
                <div className="bg-red-600 p-10 rounded-[4rem] shadow-xl shadow-red-600/20 text-white">
                  <div className="flex items-center gap-5 mb-10">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                        shipmentData.assignedTo?.name || "Agent"
                      }`}
                      className="w-20 h-20 bg-white/20 rounded-3xl p-1"
                      alt="agent"
                    />
                    <div>
                      <p className="text-white font-black   uppercase text-2xl leading-none">
                        {shipmentData.assignedTo?.name || "STANDBY"}
                      </p>
                      <p className="text-white/60 text-[8px] font-black uppercase tracking-widest mt-2">
                        Elite Field Operative
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <button className="w-full bg-white text-red-600 py-5 rounded-3xl font-black uppercase   text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-slate-900 hover:text-white transition-all">
                      <PhoneCall size={16} /> Satellite Comm
                    </button>
                    <button className="w-full bg-red-700/50 border border-white/20 text-white py-5 rounded-3xl font-black uppercase   text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:text-red-600 transition-all">
                      <MessageSquare size={16} /> Secure Text
                    </button>
                  </div>
                </div>

                {/* GPS Evidence Box */}
                <div className="bg-white border border-slate-200 rounded-[3.5rem] p-6 shadow-sm">
                  <div className="relative aspect-square rounded-[2.5rem] overflow-hidden mb-6 bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=800"
                      className="w-full h-full object-cover grayscale opacity-30 contrast-125"
                      alt="map"
                    />
                    <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded-full text-[8px] font-black text-white uppercase   animate-pulse">
                      Live Telemetry Active
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-red-600/20 rounded-full animate-ping" />
                      <div className="w-4 h-4 bg-red-600 rounded-full border-4 border-white shadow-xl" />
                    </div>
                  </div>
                  <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] text-center">
                    Node: {liveLocation ? "UPLINK STABLE" : "GPS STANDBY"}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!showResult && !isSearching && searchId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/50 border border-slate-200 rounded-[3rem]"
          >
            <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">
              Node Unreachable / Incorrect ID
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const StatusPill = ({ icon, label, value, color = "text-slate-900" }) => (
  <div className="bg-white border border-slate-200 p-6 rounded-[2.5rem] hover:border-red-600 transition-all shadow-sm group">
    <div className="text-red-600 mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <p className="text-slate-400 text-[8px] font-black uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className={`${color} text-sm font-black   uppercase tracking-tighter`}>
      {value}
    </p>
  </div>
);

export default TacticalTrackingView;
