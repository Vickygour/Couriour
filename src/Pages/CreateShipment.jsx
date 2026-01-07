import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Payment from "../assets/Payment.jpeg";

import {
  Package,
  MapPin,
  Send,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Truck,
  Plane,
  Weight,
  Ship,
  IndianRupee,
  ShieldCheck,
  Loader2,
  Smartphone,
  Download,
  Copy,
} from "lucide-react";

const CreateShipment = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [qrScanned, setQrScanned] = useState(false);
  const [trackingId, setTrackingId] = useState(""); // Naya State Tracking ID ke liye

  const [formData, setFormData] = useState({
    sender: "",
    originPincode: "",
    originAddress: "",
    receiver: "",
    destPincode: "",
    destAddress: "",
    weight: 1,
    method: "road",
    category: "Standard",
  });

  const [pricing, setPricing] = useState({ subtotal: 0, tax: 0, total: 0 });

  useEffect(() => {
    let basePrice =
      formData.method === "air" ? 250 : formData.method === "ocean" ? 150 : 80;
    let weightPrice = formData.weight * basePrice;
    let tax = weightPrice * 0.18;
    setPricing({
      subtotal: weightPrice,
      tax: tax,
      total: weightPrice + tax + 20,
    });
  }, [formData]);

  // Delivery Code Generator Logic
  const generateTrackingId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "LM-"; // LocalMate Prefix
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    code += "-IN"; // India Suffix
    setTrackingId(code);
    return code;
  };

  const validateStep = () => {
    if (step === 1) {
      if (
        !formData.sender ||
        !formData.originPincode ||
        !formData.originAddress
      ) {
        toast.error("Please fill all Origin details!");
        return false;
      }
    } else if (step === 2) {
      if (
        !formData.receiver ||
        !formData.destPincode ||
        !formData.destAddress
      ) {
        toast.error("Please fill all Destination details!");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    if (step === 5) {
      if (!qrScanned) {
        toast.warn("Please verify payment by clicking/scanning QR!");
        return;
      }
      handleFakePayment();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleFakePayment = () => {
    setLoading(true);
    const finalCode = generateTrackingId(); // Payment ke baad code generate hoga
    setTimeout(() => {
      setLoading(false);
      setStep(6);
      toast.success(`Payment Verified! Tracking ID: ${finalCode}`);
    }, 3000);
  };

  const downloadInvoice = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.setTextColor(220, 38, 38);
      doc.text("LOCAL MATE LOGISTICS", 14, 20);

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Tracking ID: ${trackingId}`, 14, 28);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 33);

      autoTable(doc, {
        startY: 40,
        head: [["Shipment Detail", "Information"]],
        body: [
          ["Sender", formData.sender.toUpperCase()],
          ["Origin", `${formData.originAddress} (${formData.originPincode})`],
          ["Receiver", formData.receiver.toUpperCase()],
          ["Destination", `${formData.destAddress} (${formData.destPincode})`],
          ["Tracking Code", trackingId],
          ["Method", formData.method.toUpperCase()],
          ["Total Paid", `INR ${pricing.total.toFixed(2)}`],
        ],
        headStyles: { fillColor: [220, 38, 38] },
      });
      doc.save(`LocalMate_Invoice_${trackingId}.pdf`);
    } catch (e) {
      toast.error("PDF generation failed.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingId);
    toast.info("Tracking ID Copied!");
  };

  const steps = [
    { id: 1, name: "Origin", icon: <MapPin size={18} /> },
    { id: 2, name: "Destination", icon: <NavigationIcon size={18} /> },
    { id: 3, name: "Package", icon: <Package size={18} /> },
    { id: 4, name: "Method", icon: <Send size={18} /> },
    { id: 5, name: "Payment", icon: <CreditCard size={18} /> },
  ];

  return (
    <section className="min-h-screen bg-[#010409] pt-32 pb-20 px-6 font-sans relative">
      <ToastContainer theme="dark" position="top-right" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        <div className="lg:col-span-4 space-y-10">
          <div>
            <h2 className="text-white text-5xl font-black italic uppercase tracking-tighter leading-tight">
              Shipment <br /> <span className="text-red-600">Console.</span>
            </h2>
          </div>
          <div className="space-y-6">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`flex items-center gap-5 transition-all ${
                  step >= s.id ? "opacity-100" : "opacity-20"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 ${
                    step >= s.id
                      ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20"
                      : "border-white/10 text-white"
                  }`}
                >
                  {step > s.id ? <CheckCircle size={20} /> : s.icon}
                </div>
                <div>
                  <p className="text-white font-black italic uppercase text-sm">
                    {s.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 lg:p-16 backdrop-blur-3xl shadow-2xl relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* PHASES 1 to 5 (Keeping existing logic for brevity, just update Step 6) */}
              {step === 1 && (
                <div className="space-y-6">
                  <Header title="Origin Setup" sub="Pickup Details" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomInput
                      label="SENDER NAME"
                      placeholder="Required"
                      value={formData.sender}
                      onChange={(v) => setFormData({ ...formData, sender: v })}
                    />
                    <CustomInput
                      label="PINCODE"
                      placeholder="6 Digits"
                      value={formData.originPincode}
                      onChange={(v) =>
                        setFormData({ ...formData, originPincode: v })
                      }
                    />
                  </div>
                  <CustomTextarea
                    label="PICKUP ADDRESS"
                    placeholder="Full Details"
                    value={formData.originAddress}
                    onChange={(v) =>
                      setFormData({ ...formData, originAddress: v })
                    }
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <Header title="Destination" sub="Drop-off Details" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomInput
                      label="RECEIVER NAME"
                      placeholder="Required"
                      value={formData.receiver}
                      onChange={(v) =>
                        setFormData({ ...formData, receiver: v })
                      }
                    />
                    <CustomInput
                      label="PINCODE"
                      placeholder="6 Digits"
                      value={formData.destPincode}
                      onChange={(v) =>
                        setFormData({ ...formData, destPincode: v })
                      }
                    />
                  </div>
                  <CustomTextarea
                    label="DELIVERY ADDRESS"
                    placeholder="Full Details"
                    value={formData.destAddress}
                    onChange={(v) =>
                      setFormData({ ...formData, destAddress: v })
                    }
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <Header title="Cargo Specs" sub="Weight Calculator" />
                  <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                    <Weight className="text-red-600 mb-4" size={32} />
                    <label className="text-white font-black text-xs block mb-4 uppercase tracking-widest">
                      Weight: {formData.weight} KG
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={formData.weight}
                      onChange={(e) =>
                        setFormData({ ...formData, weight: e.target.value })
                      }
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-red-600"
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <Header title="Transit Mode" sub="Select Channel" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <MethodCard
                      id="road"
                      name="Surface"
                      icon={<Truck />}
                      active={formData.method}
                      onClick={(id) => setFormData({ ...formData, method: id })}
                    />
                    <MethodCard
                      id="air"
                      name="Express Air"
                      icon={<Plane />}
                      active={formData.method}
                      onClick={(id) => setFormData({ ...formData, method: id })}
                    />
                    <MethodCard
                      id="ocean"
                      name="Cargo Ship"
                      icon={<Ship />}
                      active={formData.method}
                      onClick={(id) => setFormData({ ...formData, method: id })}
                    />
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <Header title="Payment" sub="Click QR to verify" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div
                      onClick={() => setQrScanned(true)}
                      className={`p-6 rounded-[2rem] border-2 transition-all cursor-pointer ${
                        qrScanned
                          ? "border-green-500 bg-green-500/10"
                          : "border-red-600/50 bg-white/5"
                      }`}
                    >
                      <p className="text-center text-[10px] font-black text-white mb-4 uppercase tracking-widest">
                        {qrScanned ? "✓ SCAN VERIFIED" : "CLICK TO SCAN"}
                      </p>
                      <img
                        src={Payment}
                        alt="QR"
                        className="w-32 h-32 mx-auto rounded-lg"
                      />
                    </div>
                    <div className="bg-red-600/5 p-6 rounded-2xl border border-red-600/20">
                      <p className="text-[10px] text-gray-500 font-bold uppercase">
                        Payable Total
                      </p>
                      <p className="text-2xl text-white font-black italic flex items-center gap-1">
                        <IndianRupee size={20} />
                        {pricing.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Step (Updated with Delivery Code Showcasing) */}
              {step === 6 && (
                <div className="text-center py-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-500 mx-auto mb-6 flex justify-center"
                  >
                    <CheckCircle size={80} />
                  </motion.div>
                  <h3 className="text-white text-4xl font-black italic uppercase mb-2">
                    Dispatch Confirmed
                  </h3>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-8">
                    Your asset is being synchronized for transit
                  </p>

                  {/* Delivery Code Display Box */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10 inline-flex flex-col items-center gap-3">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">
                      Official Dispatch Code
                    </p>
                    <div className="flex items-center gap-4 bg-[#010409] px-6 py-3 rounded-xl border border-red-600/30">
                      <span className="text-xl font-black text-white tracking-widest">
                        {trackingId}
                      </span>
                      <Copy
                        onClick={copyToClipboard}
                        size={18}
                        className="text-red-600 cursor-pointer hover:scale-110 transition-all"
                      />
                    </div>
                    <p className="text-[8px] text-red-500 font-bold italic">
                      Save this code for real-time telemetry tracking
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={downloadInvoice}
                      className="bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase italic text-xs flex items-center justify-center gap-3 shadow-xl hover:bg-white hover:text-black transition-all"
                    >
                      <Download size={16} /> Get Invoice PDF
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="text-white/40 font-black uppercase text-[10px] tracking-widest hover:text-white px-10"
                    >
                      New Dispatch
                    </button>
                  </div>
                </div>
              )}

              {step < 6 && (
                <div className="pt-10 flex items-center justify-between border-t border-white/5">
                  {step > 1 && (
                    <button
                      onClick={prevStep}
                      className="text-white/30 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:text-white transition-all"
                    >
                      <ArrowLeft size={14} /> Back Phase
                    </button>
                  )}
                  <button
                    onClick={nextStep}
                    disabled={loading}
                    className="bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase italic text-[10px] ml-auto flex items-center gap-3 shadow-lg"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        {step === 5 ? "AUTHORIZE & PAY" : "NEXT PHASE"}{" "}
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// ... Helper Components (CustomInput, CustomTextarea, MethodCard, Header, etc.) remain the same

const Header = ({ title, sub }) => (
  <div className="border-l-4 border-red-600 pl-6 text-left">
    <h3 className="text-white text-3xl font-black italic uppercase tracking-tighter">
      {title}
    </h3>
    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">
      {sub}
    </p>
  </div>
);

const CustomInput = ({ label, placeholder, value, onChange }) => (
  <div className="space-y-2 text-left">
    <label className="text-[9px] text-gray-400 font-black uppercase tracking-widest ml-1">
      {label}
    </label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      placeholder={placeholder}
      className="w-full bg-white/5 border-b border-white/10 p-4 text-white outline-none focus:border-red-600 transition-all font-bold text-xs"
    />
  </div>
);

const CustomTextarea = ({ label, placeholder, value, onChange }) => (
  <div className="space-y-2 text-left">
    <label className="text-[9px] text-gray-400 font-black uppercase tracking-widest ml-1">
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 border-b border-white/10 p-4 text-white h-24 outline-none focus:border-red-600 font-bold text-xs resize-none"
    />
  </div>
);

const MethodCard = ({ id, name, icon, active, onClick }) => (
  <div
    onClick={() => onClick(id)}
    className={`p-6 rounded-3xl border-2 cursor-pointer transition-all text-center flex flex-col items-center gap-3 ${
      active === id
        ? "bg-red-600 border-red-600 shadow-xl"
        : "bg-white/5 border-white/10 opacity-50"
    }`}
  >
    <div className={active === id ? "text-white" : "text-red-600"}>{icon}</div>
    <span className="text-white font-black italic uppercase text-[10px] tracking-widest">
      {name}
    </span>
  </div>
);

const NavigationIcon = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
  </svg>
);

export default CreateShipment;
