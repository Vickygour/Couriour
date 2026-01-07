import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import API from '../../utils/api'; // Your API instance
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
  Loader2,
  AlertCircle,
} from 'lucide-react';

const TacticalTrackingView = () => {
  const [searchId, setSearchId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [shipmentData, setShipmentData] = useState(null);
  const [statusHistory, setStatusHistory] = useState([]);
  const [liveLocation, setLiveLocation] = useState(null);

  // Handle Search with Backend API
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchId.trim()) {
      toast.error('Please enter a tracking ID!');
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

        toast.success('Shipment located successfully!');
      } else {
        toast.error(response.data.message || 'Shipment not found');
        setShowResult(false);
      }
    } catch (error) {
      console.error('Tracking Error:', error);
      toast.error(error.response?.data?.message || 'Invalid tracking code');
      setShowResult(false);
    } finally {
      setIsSearching(false);
    }
  };

  // Calculate velocity (mock for now - can be real from GPS data)
  const getVelocity = () => {
    if (!shipmentData) return '-- km/h';
    if (!liveLocation || !liveLocation.speed) return '0 km/h';
    return `${Math.round(liveLocation.speed)} km/h`;
  };

  // Get climate/temperature
  const getTemperature = () => {
    if (!shipmentData) return '--°C';
    if (liveLocation && liveLocation.temperature) {
      return `${liveLocation.temperature}°C`;
    }
    return '22°C'; // Default
  };

  // Get progress percentage
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

  // Get ETA
  const getETA = () => {
    if (!shipmentData) return '-- Hours';

    if (shipmentData.status === 'delivered') {
      return 'Delivered';
    }

    if (shipmentData.estimatedDelivery) {
      const now = new Date();
      const eta = new Date(shipmentData.estimatedDelivery);
      const diffHours = Math.round((eta - now) / (1000 * 60 * 60));

      if (diffHours < 0) return 'Delayed';
      if (diffHours < 24) return `${diffHours} Hours`;

      const diffDays = Math.round(diffHours / 24);
      return `${diffDays} Days`;
    }

    return 'Calculating...';
  };

  // Get uplink status
  const getUplinkStatus = () => {
    if (!liveLocation) return 'Standby';

    const lastUpdate = new Date(liveLocation.lastUpdated);
    const now = new Date();
    const diffMinutes = Math.round((now - lastUpdate) / (1000 * 60));

    if (diffMinutes < 5) return '99.9%';
    if (diffMinutes < 30) return '85.0%';
    return 'Offline';
  };

  // Download Invoice PDF
  const handleDownloadInvoice = () => {
    if (!shipmentData) {
      toast.error('No shipment data available!');
      return;
    }

    // You can implement actual PDF download from backend
    // For now, showing success message
    toast.success('Invoice download started!');

    // Example: If backend provides PDF URL
    // window.open(`${API.defaults.baseURL}/shipment/${shipmentData.trackingCode}/invoice`, '_blank');
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
                    className={isSearching ? 'animate-spin' : ''}
                  />
                </div>
                <input
                  type="text"
                  placeholder="ENTER DISPATCH ID (e.g. LM-XXXXXX-IN)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                  disabled={isSearching}
                  className="w-full bg-transparent border-none outline-none text-white font-black italic tracking-widest placeholder:text-gray-700 uppercase disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSearching || !searchId}
                  className="bg-red-600 hover:bg-white text-white hover:text-black px-10 py-4 rounded-xl font-black uppercase italic text-xs transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSearching ? (
                    <>
                      SYNCING... <Loader2 size={16} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      LOCATE <Search size={16} />
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
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
                    <h3 className="text-white text-3xl font-black italic uppercase leading-none">
                      {shipmentData.sender.name}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">
                      {shipmentData.sender.address.city},{' '}
                      {shipmentData.sender.address.state}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                      <p className="text-gray-500 text-[8px] font-black uppercase tracking-widest">
                        Active ETA
                      </p>
                      <p className="text-white font-black text-xl italic">
                        {getETA()}
                      </p>
                    </div>
                    <div className="h-10 w-[1px] bg-white/10" />
                    <div className="bg-red-600 px-6 py-3 rounded-xl flex flex-col items-center justify-center shadow-lg">
                      <span className="text-[8px] font-black text-white/80 uppercase">
                        Progress
                      </span>
                      <span className="text-sm font-black text-white italic">
                        {getProgress()}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tactical Pills */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatusPill
                    icon={<Truck size={18} />}
                    label="Speed"
                    value={getVelocity()}
                  />
                  <StatusPill
                    icon={<Thermometer size={18} />}
                    label="Climate"
                    value={getTemperature()}
                  />
                  <StatusPill
                    icon={<ShieldCheck size={18} />}
                    label="Seal"
                    value={
                      shipmentData.payment.status === 'completed'
                        ? 'Verified'
                        : 'Pending'
                    }
                    color={
                      shipmentData.payment.status === 'completed'
                        ? 'text-green-500'
                        : 'text-yellow-500'
                    }
                  />
                  <StatusPill
                    icon={<Activity size={18} />}
                    label="Uplink"
                    value={getUplinkStatus()}
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
                    <button
                      onClick={handleDownloadInvoice}
                      className="text-[10px] font-black text-gray-500 hover:text-white uppercase flex items-center gap-2 transition-all"
                    >
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
                      <p>SHIPPER: {shipmentData.sender.name.toUpperCase()}</p>
                      <p>
                        RECEIVER: {shipmentData.receiver.name.toUpperCase()}
                      </p>
                      <p>
                        ORIGIN: {shipmentData.sender.address.city.toUpperCase()}
                        , {shipmentData.sender.address.pincode}
                      </p>
                      <p>
                        DESTINATION:{' '}
                        {shipmentData.receiver.address.city.toUpperCase()},{' '}
                        {shipmentData.receiver.address.pincode}
                      </p>
                      <p>TRACKING ID: {shipmentData.trackingCode}</p>
                      <p className="pt-4 border-t border-dotted border-black/20">
                        PACKAGE WEIGHT: {shipmentData.package.weight} KG
                      </p>
                      <p>
                        DELIVERY METHOD:{' '}
                        {shipmentData.deliveryMethod
                          .toUpperCase()
                          .replace('_', ' ')}
                      </p>
                      <p>
                        DECLARED VALUE: ₹
                        {shipmentData.package.value
                          ? shipmentData.package.value.toLocaleString()
                          : '0'}
                      </p>
                      <p className="pt-2 font-bold">
                        TOTAL AMOUNT: ₹{shipmentData.pricing.total.toFixed(2)}
                      </p>
                    </div>
                    <div className="mt-10 pt-4 border-t border-black flex justify-between">
                      <div className="w-12 h-12 bg-black rounded" />
                      <span className="text-[8px] italic">
                        Authenticated by Neural Signature
                      </span>
                    </div>
                    <button
                      onClick={handleDownloadInvoice}
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-black text-white px-6 py-2 rounded-full font-black text-[8px] uppercase tracking-widest flex items-center gap-2 shadow-2xl hover:bg-red-600 transition-all"
                    >
                      <Eye size={12} /> View Full Manifest
                    </button>
                  </div>
                </div>

                {/* Status History Timeline */}
                {statusHistory.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 p-8 rounded-[3rem]"
                  >
                    <h4 className="text-white font-black italic uppercase text-sm tracking-widest mb-6 flex items-center gap-2">
                      <Activity className="text-red-600" size={18} />
                      Mission Timeline
                    </h4>
                    <div className="space-y-4">
                      {statusHistory.map((history, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-0"
                        >
                          <div className="w-3 h-3 rounded-full bg-red-600 mt-1 flex-shrink-0 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
                          <div className="flex-1">
                            <p className="text-white font-bold text-sm uppercase">
                              {history.status.replace('_', ' ')}
                            </p>
                            {history.remarks && (
                              <p className="text-gray-400 text-xs mt-1">
                                {history.remarks}
                              </p>
                            )}
                            <p className="text-gray-600 text-[10px] mt-1 font-bold">
                              {new Date(history.timestamp).toLocaleString(
                                'en-IN',
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* --- RIGHT: AGENT & EVIDENCE --- */}
              <div className="lg:col-span-4 space-y-8">
                {/* Driver/Agent Card */}
                <div className="bg-red-600 p-8 rounded-[3rem] shadow-[0_20px_60px_rgba(220,38,38,0.3)]">
                  <div className="flex items-center gap-4 mb-10">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                        shipmentData.assignedTo?.name || 'Agent'
                      }`}
                      className="w-16 h-16 bg-white/20 rounded-2xl p-1"
                      alt="driver"
                    />
                    <div>
                      <p className="text-white font-black italic uppercase text-lg leading-none">
                        {shipmentData.assignedTo?.name || 'Awaiting Assignment'}
                      </p>
                      <p className="text-white/60 text-[8px] font-black uppercase tracking-widest mt-1">
                        {shipmentData.assignedTo
                          ? 'Elite Ops Driver'
                          : 'Standby Mode'}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button
                      disabled={!shipmentData.assignedTo}
                      className="w-full bg-white text-red-600 py-4 rounded-2xl font-black uppercase italic text-xs flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <PhoneCall size={16} />
                      {shipmentData.assignedTo
                        ? 'Direct Comms'
                        : 'Not Available'}
                    </button>
                    <button
                      disabled={!shipmentData.assignedTo}
                      className="w-full bg-black/20 text-white py-4 border border-white/20 rounded-2xl font-black uppercase italic text-xs flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MessageSquare size={16} /> Secure Message
                    </button>
                  </div>

                  {/* Driver Phone Number */}
                  {shipmentData.assignedTo?.phone && (
                    <div className="mt-6 pt-6 border-t border-white/20">
                      <p className="text-white/60 text-[8px] font-black uppercase tracking-widest mb-1">
                        Contact Number
                      </p>
                      <p className="text-white font-bold text-sm">
                        {shipmentData.assignedTo.phone}
                      </p>
                    </div>
                  )}
                </div>

                {/* Evidence Box - Live Location Map */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-6">
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800"
                      className="w-full h-full object-cover grayscale opacity-50"
                      alt="map"
                    />
                    {liveLocation && (
                      <div className="absolute top-3 left-3 bg-red-600 px-2 py-1 rounded text-[7px] font-black text-white uppercase italic animate-pulse">
                        Live GPS Active
                      </div>
                    )}
                    {['in_transit', 'out_for_delivery'].includes(
                      shipmentData.status,
                    ) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 bg-red-600 rounded-full animate-ping"></div>
                        <div className="w-2 h-2 bg-red-600 rounded-full absolute"></div>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest text-center px-2">
                    {liveLocation
                      ? `Last updated: ${new Date(
                          liveLocation.lastUpdated,
                        ).toLocaleTimeString()}`
                      : 'GPS tracking standby. Package integrity: 100%'}
                  </p>
                </div>

                {/* Package Info Card */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-[3rem]">
                  <h5 className="text-white font-black italic uppercase text-xs mb-4 flex items-center gap-2">
                    <Box size={16} className="text-red-600" />
                    Package Specs
                  </h5>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Weight:</span>
                      <span className="text-white font-bold">
                        {shipmentData.package.weight} KG
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fragile:</span>
                      <span
                        className={`font-bold ${
                          shipmentData.package.fragile
                            ? 'text-red-500'
                            : 'text-green-500'
                        }`}
                      >
                        {shipmentData.package.fragile ? 'YES' : 'NO'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-white font-bold uppercase">
                        {shipmentData.status.replace('_', ' ')}
                      </span>
                    </div>
                    {shipmentData.package.description && (
                      <div className="pt-2 border-t border-white/10">
                        <span className="text-gray-400 text-[10px] block mb-1">
                          Description:
                        </span>
                        <span className="text-white text-xs">
                          {shipmentData.package.description}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results Message */}
        {!showResult && !isSearching && searchId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 font-bold uppercase tracking-widest">
              No Results Found
            </p>
          </motion.div>
        )}
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
const StatusPill = ({ icon, label, value, color = 'text-white' }) => (
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
