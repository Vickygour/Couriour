import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import API from "../../utils/api";
import {
  Search,
  Clock,
  CheckCircle,
  Navigation,
  Truck,
  Loader2,
  X,
} from "lucide-react";

const TrackingDashboard = () => {
  const [trackingCode, setTrackingCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [shipmentData, setShipmentData] = useState(null);
  const [statusHistory, setStatusHistory] = useState([]);
  const [liveLocation, setLiveLocation] = useState(null);

  const handleTrackShipment = async () => {
    if (!trackingCode.trim()) {
      toast.error("Please enter a tracking code!");
      return;
    }

    setLoading(true);
    try {
      const res = await API.get(`/track/${trackingCode.trim()}`);
      if (res.data.success) {
        const { shipment, statusHistory, liveLocation } = res.data.data;
        setShipmentData(shipment);
        setStatusHistory(statusHistory);
        setLiveLocation(liveLocation);
        toast.success("Shipment found");
      } else {
        toast.error("Shipment not found");
        setShipmentData(null);
      }
    } catch {
      toast.error("Invalid tracking code");
      setShipmentData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTrackingCode("");
    setShipmentData(null);
    setStatusHistory([]);
    setLiveLocation(null);
  };

  return (
    <section className="bg-slate-100 min-h-screen py-20 px-6 text-slate-900 relative overflow-hidden">
      {/* Background Text */}
      <div className="absolute top-0 right-0 text-[14rem] font-black text-slate-300/30 italic uppercase select-none">
        TRACK
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT PANEL */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 border border-slate-200 rounded-[2.5rem] p-10 shadow-xl backdrop-blur"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
                <span className="text-red-600 text-[10px] font-black uppercase tracking-widest">
                  System Online
                </span>
              </div>

              <h3 className="text-3xl font-black italic uppercase mb-6 text-slate-900">
                Track <span className="text-red-600">Shipment</span>
              </h3>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    value={trackingCode}
                    onChange={(e) =>
                      setTrackingCode(e.target.value.toUpperCase())
                    }
                    placeholder="LM-XXXXXX-IN"
                    className="w-full bg-slate-100 border border-slate-300 rounded-2xl px-6 py-5 text-slate-900 placeholder:text-slate-400 uppercase font-bold focus:border-red-600 outline-none"
                  />
                  {trackingCode && !loading && (
                    <button
                      onClick={handleReset}
                      className="absolute right-16 top-5 text-slate-400 hover:text-slate-700"
                    >
                      <X size={20} />
                    </button>
                  )}
                  <Search className="absolute right-6 top-5 text-red-600" />
                </div>

                <button
                  onClick={handleTrackShipment}
                  disabled={loading}
                  className="w-full bg-red-600 py-5 rounded-2xl font-black uppercase italic tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-3 text-white shadow-md"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" /> Tracking
                    </>
                  ) : (
                    <>
                      <Navigation className="animate-pulse" /> Track Now
                    </>
                  )}
                </button>
              </div>

              {/* Shipment Info */}
              {shipmentData && (
                <div className="mt-8 pt-8 border-t border-slate-200 space-y-4">
                  <InfoBox title="From" value={shipmentData.sender.name} />
                  <InfoBox title="To" value={shipmentData.receiver.name} />

                  <div className="grid grid-cols-2 gap-4">
                    <InfoBox
                      title="Weight"
                      value={`${shipmentData.package.weight} KG`}
                    />
                    <InfoBox
                      title="Method"
                      value={shipmentData.deliveryMethod.replace("_", " ")}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-7 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Order Placed",
                "Picked Up",
                "In Transit",
                "Out for Delivery",
                "Delivered",
              ].map((label, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/80 border border-slate-200 p-6 rounded-3xl shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-600/10 text-red-600 rounded-2xl">
                      {i === 4 ? <CheckCircle /> : <Truck />}
                    </div>
                    <div>
                      <h4 className="font-black uppercase italic text-slate-900">
                        {label}
                      </h4>
                      <p className="text-[10px] text-slate-500 uppercase">
                        Pending / Live
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* MAP */}
            <div className="mt-10 h-64 rounded-[2.5rem] overflow-hidden border border-slate-200 relative shadow-md">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b"
                className="w-full h-full object-cover brightness-75"
                alt="map"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 px-8 py-4 rounded-2xl border border-slate-200 font-black uppercase text-sm text-slate-900 shadow">
                  {shipmentData
                    ? shipmentData.status.replace("_", " ")
                    : "Enter Tracking ID"}
                </div>
              </div>
            </div>

            {/* HISTORY */}
            {statusHistory.length > 0 && (
              <div className="mt-10 bg-white/80 border border-slate-200 rounded-3xl p-6 shadow">
                <h4 className="font-black uppercase italic flex items-center gap-2 mb-4 text-slate-900">
                  <Clock className="text-red-600" /> Status History
                </h4>
                <div className="space-y-3">
                  {statusHistory.map((h, i) => (
                    <div
                      key={i}
                      className="border-b border-slate-200 pb-3 last:border-0"
                    >
                      <p className="font-bold uppercase text-sm text-slate-800">
                        {h.status.replace("_", " ")}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {new Date(h.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- Helper ---------- */
const InfoBox = ({ title, value }) => (
  <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
    <p className="text-[10px] uppercase tracking-widest text-slate-500">
      {title}
    </p>
    <p className="font-bold text-slate-900">{value}</p>
  </div>
);

export default TrackingDashboard;
