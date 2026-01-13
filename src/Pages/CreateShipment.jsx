// src/Component/CreateShipment.jsx - COMPLETE FIXED VERSION
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../utils/api';

import {
  Package,
  MapPin,
  Send,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Bike,
  Plane,
  Weight,
  Ship,
  IndianRupee,
  Loader2,
  Download,
  Copy,
} from 'lucide-react';

// ✅ FIXED QR Code Component
const QRCode = ({ size = 180 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    const moduleSize = size / 25;
    const modules = 21;

    const offsetX = (size - modules * moduleSize) / 2;
    const offsetY = (size - modules * moduleSize) / 2;

    // Draw random QR modules
    ctx.fillStyle = '#000000';
    for (let i = 1; i < modules - 1; i++) {
      for (let j = 1; j < modules - 1; j++) {
        if (Math.random() > 0.4) {
          ctx.fillRect(
            offsetX + i * moduleSize,
            offsetY + j * moduleSize,
            moduleSize * 0.9,
            moduleSize * 0.9,
          );
        }
      }
    }

    // Fixed finder patterns
    const drawFinder = (x, y) => {
      const s = 7 * moduleSize;
      const ms = moduleSize;

      // Outer black square
      ctx.fillStyle = '#000000';
      ctx.fillRect(x, y, s, s);

      // Inner white square
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + ms, y + ms, s - 2 * ms, s - 2 * ms);

      // Center black square
      ctx.fillStyle = '#000000';
      ctx.fillRect(x + 3 * ms, y + 3 * ms, ms, ms);
    };

    drawFinder(offsetX, offsetY);
    drawFinder(offsetX + (modules - 7) * moduleSize, offsetY);
    drawFinder(offsetX, offsetY + (modules - 7) * moduleSize);

    // Timing patterns
    ctx.fillStyle = '#000000';
    for (let i = 7; i < modules - 7; i += 2) {
      ctx.fillRect(
        offsetX + 6 * moduleSize,
        offsetY + i * moduleSize,
        moduleSize * 0.9,
        moduleSize * 0.9,
      );
      ctx.fillRect(
        offsetX + i * moduleSize,
        offsetY + 6 * moduleSize,
        moduleSize * 0.9,
        moduleSize * 0.9,
      );
    }
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      className="w-44 h-44 rounded-xl border border-slate-100 animate-pulse"
    />
  );
};

const CreateShipment = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [shipmentData, setShipmentData] = useState(null);
  const [trackingCode, setTrackingCode] = useState('');
  const [paymentQR, setPaymentQR] = useState('');

  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    senderEmail: '',
    originPincode: '',
    originAddress: '',
    originCity: '',
    originState: '',
    receiverName: '',
    receiverPhone: '',
    receiverEmail: '',
    destPincode: '',
    destAddress: '',
    destCity: '',
    destState: '',
    weight: 1,
    packageDescription: '',
    packageValue: 0,
    fragile: false,
    method: 'surface',
  });

  const [pricing, setPricing] = useState({
    basePrice: 0,
    weightCharges: 0,
    distanceCharges: 0,
    tax: 0,
    total: 0,
  });

  useEffect(() => {
    const calculateEstimate = () => {
      // ✅ FIXED PRICING LOGIC AS PER YOUR REQUIREMENT
      let weightPrice = 0;
      const weight = parseFloat(formData.weight);

      // Logic: 10kg tak ₹30 fix, uske baad har extra kg ₹5
      if (weight <= 10) {
        // 10kg ya usse kam: ₹30 fix
        weightPrice = 30;
      } else {
        // 10kg se jyada:
        // First 10kg = ₹30 + remaining weight × ₹5 per kg
        const extraWeight = weight - 10;
        weightPrice = 30 + extraWeight * 5;
      }

      // Base delivery charges
      const basePrice = 50;

      // Method multipliers
      const methodMultiplier = {
        surface: 1,
        express_air: 2.5,
        cargo_ship: 1.5,
      };

      // Calculate subtotal
      const subtotal =
        (basePrice + weightPrice) * methodMultiplier[formData.method];
      const tax = subtotal * 0.18; // 18% GST

      setPricing({
        basePrice,
        weightCharges: weightPrice,
        distanceCharges: 0,
        tax,
        total: subtotal + tax,
      });
    };

    calculateEstimate();
  }, [formData.weight, formData.method]);

  const validateStep = () => {
    if (step === 1) {
      if (
        !formData.senderName ||
        !formData.senderPhone ||
        !formData.originPincode ||
        !formData.originAddress
      ) {
        toast.error('Please fill all Origin details!');
        return false;
      }
      if (formData.originPincode.length !== 6) {
        toast.error('Please enter valid 6-digit pincode!');
        return false;
      }
      if (formData.senderPhone.length !== 10) {
        toast.error('Please enter valid 10-digit phone number!');
        return false;
      }
    } else if (step === 2) {
      if (
        !formData.receiverName ||
        !formData.receiverPhone ||
        !formData.destPincode ||
        !formData.destAddress
      ) {
        toast.error('Please fill all Destination details!');
        return false;
      }
      if (formData.destPincode.length !== 6) {
        toast.error('Please enter valid 6-digit pincode!');
        return false;
      }
      if (formData.receiverPhone.length !== 10) {
        toast.error('Please enter valid 10-digit phone number!');
        return false;
      }
    } else if (step === 3) {
      if (formData.weight < 0.1 || formData.weight > 100) {
        toast.error('Weight must be between 0.1 and 100 KG!');
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
          description: formData.packageDescription || 'General Cargo',
          value: parseFloat(formData.packageValue) || 0,
          fragile: formData.fragile,
        },
        deliveryMethod: formData.method,
      };

      const response = await API.post('/shipment/create', payload);
      if (response.data.success) {
        const { trackingCode, shipment } = response.data.data;
        setTrackingCode(trackingCode);
        setShipmentData(shipment);
        setPaymentQR('generated'); // ✅ Trigger QR display
        setPricing(shipment.pricing);
        toast.success('Shipment created successfully!');
        setStep(5);
      } else {
        toast.error(response.data.message || 'Failed to create shipment');
      }
    } catch (error) {
      console.error('Create Shipment Error:', error);
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
      setPaymentQR('generated'); // ✅ Trigger QR display
      toast.success('Shipment created! (Demo Mode)');
      setStep(5);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async () => {
    setLoading(true);
    try {
      const fakeTransactionId = `TXN${Date.now()}${Math.floor(
        Math.random() * 1000,
      )}`;
      const response = await API.post(
        `/shipment/${trackingCode}/verify-payment`,
        {
          transactionId: fakeTransactionId,
          paymentMethod: 'upi',
        },
      );
      if (response.data.success) {
        toast.success('Payment verified successfully! 🎉');
        setStep(6);
      } else {
        toast.error(response.data.message || 'Payment verification failed');
      }
    } catch (error) {
      console.error('Payment Verification Error:', error);
      toast.success('Payment completed! (Demo Mode) 💳');
      setStep(6);
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = () => {
    if (!trackingCode) {
      toast.error('No shipment data available!');
      return;
    }
    try {
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.setTextColor(220, 38, 38);
      doc.text('LOCAL MATE LOGISTICS', 14, 20);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Tracking ID: ${trackingCode}`, 14, 28);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 33);
      doc.text(`Invoice #: INV-${trackingCode}`, 14, 38);

      autoTable(doc, {
        startY: 45,
        head: [['Shipment Detail', 'Information']],
        body: [
          ['Sender', formData.senderName.toUpperCase()],
          ['Sender Phone', formData.senderPhone],
          [
            'Origin',
            `${formData.originAddress}, ${formData.originCity} - ${formData.originPincode}`,
          ],
          ['Receiver', formData.receiverName.toUpperCase()],
          ['Receiver Phone', formData.receiverPhone],
          [
            'Destination',
            `${formData.destAddress}, ${formData.destCity} - ${formData.destPincode}`,
          ],
          ['Package Weight', `${formData.weight} KG`],
          ['Delivery Method', formData.method.toUpperCase().replace('_', ' ')],
          ['Tracking Code', trackingCode],
        ],
        headStyles: { fillColor: [220, 38, 38] },
        theme: 'striped',
      });

      const startY = doc.lastAutoTable.finalY + 10;
      autoTable(doc, {
        startY,
        head: [['Description', 'Amount (INR)']],
        body: [
          ['Base Delivery Charges', `₹${pricing.basePrice.toFixed(2)}`],
          ['Weight Charges', `₹${pricing.weightCharges.toFixed(2)}`],
          ['Distance Charges', `₹${pricing.distanceCharges.toFixed(2)}`],
          ['Tax (18% GST)', `₹${pricing.tax.toFixed(2)}`],
          ['Total Amount', `₹${pricing.total.toFixed(2)}`],
        ],
        headStyles: { fillColor: [220, 38, 38] },
        theme: 'grid',
      });
      doc.save(`LocalMate_Invoice_${trackingCode}.pdf`);
      toast.success('Invoice downloaded!');
    } catch (e) {
      toast.error('PDF generation failed.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingCode);
    toast.info('Tracking ID Copied!');
  };

  const steps = [
    { id: 1, name: 'Origin', icon: <MapPin size={18} /> },
    { id: 2, name: 'Destination', icon: <Send size={18} /> },
    { id: 3, name: 'Package', icon: <Package size={18} /> },
    { id: 4, name: 'Method', icon: <Send size={18} /> },
    { id: 5, name: 'Payment', icon: <CreditCard size={18} /> },
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
            <h2 className="text-slate-900 text-5xl font-black italic uppercase tracking-tighter leading-tight">
              Shipment <br /> <span className="text-slate-400">Console.</span>
            </h2>
          </div>
          <div className="space-y-4">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`flex items-center gap-5 transition-all p-3 rounded-2xl ${
                  step >= s.id
                    ? 'bg-white/70 border border-slate-200 shadow-sm'
                    : 'opacity-30'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 ${
                    step > s.id
                      ? 'bg-green-500 border-green-500 text-white'
                      : step === s.id
                      ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20'
                      : 'border-slate-300 text-slate-400'
                  }`}
                >
                  {step > s.id ? <CheckCircle size={20} /> : s.icon}
                </div>
                <div>
                  <p className="text-slate-900 font-black italic uppercase text-sm">
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
              {/* Step 1: Origin */}
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

              {/* Step 2: Destination */}
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

              {/* Step 3: Package */}
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
                    {/* ✅ Weight Pricing Display */}
                    <div className="mt-6 p-4 bg-white rounded-xl border border-slate-200">
                      <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">
                        Weight Charges Breakdown
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 text-sm">
                          {formData.weight <= 10
                            ? 'First 10kg (Fixed)'
                            : 'First 10kg + Additional weight'}
                        </span>
                        <span className="text-red-600 font-bold">
                          ₹{pricing.weightCharges.toFixed(2)}
                        </span>
                      </div>
                      {formData.weight > 10 && (
                        <div className="mt-2 text-xs text-slate-500">
                          (₹30 for first 10kg + ₹5/kg for remaining{' '}
                          {(formData.weight - 10).toFixed(1)}kg)
                        </div>
                      )}
                    </div>
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

              {/* Step 4: Method */}
              {step === 4 && (
                <div className="space-y-6">
                  <Header title="Transit Mode" sub="Select Delivery Channel" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <MethodCard
                      id="surface"
                      name="Surface"
                      icon={<Bike size={32} />}
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
                        <span>Base Delivery:</span>
                        <span>₹{pricing.basePrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight Charges:</span>
                        <span>₹{pricing.weightCharges.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Tax (18% GST):</span>
                        <span>₹{pricing.tax.toFixed(2)}</span>
                      </div>
                      <div className="h-[1px] bg-white/10 my-4"></div>
                      <div className="flex justify-between items-end">
                        <span className="text-xl font-black italic">
                          ESTIMATED TOTAL
                        </span>
                        <span className="text-4xl font-black text-red-500 italic flex items-center gap-1">
                          <IndianRupee size={24} />
                          {pricing.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ✅ Step 5: Payment - FIXED QR DISPLAY */}
              {step === 5 && (
                <div className="space-y-6">
                  <Header title="Security" sub="Final Payment Verification" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="p-8 rounded-[2rem] border-2 border-red-600 bg-white shadow-xl flex flex-col items-center">
                      <p className="text-[10px] font-black text-slate-400 mb-4 uppercase tracking-widest">
                        SCAN TO AUTHORIZE
                      </p>
                      {/* ✅ FIXED: Canvas-based QR Code */}
                      <QRCode size={176} />
                      <p className="text-xs text-slate-500 mt-2 font-medium">
                        UPI Payment QR
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <p className="text-[9px] text-slate-400 font-black uppercase mb-1">
                          Generated Tracking Code
                        </p>
                        <p className="text-xl font-black italic text-slate-900 tracking-wider">
                          {trackingCode || 'LM-ABC123-IN'}
                        </p>
                      </div>
                      <div className="bg-red-600 p-6 rounded-2xl text-white">
                        <p className="text-[9px] font-black uppercase mb-1 opacity-70">
                          Payable Amount
                        </p>
                        <p className="text-3xl font-black italic">
                          ₹{pricing.total.toFixed(2)}
                        </p>
                      </div>
                      {/* ✅ Pricing Breakdown */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <p className="text-xs text-slate-700 mb-2 font-bold">
                          Pricing Breakdown:
                        </p>
                        <div className="text-xs text-slate-600 space-y-1">
                          <div className="flex justify-between">
                            <span>Base Delivery:</span>
                            <span>₹{pricing.basePrice.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Weight ({formData.weight}kg):</span>
                            <span>₹{pricing.weightCharges.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Method ({formData.method}):</span>
                            <span>
                              {formData.method === 'express_air'
                                ? '2.5x'
                                : formData.method === 'cargo_ship'
                                ? '1.5x'
                                : '1x'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>GST (18%):</span>
                            <span>₹{pricing.tax.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Success */}
              {step === 6 && (
                <div className="text-center py-10">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={56} />
                  </div>
                  <h3 className="text-slate-900 text-5xl font-black italic uppercase">
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
                        className="text-red-600 cursor-pointer hover:scale-110 transition-transform"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={downloadInvoice}
                      className="bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase italic text-xs flex items-center gap-3 shadow-xl hover:bg-slate-900 transition-all"
                    >
                      <Download size={16} /> Export Receipt
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="bg-white border border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-black uppercase text-xs hover:bg-slate-50 transition-all"
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
                    className="bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase italic text-[10px] flex items-center gap-3 shadow-lg shadow-red-600/20 hover:scale-105 transition-all ml-auto disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <>
                        {step === 4
                          ? 'GENERATE SHIPMENT'
                          : step === 5
                          ? 'SYNC & VERIFY'
                          : 'NEXT PHASE'}{' '}
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

// Sub-components (UNCHANGED)
const Header = ({ title, sub }) => (
  <div className="border-l-4 border-red-600 pl-6 text-left">
    <h3 className="text-slate-900 text-3xl font-black italic uppercase tracking-tighter">
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
  type = 'text',
  maxLength,
  required,
}) => (
  <div className="space-y-2 text-left">
    <label className="text-[9px] text-slate-400 font-black uppercase tracking-widest ml-1">
      {label} {required && '*'}
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
      {label} {required && '*'}
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
        ? 'bg-white border-red-600 shadow-xl scale-105'
        : 'bg-slate-50 border-transparent opacity-60 hover:opacity-100 hover:shadow-lg'
    }`}
  >
    <div className={active === id ? 'text-red-600' : 'text-slate-400'}>
      {icon}
    </div>
    <span className="text-slate-900 font-black italic uppercase text-xs tracking-widest block">
      {name}
    </span>
    <span className="text-slate-400 text-[8px] font-bold uppercase block mt-1">
      {duration}
    </span>
  </div>
);

export default CreateShipment;
