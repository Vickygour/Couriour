import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../utils/api";
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
  Loader2,
  Download,
  Copy,
} from "lucide-react";

const CreateShipment = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [shipmentData, setShipmentData] = useState(null);
  const [trackingCode, setTrackingCode] = useState("");
  const [paymentQR, setPaymentQR] = useState("");

  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    senderEmail: "",
    originPincode: "",
    originAddress: "",
    originCity: "",
    originState: "",
    receiverName: "",
    receiverPhone: "",
    receiverEmail: "",
    destPincode: "",
    destAddress: "",
    destCity: "",
    destState: "",
    weight: 1,
    packageDescription: "",
    packageValue: 0,
    fragile: false,
    method: "surface",
  });

  // 1. Pehle state ko replace karein (agar same hai toh rehne dein)
  const [pricing, setPricing] = useState({
    weightCharges: 0,
    distanceCharges: 0,
    tax: 0,
    total: 0,
  });

  // 2. Is naye useEffect ko replace karein
  useEffect(() => {
    const calculateEstimate = () => {
      // --- WEIGHT CALCULATION ---
      // Agar weight 10 se kam hai toh fix 30 rupee, aur badhne par per kg 5 rupee
      let weightPrice = 30;
      if (formData.weight > 10) {
        weightPrice = 30 + (formData.weight - 10) * 5;
      }

      // --- DISTANCE CALCULATION ---
      // Pincode difference se ek dummy distance nikal rahe hain (₹20 per KM)
      const p1 = parseInt(formData.originPincode) || 0;
      const p2 = parseInt(formData.destPincode) || 0;

      // Agar pincode nahi dala toh default distance 10km maan rahe hain
      const estimatedDistance = Math.abs(p1 - p2) % 500 || 10;
      const distancePrice = estimatedDistance * 20;

      // --- METHOD MULTIPLIER ---
      const methodMultiplier = {
        surface: 1,
        express_air: 2, // Express ke liye rates double
        cargo_ship: 1.5,
      };

      const subtotal =
        (weightPrice + distancePrice) *
        (methodMultiplier[formData.method] || 1);
      const tax = subtotal * 0.18; // 18% GST

      setPricing({
        weightCharges: weightPrice,
        distanceCharges: distancePrice,
        tax: tax,
        total: subtotal + tax,
      });
    };

    calculateEstimate();
    // In dependencies ka matlab hai ki jab bhi inme badlav hoga, price update ho jayega
  }, [
    formData.weight,
    formData.method,
    formData.originPincode,
    formData.destPincode,
  ]);

  const validateStep = () => {
    if (step === 1) {
      if (
        !formData.senderName ||
        !formData.senderPhone ||
        !formData.originPincode ||
        !formData.originAddress
      ) {
        toast.error("Please fill all Origin details!");
        return false;
      }
      if (formData.originPincode.length !== 6) {
        toast.error("Please enter valid 6-digit pincode!");
        return false;
      }
      if (formData.senderPhone.length !== 10) {
        toast.error("Please enter valid 10-digit phone number!");
        return false;
      }
    } else if (step === 2) {
      if (
        !formData.receiverName ||
        !formData.receiverPhone ||
        !formData.destPincode ||
        !formData.destAddress
      ) {
        toast.error("Please fill all Destination details!");
        return false;
      }
      if (formData.destPincode.length !== 6) {
        toast.error("Please enter valid 6-digit pincode!");
        return false;
      }
      if (formData.receiverPhone.length !== 10) {
        toast.error("Please enter valid 10-digit phone number!");
        return false;
      }
    } else if (step === 3) {
      if (formData.weight < 0.1 || formData.weight > 100) {
        toast.error("Weight must be between 0.1 and 100 KG!");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    if (step === 4) createShipment();
    else if (step === 5) verifyPayment();
    else setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const createShipment = async () => {
    setLoading(true);
    try {
      const payload = {
        sender: {
          name: formData.senderName,
          phone: formData.senderPhone,
          email: formData.senderEmail || undefined,
          address: {
            street: formData.originAddress,
            city: formData.originCity,
            state: formData.originState,
            pincode: formData.originPincode,
          },
        },
        receiver: {
          name: formData.receiverName,
          phone: formData.receiverPhone,
          email: formData.receiverEmail || undefined,
          address: {
            street: formData.destAddress,
            city: formData.destCity,
            state: formData.destState,
            pincode: formData.destPincode,
          },
        },
        package: {
          weight: parseFloat(formData.weight),
          description: formData.packageDescription || "General Cargo",
          value: parseFloat(formData.packageValue) || 0,
          fragile: formData.fragile,
        },
        deliveryMethod: formData.method,
      };

      const response = await API.post("/shipment/create", payload);
      if (response.data.success) {
        const { trackingCode, shipment, qrCode } = response.data.data;
        setTrackingCode(trackingCode);
        setShipmentData(shipment);
        setPaymentQR(qrCode || Payment);
        setPricing(shipment.pricing);
        toast.success("Shipment created successfully!");
        setStep(5);
      } else {
        toast.error(response.data.message || "Failed to create shipment");
      }
    } catch (error) {
      console.error("Create Shipment Error:", error);
      const demoTrackingCode = `LM-${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}-IN`;
      setTrackingCode(demoTrackingCode);
      setShipmentData({
        pricing: pricing,
        sender: formData.senderName,
        receiver: formData.receiverName,
      });
      setPaymentQR(Payment);
      toast.success("Shipment created! (Demo Mode)");
      setStep(5);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async () => {
    setLoading(true);
    try {
      const fakeTransactionId = `TXN${Date.now()}${Math.floor(
        Math.random() * 1000
      )}`;
      const response = await API.post(
        `/shipment/${trackingCode}/verify-payment`,
        {
          transactionId: fakeTransactionId,
          paymentMethod: "upi",
        }
      );
      if (response.data.success) {
        toast.success("Payment verified successfully! 🎉");
        setStep(6);
      } else {
        toast.error(response.data.message || "Payment verification failed");
      }
    } catch (error) {
      console.error("Payment Verification Error:", error);
      toast.success("Payment completed! (Demo Mode) 💳");
      setStep(6);
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = () => {
    if (!trackingCode) {
      toast.error("No shipment data available!");
      return;
    }
    try {
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.setTextColor(220, 38, 38);
      doc.text("LOCAL MATE LOGISTICS", 14, 20);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Tracking ID: ${trackingCode}`, 14, 28);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 33);
      doc.text(`Invoice #: INV-${trackingCode}`, 14, 38);

      autoTable(doc, {
        startY: 45,
        head: [["Shipment Detail", "Information"]],
        body: [
          ["Sender", formData.senderName.toUpperCase()],
          ["Sender Phone", formData.senderPhone],
          [
            "Origin",
            `${formData.originAddress}, ${formData.originCity} - ${formData.originPincode}`,
          ],
          ["Receiver", formData.receiverName.toUpperCase()],
          ["Receiver Phone", formData.receiverPhone],
          [
            "Destination",
            `${formData.destAddress}, ${formData.destCity} - ${formData.destPincode}`,
          ],
          ["Package Weight", `${formData.weight} KG`],
          ["Delivery Method", formData.method.toUpperCase().replace("_", " ")],
          ["Tracking Code", trackingCode],
        ],
        headStyles: { fillColor: [220, 38, 38] },
        theme: "striped",
      });

      const startY = doc.lastAutoTable.finalY + 10;
      autoTable(doc, {
        startY,
        head: [["Description", "Amount (INR)"]],
        body: [
          ["Base Price", `₹${pricing.basePrice.toFixed(2)}`],
          ["Weight Charges", `₹${pricing.weightCharges.toFixed(2)}`],
          ["Distance Charges", `₹${pricing.distanceCharges.toFixed(2)}`],
          ["Tax (18% GST)", `₹${pricing.tax.toFixed(2)}`],
          ["Total Amount", `₹${pricing.total.toFixed(2)}`],
        ],
        headStyles: { fillColor: [220, 38, 38] },
        theme: "grid",
      });
      doc.save(`LocalMate_Invoice_${trackingCode}.pdf`);
      toast.success("Invoice downloaded!");
    } catch (e) {
      toast.error("PDF generation failed.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingCode);
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
    <section className="min-h-screen bg-slate-100 pt-32 pb-20 px-6 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-red-600/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-slate-400/10 blur-[120px] rounded-full" />
      </div>

      <ToastContainer theme="light" position="top-right" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-10">
          <div>
            <p className="text-red-600 text-[10px] uppercase tracking-[0.4em] font-black mb-2">
              Network Topology
            </p>
            <h2 className="text-slate-900 text-5xl font-black   uppercase tracking-tighter leading-tight">
              Shipment <br /> <span className="text-slate-400">Console.</span>
            </h2>
          </div>
          <div className="space-y-4">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`flex items-center gap-5 transition-all p-3 rounded-2xl ${
                  step >= s.id
                    ? "bg-white/70 border border-slate-200 shadow-sm"
                    : "opacity-30"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 ${
                    step > s.id
                      ? "bg-green-500 border-green-500 text-white"
                      : step === s.id
                      ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20"
                      : "border-slate-300 text-slate-400"
                  }`}
                >
                  {step > s.id ? <CheckCircle size={20} /> : s.icon}
                </div>
                <div>
                  <p className="text-slate-900 font-black   uppercase text-sm">
                    {s.name}
                  </p>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">
                    Phase 0{s.id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Console */}
        <div className="lg:col-span-8 bg-white/70 border border-slate-200 rounded-[3rem] p-8 lg:p-14 backdrop-blur shadow-xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Step Renderers */}
              {step === 1 && (
                <div className="space-y-6">
                  <Header title="Origin Setup" sub="Pickup Location Data" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomInput
                      label="SENDER NAME"
                      placeholder="Full Name"
                      value={formData.senderName}
                      onChange={(v) =>
                        setFormData({ ...formData, senderName: v })
                      }
                      required
                    />
                    <CustomInput
                      label="PHONE NUMBER"
                      placeholder="10 Digits"
                      type="tel"
                      maxLength={10}
                      value={formData.senderPhone}
                      onChange={(v) =>
                        setFormData({ ...formData, senderPhone: v })
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomInput
                      label="EMAIL (Optional)"
                      placeholder="sender@example.com"
                      type="email"
                      value={formData.senderEmail}
                      onChange={(v) =>
                        setFormData({ ...formData, senderEmail: v })
                      }
                    />
                    <CustomInput
                      label="PINCODE"
                      placeholder="6 Digits"
                      type="number"
                      value={formData.originPincode}
                      onChange={(v) =>
                        setFormData({ ...formData, originPincode: v })
                      }
                      required
                    />
                  </div>
                  <CustomTextarea
                    label="PICKUP ADDRESS"
                    placeholder="Full Address Details..."
                    value={formData.originAddress}
                    onChange={(v) =>
                      setFormData({ ...formData, originAddress: v })
                    }
                    required
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <Header title="Destination" sub="Drop-off Target Node" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomInput
                      label="RECEIVER NAME"
                      placeholder="Full Name"
                      value={formData.receiverName}
                      onChange={(v) =>
                        setFormData({ ...formData, receiverName: v })
                      }
                      required
                    />
                    <CustomInput
                      label="PHONE NUMBER"
                      placeholder="10 Digits"
                      type="tel"
                      maxLength={10}
                      value={formData.receiverPhone}
                      onChange={(v) =>
                        setFormData({ ...formData, receiverPhone: v })
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomInput
                      label="PINCODE"
                      placeholder="6 Digits"
                      type="number"
                      value={formData.destPincode}
                      onChange={(v) =>
                        setFormData({ ...formData, destPincode: v })
                      }
                      required
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <CustomInput
                        label="CITY"
                        value={formData.destCity}
                        onChange={(v) =>
                          setFormData({ ...formData, destCity: v })
                        }
                      />
                      <CustomInput
                        label="STATE"
                        value={formData.destState}
                        onChange={(v) =>
                          setFormData({ ...formData, destState: v })
                        }
                      />
                    </div>
                  </div>
                  <CustomTextarea
                    label="DELIVERY ADDRESS"
                    placeholder="House No, Street, Area..."
                    value={formData.destAddress}
                    onChange={(v) =>
                      setFormData({ ...formData, destAddress: v })
                    }
                    required
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <Header title="Cargo Specs" sub="Technical Package Data" />
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                    <Weight className="text-red-600 mb-4" size={32} />
                    <label className="text-slate-900 font-black text-xs block mb-4 uppercase tracking-widest">
                      Weight Matrix: {formData.weight} KG
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="100"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          weight: parseFloat(e.target.value),
                        })
                      }
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomInput
                      label="DESCRIPTION"
                      placeholder="e.g., Electronics"
                      value={formData.packageDescription}
                      onChange={(v) =>
                        setFormData({ ...formData, packageDescription: v })
                      }
                    />
                    <CustomInput
                      label="DECLARED VALUE (INR)"
                      type="number"
                      value={formData.packageValue}
                      onChange={(v) =>
                        setFormData({ ...formData, packageValue: v })
                      }
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <Header title="Transit Mode" sub="Select Delivery Channel" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <MethodCard
                      id="surface"
                      name="Surface"
                      icon={<Truck size={32} />}
                      duration="5-7 Days"
                      active={formData.method}
                      onClick={(id) => setFormData({ ...formData, method: id })}
                    />
                    <MethodCard
                      id="express_air"
                      name="Express Air"
                      icon={<Plane size={32} />}
                      duration="1-2 Days"
                      active={formData.method}
                      onClick={(id) => setFormData({ ...formData, method: id })}
                    />
                    <MethodCard
                      id="cargo_ship"
                      name="Cargo Ship"
                      icon={<Ship size={32} />}
                      duration="14 Days"
                      active={formData.method}
                      onClick={(id) => setFormData({ ...formData, method: id })}
                    />
                  </div>
                  <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Send size={100} />
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-4 tracking-widest">
                      Pricing Matrix
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Base + Weight:</span>
                        <span>
                          ₹
                          {(pricing.basePrice + pricing.weightCharges).toFixed(
                            2
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Tax (18% GST):</span>
                        <span>₹{pricing.tax.toFixed(2)}</span>
                      </div>
                      <div className="h-[1px] bg-white/10 my-4"></div>
                      <div className="flex justify-between items-end">
                        <span className="text-xl font-black  ">
                          ESTIMATED TOTAL
                        </span>
                        <span className="text-4xl font-black text-red-500   flex items-center gap-1">
                          <IndianRupee size={24} />
                          {pricing.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <Header title="Security" sub="Final Payment Verification" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="p-8 rounded-[2rem] border-2 border-red-600 bg-white shadow-xl flex flex-col items-center">
                      <p className="text-[10px] font-black text-slate-400 mb-4 uppercase tracking-widest">
                        SCAN TO AUTHORIZE
                      </p>
                      <img
                        src={paymentQR || Payment}
                        alt="QR"
                        className="w-44 h-44 rounded-xl border border-slate-100"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <p className="text-[9px] text-slate-400 font-black uppercase mb-1">
                          Generated Tracking Code
                        </p>
                        <p className="text-xl font-black   text-slate-900 tracking-wider">
                          {trackingCode}
                        </p>
                      </div>
                      <div className="bg-red-600 p-6 rounded-2xl text-white">
                        <p className="text-[9px] font-black uppercase mb-1 opacity-70">
                          Payable Amount
                        </p>
                        <p className="text-3xl font-black  ">
                          ₹{pricing.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="text-center py-10">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={56} />
                  </div>
                  <h3 className="text-slate-900 text-5xl font-black   uppercase">
                    Dispatch Confirmed
                  </h3>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2 mb-10">
                    Global Node Updated Successfully
                  </p>
                  <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 mb-10 shadow-lg inline-block min-w-[320px]">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-3">
                      Unique Dispatch Key
                    </p>
                    <div className="flex items-center gap-4 bg-slate-50 px-8 py-4 rounded-xl border border-slate-200 mb-2">
                      <span className="text-2xl font-black text-slate-900 tracking-widest">
                        {trackingCode}
                      </span>
                      <Copy
                        onClick={copyToClipboard}
                        size={20}
                        className="text-red-600 cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={downloadInvoice}
                      className="bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase   text-xs flex items-center gap-3 shadow-xl hover:bg-slate-900 transition-all"
                    >
                      <Download size={16} /> Export Receipt
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="bg-white border border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-black uppercase text-xs"
                    >
                      New Request
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Bar */}
              {step < 6 && (
                <div className="pt-10 flex items-center justify-between border-t border-slate-100">
                  {step > 1 && (
                    <button
                      onClick={prevStep}
                      disabled={loading}
                      className="text-slate-400 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:text-slate-900 transition-all"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                  )}
                  <button
                    onClick={nextStep}
                    disabled={loading}
                    className="bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase   text-[10px] flex items-center gap-3 shadow-lg shadow-red-600/20 hover:scale-105 transition-all ml-auto disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <>
                        {step === 4
                          ? "GENERATE SHIPMENT"
                          : step === 5
                          ? "SYNC & VERIFY"
                          : "NEXT PHASE"}{" "}
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

// Sub-components
const Header = ({ title, sub }) => (
  <div className="border-l-4 border-red-600 pl-6 text-left">
    <h3 className="text-slate-900 text-3xl font-black   uppercase tracking-tighter">
      {title}
    </h3>
    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
      {sub}
    </p>
  </div>
);

const CustomInput = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  maxLength,
  required,
}) => (
  <div className="space-y-2 text-left">
    <label className="text-[9px] text-slate-400 font-black uppercase tracking-widest ml-1">
      {label} {required && "*"}
    </label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      placeholder={placeholder}
      maxLength={maxLength}
      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 outline-none focus:border-red-600 focus:bg-white transition-all font-bold text-xs"
    />
  </div>
);

const CustomTextarea = ({ label, placeholder, value, onChange, required }) => (
  <div className="space-y-2 text-left">
    <label className="text-[9px] text-slate-400 font-black uppercase tracking-widest ml-1">
      {label} {required && "*"}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 h-24 outline-none focus:border-red-600 focus:bg-white transition-all font-bold text-xs resize-none"
    />
  </div>
);

const MethodCard = ({ id, name, icon, duration, active, onClick }) => (
  <div
    onClick={() => onClick(id)}
    className={`p-6 rounded-3xl border-2 cursor-pointer transition-all text-center flex flex-col items-center gap-3 ${
      active === id
        ? "bg-white border-red-600 shadow-xl scale-105"
        : "bg-slate-50 border-transparent opacity-60 hover:opacity-100"
    }`}
  >
    <div className={active === id ? "text-red-600" : "text-slate-400"}>
      {icon}
    </div>
    <span className="text-slate-900 font-black   uppercase text-xs tracking-widest block">
      {name}
    </span>
    <span className="text-slate-400 text-[8px] font-bold uppercase block mt-1">
      {duration}
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
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
  </svg>
);

export default CreateShipment;
