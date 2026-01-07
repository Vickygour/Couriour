import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../utils/api'; // Import your API instance
import Payment from '../assets/Payment.jpeg';

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
} from 'lucide-react';

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
      const basePrice = 50;
      const weightPrice = formData.weight * 20;
      const methodMultiplier = {
        surface: 1,
        express_air: 2.5,
        cargo_ship: 1.5,
      };

      const subtotal =
        (basePrice + weightPrice) * methodMultiplier[formData.method];
      const tax = subtotal * 0.18;

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

    if (step === 4) {
      createShipment();
    } else if (step === 5) {
      verifyPayment();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // UPDATED: Create Shipment with API
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

      // API Call - No need to write full URL
      const response = await API.post('/shipment/create', payload);

      if (response.data.success) {
        const { trackingCode, shipment, qrCode } = response.data.data;

        setTrackingCode(trackingCode);
        setShipmentData(shipment);
        setPaymentQR(qrCode || Payment);
        setPricing(shipment.pricing);

        toast.success('Shipment created successfully!');
        setStep(5);
      } else {
        toast.error(response.data.message || 'Failed to create shipment');
      }
    } catch (error) {
      console.error('Create Shipment Error:', error);

      // Fallback to demo mode if backend not ready
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

      toast.success('Shipment created! (Demo Mode)');
      setStep(5);
    } finally {
      setLoading(false);
    }
  };

  // UPDATED: Verify Payment with API
  const verifyPayment = async () => {
    setLoading(true);

    try {
      const fakeTransactionId = `TXN${Date.now()}${Math.floor(
        Math.random() * 1000,
      )}`;

      // API Call - Simple route
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

      // Auto success for demo mode
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
          ['Base Price', `₹${pricing.basePrice.toFixed(2)}`],
          ['Weight Charges', `₹${pricing.weightCharges.toFixed(2)}`],
          ['Distance Charges', `₹${pricing.distanceCharges.toFixed(2)}`],
          ['Tax (18% GST)', `₹${pricing.tax.toFixed(2)}`],
          ['Total Amount', `₹${pricing.total.toFixed(2)}`],
        ],
        headStyles: { fillColor: [220, 38, 38] },
        theme: 'grid',
      });

      const finalY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text('Thank you for choosing LocalMate Logistics!', 14, finalY);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, finalY + 5);

      doc.save(`LocalMate_Invoice_${trackingCode}.pdf`);
      toast.success('Invoice downloaded successfully!');
    } catch (e) {
      console.error('PDF Error:', e);
      toast.error('PDF generation failed.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingCode);
    toast.info('Tracking ID Copied!');
  };

  const steps = [
    { id: 1, name: 'Origin', icon: <MapPin size={18} /> },
    { id: 2, name: 'Destination', icon: <NavigationIcon size={18} /> },
    { id: 3, name: 'Package', icon: <Package size={18} /> },
    { id: 4, name: 'Method', icon: <Send size={18} /> },
    { id: 5, name: 'Payment', icon: <CreditCard size={18} /> },
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
                  step >= s.id ? 'opacity-100' : 'opacity-20'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 ${
                    step > s.id
                      ? 'bg-green-600 border-green-600 text-white shadow-lg shadow-green-600/20'
                      : step === s.id
                      ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20'
                      : 'border-white/10 text-white'
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
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* STEP 1: ORIGIN */}
              {step === 1 && (
                <div className="space-y-6">
                  <Header title="Origin Setup" sub="Pickup Details" />
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
                      maxLength={6}
                      value={formData.originPincode}
                      onChange={(v) =>
                        setFormData({ ...formData, originPincode: v })
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomInput
                      label="CITY"
                      placeholder="City Name"
                      value={formData.originCity}
                      onChange={(v) =>
                        setFormData({ ...formData, originCity: v })
                      }
                    />
                    <CustomInput
                      label="STATE"
                      placeholder="State Name"
                      value={formData.originState}
                      onChange={(v) =>
                        setFormData({ ...formData, originState: v })
                      }
                    />
                  </div>
                  <CustomTextarea
                    label="PICKUP ADDRESS"
                    placeholder="House No, Street, Landmark, Area"
                    value={formData.originAddress}
                    onChange={(v) =>
                      setFormData({ ...formData, originAddress: v })
                    }
                    required
                  />
                </div>
              )}

              {/* STEP 2: DESTINATION */}
              {step === 2 && (
                <div className="space-y-6">
                  <Header title="Destination" sub="Drop-off Details" />
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
                      label="EMAIL (Optional)"
                      placeholder="receiver@example.com"
                      type="email"
                      value={formData.receiverEmail}
                      onChange={(v) =>
                        setFormData({ ...formData, receiverEmail: v })
                      }
                    />
                    <CustomInput
                      label="PINCODE"
                      placeholder="6 Digits"
                      type="number"
                      maxLength={6}
                      value={formData.destPincode}
                      onChange={(v) =>
                        setFormData({ ...formData, destPincode: v })
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomInput
                      label="CITY"
                      placeholder="City Name"
                      value={formData.destCity}
                      onChange={(v) =>
                        setFormData({ ...formData, destCity: v })
                      }
                    />
                    <CustomInput
                      label="STATE"
                      placeholder="State Name"
                      value={formData.destState}
                      onChange={(v) =>
                        setFormData({ ...formData, destState: v })
                      }
                    />
                  </div>
                  <CustomTextarea
                    label="DELIVERY ADDRESS"
                    placeholder="House No, Street, Landmark, Area"
                    value={formData.destAddress}
                    onChange={(v) =>
                      setFormData({ ...formData, destAddress: v })
                    }
                    required
                  />
                </div>
              )}

              {/* STEP 3: PACKAGE */}
              {step === 3 && (
                <div className="space-y-8">
                  <Header title="Cargo Specs" sub="Package Information" />
                  <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                    <Weight className="text-red-600 mb-4" size={32} />
                    <label className="text-white font-black text-xs block mb-4 uppercase tracking-widest">
                      Weight: {formData.weight} KG
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
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-red-600"
                    />
                    <div className="flex justify-between text-[10px] text-gray-500 mt-2">
                      <span>0.1 KG</span>
                      <span>100 KG</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomInput
                      label="PACKAGE DESCRIPTION"
                      placeholder="e.g., Books, Electronics"
                      value={formData.packageDescription}
                      onChange={(v) =>
                        setFormData({ ...formData, packageDescription: v })
                      }
                    />
                    <CustomInput
                      label="PACKAGE VALUE (INR)"
                      placeholder="Declared Value"
                      type="number"
                      value={formData.packageValue}
                      onChange={(v) =>
                        setFormData({ ...formData, packageValue: v })
                      }
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                    <input
                      type="checkbox"
                      id="fragile"
                      checked={formData.fragile}
                      onChange={(e) =>
                        setFormData({ ...formData, fragile: e.target.checked })
                      }
                      className="w-5 h-5 accent-red-600 cursor-pointer"
                    />
                    <label
                      htmlFor="fragile"
                      className="text-white font-black text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Fragile / Handle with Care
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 4: METHOD */}
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
                      duration="10-14 Days"
                      active={formData.method}
                      onClick={(id) => setFormData({ ...formData, method: id })}
                    />
                  </div>
                  <div className="bg-red-600/10 p-6 rounded-2xl border border-red-600/20">
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-4">
                      Estimated Charges
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-300">
                        <span>Base Price:</span>
                        <span>₹{pricing.basePrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Weight Charges:</span>
                        <span>₹{pricing.weightCharges.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Tax (18% GST):</span>
                        <span>₹{pricing.tax.toFixed(2)}</span>
                      </div>
                      <div className="h-[1px] bg-white/10 my-3"></div>
                      <div className="flex justify-between text-white font-black text-lg">
                        <span>Estimated Total:</span>
                        <span className="flex items-center gap-1">
                          <IndianRupee size={18} />
                          {pricing.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <p className="text-[8px] text-gray-500 mt-3 italic">
                      * Final amount will be calculated after shipment creation
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 5: PAYMENT */}
              {step === 5 && (
                <div className="space-y-6">
                  <Header title="Payment" sub="Review & Complete Payment" />
                  {trackingCode && (
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">
                        Tracking Code Generated
                      </p>
                      <p className="text-white font-black text-lg tracking-wider">
                        {trackingCode}
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="p-6 rounded-[2rem] border-2 border-red-600/50 bg-white/5">
                      <p className="text-center text-[10px] font-black text-white mb-4 uppercase tracking-widest">
                        PAYMENT QR CODE
                      </p>
                      <img
                        src={paymentQR || Payment}
                        alt="Payment QR"
                        className="w-40 h-40 mx-auto rounded-lg border border-white/10"
                      />
                      <p className="text-center text-[8px] text-gray-500 mt-3">
                        Scan to pay (Optional - Demo Mode)
                      </p>
                    </div>
                    <div className="bg-red-600/5 p-8 rounded-2xl border border-red-600/20">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">
                        Final Payable Amount
                      </p>
                      <p className="text-4xl text-white font-black italic flex items-center gap-2 mb-6">
                        <IndianRupee size={28} />
                        {shipmentData
                          ? shipmentData.pricing.total.toFixed(2)
                          : pricing.total.toFixed(2)}
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between text-gray-400">
                          <span>Base + Weight:</span>
                          <span>
                            ₹
                            {shipmentData
                              ? (
                                  shipmentData.pricing.basePrice +
                                  shipmentData.pricing.weightCharges
                                ).toFixed(2)
                              : (
                                  pricing.basePrice + pricing.weightCharges
                                ).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>Distance:</span>
                          <span>
                            ₹
                            {shipmentData
                              ? shipmentData.pricing.distanceCharges.toFixed(2)
                              : '0.00'}
                          </span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>GST (18%):</span>
                          <span>
                            ₹
                            {shipmentData
                              ? shipmentData.pricing.tax.toFixed(2)
                              : pricing.tax.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-600/10 border border-green-600/30 rounded-xl p-4">
                    <p className="text-green-500 text-[10px] font-bold uppercase tracking-wide">
                      ✓ Demo Mode Active: Click "Verify & Confirm" to proceed
                      instantly
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 6: SUCCESS */}
              {step === 6 && (
                <div className="text-center py-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.6 }}
                    className="text-green-500 mx-auto mb-6 flex justify-center"
                  >
                    <CheckCircle size={80} />
                  </motion.div>
                  <h3 className="text-white text-4xl font-black italic uppercase mb-2">
                    Dispatch Confirmed
                  </h3>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-8">
                    Your shipment is ready for transit
                  </p>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-10 inline-block">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] mb-3">
                      Official Dispatch Code
                    </p>
                    <div className="flex items-center gap-4 bg-[#010409] px-8 py-4 rounded-xl border-2 border-red-600/50 mb-4">
                      <span className="text-2xl font-black text-white tracking-widest">
                        {trackingCode}
                      </span>
                      <Copy
                        onClick={copyToClipboard}
                        size={20}
                        className="text-red-600 cursor-pointer hover:scale-110 transition-all"
                      />
                    </div>
                    <p className="text-[10px] text-red-500 font-bold italic">
                      Save this code for tracking
                    </p>
                  </div>
                  {shipmentData && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left max-w-md mx-auto">
                      <h4 className="text-white font-black text-sm uppercase mb-4 border-b border-white/10 pb-2">
                        Shipment Summary
                      </h4>
                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">From:</span>
                          <span className="text-white font-bold">
                            {formData.senderName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">To:</span>
                          <span className="text-white font-bold">
                            {formData.receiverName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Weight:</span>
                          <span className="text-white font-bold">
                            {formData.weight} KG
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Method:</span>
                          <span className="text-white font-bold uppercase">
                            {formData.method.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Amount Paid:</span>
                          <span className="text-green-500 font-black">
                            ₹{shipmentData.pricing.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={downloadInvoice}
                      className="bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase italic text-xs flex items-center justify-center gap-3 shadow-xl hover:bg-white hover:text-black transition-all"
                    >
                      <Download size={16} /> Get Invoice PDF
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/30 font-black uppercase text-[10px] tracking-widest px-10 py-5 rounded-2xl transition-all"
                    >
                      New Dispatch
                    </button>
                  </div>
                </div>
              )}

              {/* NAVIGATION BUTTONS */}
              {step < 6 && (
                <div className="pt-10 flex items-center justify-between border-t border-white/5">
                  {step > 1 && (
                    <button
                      onClick={prevStep}
                      disabled={loading}
                      className="text-white/30 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:text-white transition-all disabled:opacity-30"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                  )}
                  <button
                    onClick={nextStep}
                    disabled={loading}
                    className={`bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase italic text-[10px] flex items-center gap-3 shadow-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      step === 1 ? 'ml-auto' : ''
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Processing...
                      </>
                    ) : (
                      <>
                        {step === 4
                          ? 'CREATE SHIPMENT'
                          : step === 5
                          ? 'VERIFY & CONFIRM'
                          : 'NEXT PHASE'}
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

// HELPER COMPONENTS
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
    <label className="text-[9px] text-gray-400 font-black uppercase tracking-widest ml-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      placeholder={placeholder}
      maxLength={maxLength}
      className="w-full bg-white/5 border-b border-white/10 p-4 text-white outline-none focus:border-red-600 transition-all font-bold text-xs placeholder:text-white/20"
    />
  </div>
);

const CustomTextarea = ({ label, placeholder, value, onChange, required }) => (
  <div className="space-y-2 text-left">
    <label className="text-[9px] text-gray-400 font-black uppercase tracking-widest ml-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 border-b border-white/10 p-4 text-white h-24 outline-none focus:border-red-600 font-bold text-xs resize-none placeholder:text-white/20"
    />
  </div>
);

const MethodCard = ({ id, name, icon, duration, active, onClick }) => (
  <div
    onClick={() => onClick(id)}
    className={`p-6 rounded-3xl border-2 cursor-pointer transition-all text-center flex flex-col items-center gap-3 hover:scale-105 ${
      active === id
        ? 'bg-red-600 border-red-600 shadow-xl shadow-red-600/20'
        : 'bg-white/5 border-white/10 opacity-60 hover:opacity-100'
    }`}
  >
    <div className={active === id ? 'text-white' : 'text-red-600'}>{icon}</div>
    <div>
      <span className="text-white font-black italic uppercase text-xs tracking-widest block">
        {name}
      </span>
      {duration && (
        <span className="text-white/60 text-[8px] font-bold uppercase block mt-1">
          {duration}
        </span>
      )}
    </div>
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
