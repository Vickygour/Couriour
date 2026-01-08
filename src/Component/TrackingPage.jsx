import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import API from '../../utils/api'; // Your API instance
import {
  Search,
  MapPin,
  Package,
  Clock,
  CheckCircle,
  Navigation,
  Truck,
  Loader2,
  X,
} from 'lucide-react';

const TrackingDashboard = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [shipmentData, setShipmentData] = useState(null);
  const [statusHistory, setStatusHistory] = useState([]);
  const [liveLocation, setLiveLocation] = useState(null);

  // Track Shipment Function
  const handleTrackShipment = async () => {
    if (!trackingCode.trim()) {
      toast.error('Please enter a tracking code!');
      return;
    }

    setLoading(true);

    try {
      const response = await API.get(`/track/${trackingCode.trim()}`);

      if (response.data.success) {
        const { shipment, statusHistory, liveLocation } = response.data.data;

        setShipmentData(shipment);
        setStatusHistory(statusHistory);
        setLiveLocation(liveLocation);

        toast.success('Shipment found successfully!');
      } else {
        toast.error(response.data.message || 'Shipment not found');
        setShipmentData(null);
      }
    } catch (error) {
      console.error('Tracking Error:', error);
      toast.error(error.response?.data?.message || 'Invalid tracking code');
      setShipmentData(null);
    } finally {
      setLoading(false);
    }
  };

  // Get current step index based on status
  const getStepIndex = (status) => {
    const statusMap = {
      pending: 0,
      confirmed: 0,
      assigned: 1,
      picked_up: 1,
      in_transit: 2,
      out_for_delivery: 3,
      delivered: 4,
    };
    return statusMap[status] || 0;
  };

  // Generate steps based on shipment data
  const getTrackingSteps = () => {
    if (!shipmentData) {
      // Default demo steps
      return [
        {
          label: 'Order Placed',
          time: 'Pending',
          done: false,
          active: false,
          icon: <Package />,
          status: 'pending',
        },
        {
          label: 'In Warehouse',
          time: 'Pending',
          done: false,
          active: false,
          icon: <MapPin />,
          status: 'picked_up',
        },
        {
          label: 'In Transit',
          time: 'Pending',
          done: false,
          active: false,
          icon: <Navigation />,
          status: 'in_transit',
        },
        {
          label: 'Out for Delivery',
          time: 'Pending',
          done: false,
          active: false,
          icon: <Truck />,
          status: 'out_for_delivery',
        },
        {
          label: 'Delivered',
          time: 'Pending',
          done: false,
          active: false,
          icon: <CheckCircle />,
          status: 'delivered',
        },
      ];
    }

    const currentStepIndex = getStepIndex(shipmentData.status);

    return [
      {
        label: 'Order Placed',
        time: shipmentData.createdAt
          ? new Date(shipmentData.createdAt).toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
            })
          : 'Pending',
        done: currentStepIndex >= 0,
        active: currentStepIndex === 0,
        icon: <Package />,
        status: 'confirmed',
      },
      {
        label: 'Picked Up',
        time: shipmentData.actualPickup
          ? new Date(shipmentData.actualPickup).toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
            })
          : shipmentData.estimatedPickup
          ? `Est: ${new Date(shipmentData.estimatedPickup).toLocaleTimeString(
              'en-IN',
              {
                hour: '2-digit',
                minute: '2-digit',
              },
            )}`
          : 'Pending',
        done: currentStepIndex >= 1,
        active: currentStepIndex === 1,
        icon: <MapPin />,
        status: 'picked_up',
      },
      {
        label: 'In Transit',
        time: shipmentData.status === 'in_transit' ? 'Live Moving' : 'Pending',
        done: currentStepIndex >= 2,
        active: currentStepIndex === 2,
        icon: (
          <Navigation
            className={currentStepIndex === 2 ? 'animate-bounce' : ''}
          />
        ),
        status: 'in_transit',
      },
      {
        label: 'Out for Delivery',
        time:
          shipmentData.status === 'out_for_delivery' ? 'On the way' : 'Pending',
        done: currentStepIndex >= 3,
        active: currentStepIndex === 3,
        icon: <Truck />,
        status: 'out_for_delivery',
      },
      {
        label: 'Delivered',
        time: shipmentData.actualDelivery
          ? new Date(shipmentData.actualDelivery).toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
            })
          : shipmentData.estimatedDelivery
          ? `Est: ${new Date(shipmentData.estimatedDelivery).toLocaleDateString(
              'en-IN',
              {
                day: '2-digit',
                month: 'short',
              },
            )}`
          : 'Pending',
        done: currentStepIndex >= 4,
        active: currentStepIndex === 4,
        icon: <CheckCircle />,
        status: 'delivered',
      },
    ];
  };

  const steps = getTrackingSteps();
  const currentStepIndex = shipmentData
    ? getStepIndex(shipmentData.status)
    : -1;
  const progressPercentage = shipmentData
    ? ((currentStepIndex + 1) / steps.length) * 100
    : 0;

  // Reset tracking
  const handleReset = () => {
    setTrackingCode('');
    setShipmentData(null);
    setStatusHistory([]);
    setLiveLocation(null);
  };

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

              {/* Live Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </span>
                <span className="text-red-600 text-[10px] font-black uppercase tracking-widest">
                  System Online
                </span>
              </div>

              <h3 className="text-3xl font-black text-white italic uppercase mb-6 tracking-tighter">
                Real-Time <span className="text-red-600">Tracking</span>
              </h3>
              <p className="text-gray-400 text-sm mb-8 italic">
                Track your shipment instantly with real-time delivery updates.
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tracking ID: LM-XXXXXX-IN"
                    value={trackingCode}
                    onChange={(e) =>
                      setTrackingCode(e.target.value.toUpperCase())
                    }
                    onKeyPress={(e) =>
                      e.key === 'Enter' && handleTrackShipment()
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-white/30 focus:border-red-600 outline-none transition-all italic font-bold uppercase"
                    disabled={loading}
                  />
                  {trackingCode && !loading && (
                    <button
                      onClick={handleReset}
                      className="absolute right-16 top-5 text-gray-400 hover:text-white transition-all"
                    >
                      <X size={20} />
                    </button>
                  )}
                  <Search className="absolute right-6 top-5 text-red-600" />
                </div>

                <button
                  onClick={handleTrackShipment}
                  disabled={loading || !trackingCode}
                  className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase italic tracking-widest hover:bg-white hover:text-[#0a1d37] transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Tracking...
                    </>
                  ) : (
                    <>
                      <Navigation size={18} className="animate-pulse" />
                      Track Parcel Now
                    </>
                  )}
                </button>
              </div>

              {/* Shipment Details */}
              {shipmentData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 pt-8 border-t border-white/10 space-y-4"
                >
                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                      From
                    </p>
                    <p className="text-white font-bold">
                      {shipmentData.sender.name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {shipmentData.sender.address.city},{' '}
                      {shipmentData.sender.address.pincode}
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                      To
                    </p>
                    <p className="text-white font-bold">
                      {shipmentData.receiver.name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {shipmentData.receiver.address.city},{' '}
                      {shipmentData.receiver.address.pincode}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 p-3 rounded-xl">
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">
                        Weight
                      </p>
                      <p className="text-white font-bold text-sm">
                        {shipmentData.package.weight} KG
                      </p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl">
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">
                        Method
                      </p>
                      <p className="text-white font-bold text-sm uppercase">
                        {shipmentData.deliveryMethod.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right: Visual Status Steps */}
          <div className="lg:col-span-7 pt-10 relative">
            {/* Progress Line */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full h-[2px] bg-slate-200 hidden md:block -z-0">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="h-full bg-red-600 shadow-[0_0_10px_#dc2626]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-6 rounded-3xl border-2 transition-all relative overflow-hidden ${
                    step.active
                      ? 'border-red-600 bg-white shadow-2xl scale-105 z-20'
                      : step.done
                      ? 'border-slate-300 bg-white shadow-md'
                      : 'border-slate-100 bg-slate-50 opacity-60'
                  }`}
                >
                  {step.active && (
                    <div className="absolute top-0 right-0 p-2">
                      <span className="flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-2xl ${
                        step.done
                          ? 'bg-red-50 text-red-600'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <h4
                        className={`font-black italic uppercase text-sm ${
                          step.active ? 'text-red-600' : 'text-slate-900'
                        }`}
                      >
                        {step.label}
                      </h4>
                      <p
                        className={`text-[10px] font-bold uppercase tracking-widest ${
                          step.active
                            ? 'text-red-500 animate-pulse'
                            : 'text-slate-400'
                        }`}
                      >
                        {step.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Live Delivery Map */}
            <div className="mt-8 rounded-[2.5rem] overflow-hidden h-64 relative group border-4 border-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000"
                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                alt="map"
              />

              {/* Radar Effect */}
              {shipmentData &&
                ['in_transit', 'out_for_delivery'].includes(
                  shipmentData.status,
                ) && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-red-500/20 rounded-full animate-[ping_3s_linear_infinite]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-red-500/30 rounded-full animate-[ping_4s_linear_infinite]"></div>
                  </div>
                )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d37] via-transparent to-transparent opacity-60"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                {liveLocation ? (
                  <div className="bg-[#0a1d37]/90 backdrop-blur-md px-8 py-4 rounded-2xl font-black italic text-white flex flex-col items-center gap-1 shadow-2xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_#dc2626]"></span>
                      <span className="tracking-[0.2em] text-sm uppercase">
                        GPS: Active
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 not-italic font-medium">
                      Last updated:{' '}
                      {new Date(liveLocation.lastUpdated).toLocaleTimeString()}
                    </span>
                  </div>
                ) : shipmentData ? (
                  <div className="bg-[#0a1d37]/90 backdrop-blur-md px-8 py-4 rounded-2xl font-black italic text-white flex flex-col items-center gap-1 shadow-2xl border border-white/10">
                    <span className="tracking-[0.2em] text-sm uppercase">
                      {shipmentData.status === 'delivered'
                        ? '✓ Delivered'
                        : 'Tracking Standby'}
                    </span>
                    <span className="text-[10px] text-gray-400 not-italic font-medium">
                      Status:{' '}
                      {shipmentData.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                ) : (
                  <div className="bg-[#0a1d37]/90 backdrop-blur-md px-8 py-4 rounded-2xl font-black italic text-white flex flex-col items-center gap-1 shadow-2xl border border-white/10">
                    <span className="tracking-[0.2em] text-sm uppercase">
                      Enter Tracking ID
                    </span>
                    <span className="text-[10px] text-gray-400 not-italic font-medium">
                      To view live location
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Status History */}
            {statusHistory.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-white p-6 rounded-3xl shadow-lg"
              >
                <h4 className="font-black italic uppercase text-slate-900 mb-4 flex items-center gap-2">
                  <Clock size={20} className="text-red-600" />
                  Status History
                </h4>
                <div className="space-y-3">
                  {statusHistory.map((history, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0"
                    >
                      <div className="w-2 h-2 rounded-full bg-red-600 mt-2"></div>
                      <div className="flex-1">
                        <p className="font-bold text-sm uppercase text-slate-900">
                          {history.status.replace('_', ' ')}
                        </p>
                        {history.remarks && (
                          <p className="text-xs text-slate-600">
                            {history.remarks}
                          </p>
                        )}
                        <p className="text-[10px] text-slate-400 mt-1">
                          {new Date(history.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackingDashboard;
