import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Truck,
  Package,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
} from "lucide-react";
import CreateShipment from "./CreateShipment";
import AOS from "aos";
import "aos/dist/aos.css";

const LocalmatePremium = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-[#020617] mt-20 md:mt-32 text-slate-200 font-sans antialiased selection:bg-red-600 selection:text-white">
      {/* --- SECTION 1: MASTER BANNER --- */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-transparent to-[#020617] z-10" />
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000"
            className="w-full h-full object-cover"
            alt="Main Banner"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-10 h-[1px] bg-red-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-600 italic">
              Premium Dispatch Hub
            </span>
            <div className="w-10 h-[1px] bg-red-600" />
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-9xl font-black uppercase leading-none tracking-tighter mb-8"
          >
            LOCAL<span className="text-red-600">MATE</span> <br />
            <span className="italic font-light opacity-80">LOGISTICS.</span>
          </motion.h1>

          <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-medium italic leading-relaxed">
            Reliable transportation and quality delivery systems for Bharat's
            fastest growing enterprises.
          </p>
        </div>
      </section>

      {/* --- SECTION 2: WHAT IS EXPRESS DELIVERY? --- */}
      <section className="py-24 bg-white text-[#020617] overflow-hidden">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* LEFT COLUMN: VISUAL ASSET */}
            <div data-aos="fade-right" className="relative group">
              {/* Decorative Background Element */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/20 transition-all duration-700" />

              <div className="relative z-10 overflow-hidden rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                  src="https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=1000"
                  className="w-full h-[550px] object-cover"
                  alt="Localmate Express Delivery"
                />

                {/* Overlay Tag */}
                <div className="absolute top-8 left-8 bg-[#020617]/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                  <p className="text-white text-[10px] font-black uppercase tracking-[0.3em]">
                    Status: High Velocity
                  </p>
                </div>

                {/* Floating Action Card */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#020617] to-transparent p-10 pt-20">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-red-600 flex items-center justify-center rounded-2xl shadow-2xl shadow-red-600/40">
                      <Zap size={32} className="text-white fill-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-black italic uppercase text-xl tracking-tighter leading-none">
                        Instant Transit
                      </h4>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                        Priority Node Activation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: STRATEGIC CONTENT */}
            <div
              data-aos="fade-left"
              className="flex flex-col justify-center py-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-red-600"></span>
                <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-red-600 italic">
                  Elite Operational Tier
                </h2>
              </div>

              <h3 className="text-5xl md:text-6xl font-black uppercase leading-[0.95] tracking-tighter text-[#020617] mb-10">
                Unpacking <br />
                <span className="text-red-600 italic">Express</span> <br />
                <span className="relative inline-block mt-2">
                  Intelligence.
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-2 text-red-600/20"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 25 0 50 5 T 100 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                  </svg>
                </span>
              </h3>

              <p className="text-slate-500 text-lg leading-relaxed mb-12 italic font-medium max-w-lg border-l-4 border-red-600/10 pl-8">
                Localmate Express is not just a delivery service; it's a
                high-velocity logistics ecosystem. Designed for critical cargo
                where{" "}
                <span className="text-[#020617] font-black">Zero-Latency</span>{" "}
                is the only acceptable standard.
              </p>

              {/* Feature List with Custom Icons */}
              <div className="grid gap-6">
                {[
                  {
                    title: "Metro-Circle Hubs",
                    desc: "Next-Day delivery within Tier-1 circuits.",
                  },
                  {
                    title: "Telemetric Tracking",
                    desc: "Military-grade end-to-end asset visibility.",
                  },
                  {
                    title: "Elite Handlers",
                    desc: "Dedicated experts for last-mile precision.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-5 p-4 rounded-3xl hover:bg-slate-50 transition-all cursor-default group"
                  >
                    <div className="mt-1 bg-red-600/10 p-2 rounded-xl group-hover:bg-red-600 transition-colors">
                      <CheckCircle
                        className="text-red-600 group-hover:text-white"
                        size={18}
                      />
                    </div>
                    <div>
                      <h5 className="font-black uppercase italic text-sm tracking-tight text-[#020617]">
                        {item.title}
                      </h5>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tactical Button */}
              <button className="mt-12 group flex items-center gap-4 bg-[#020617] text-white px-10 py-5 rounded-2xl font-black uppercase italic tracking-widest text-[10px] hover:bg-red-600 transition-all self-start shadow-xl">
                Learn System Capabilities
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: EXPRESS DELIVERY SPECS --- */}
      <section className="py-32 bg-slate-50 text-[#020617]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-4xl font-black uppercase tracking-tighter italic">
              Key Capabilities of{" "}
              <span className="text-red-600">Localmate Express.</span>
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <SpecCard
              icon={<Truck size={30} />}
              title="Hyper-Local Fleet"
              desc="A specialized fleet of 5000+ vehicles optimized for urban and remote Indian navigation."
            />
            <SpecCard
              icon={<Shield size={30} />}
              title="Secure Shield"
              desc="OTP-based delivery and 100% insurance coverage for every express node dispatched."
            />
            <SpecCard
              icon={<Globe size={30} />}
              title="Pan-India Sync"
              desc="Seamless synchronization between 19,000+ Pin Codes using our neural routing API."
            />
          </div>
        </div>
      </section>

      {/* --- SECTION 4: FAQ & COMPANY DETAIL (Side-by-Side) --- */}
      <section className="py-15 px-10 bg-[#020617] border-y border-white/5 relative">
        <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-20">
          {/* FAQ SIDE */}
          <div className="lg:col-span-7" data-aos="fade-right">
            <h4 className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] mb-10 italic border-l-2 border-red-600 pl-4">
              Support & FAQ
            </h4>
            <div className="space-y-4">
              <FAQItem
                question="How fast is Express Delivery?"
                answer="We guarantee 24-48 hour delivery within major metro circuits and up to 72 hours for regional hubs."
              />
              <FAQItem
                question="Can I track in real-time?"
                answer="Yes, our Dispatch Console provides 4K real-time telemetry tracking for every asset."
              />
              <FAQItem
                question="What if the package is delayed?"
                answer="Localmate offers a 'Late-Voucher' refund policy for any delay exceeding our committed ETA."
              />
              <FAQItem
                question="Is high-value cargo insured?"
                answer="Every shipment is automatically insured up to ₹50,000 with options to extend coverage."
              />
            </div>
          </div>

          {/* COMPANY DETAIL SIDE */}
          <div
            className="lg:col-span-5 bg-white/5 p-12 rounded-[3rem] border border-white/10"
            data-aos="fade-left"
          >
            <h4 className="text-white font-black uppercase italic text-2xl mb-8 tracking-tighter">
              Localmate <span className="text-red-600">Corporate.</span>
            </h4>
            <p className="text-slate-400 text-sm italic leading-relaxed mb-10 font-medium uppercase tracking-wide">
              Founded in 2026, Localmate Logistics is a tactical supply-chain
              firm. We bridge the gap between complex industrial logistics and
              simple, reliable user experiences.
            </p>
            <div className="space-y-4 md:space-y-6">
              {/* ADDRESS */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Kh+No+11/14/1+And+14/1+Street+No+03+Block+A+Kamal+Vihar+Burari+Delhi+110084"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-slate-300 hover:text-red-600 transition-colors"
              >
                <MapPin size={16} className="text-red-600 mt-1" />
                <span className="text-sm leading-relaxed">
                  Kh No 11/14/1 And 14/1 (2nd Floor), Street No-03, Block A,
                  Kamal Vihar, Burari, North Delhi-110084
                </span>
              </a>

              {/* PHONE */}
              <a
                href="tel:+918826262858"
                className="flex items-center gap-3 text-slate-300 hover:text-red-600 transition-colors"
              >
                <Phone size={16} className="text-red-600" />
                <span className="text-sm font-semibold">+91 8826262858</span>
              </a>

              {/* EMAIL */}
              <a
                href="mailto:localmate2025@gmail.com"
                className="flex items-center gap-3 text-slate-300 hover:text-red-600 transition-colors"
              >
                <Mail size={16} className="text-red-600" />
                <span className="text-sm font-semibold">
                  localmate2025@gmail.com
                </span>
              </a>

              {/* ENQUIRY BUTTON */}
              <button
                type="button"
                onClick={() =>
                  (window.location.href =
                    "mailto:localmate2025@gmail.com?subject=Service Enquiry - Localmate&body=Hello Localmate Team,%0D%0A%0D%0AI would like to enquire about your logistics services.%0D%0A%0D%0AName:%0D%0APhone:%0D%0AService Required:%0D%0ACity:%0D%0A%0D%0AThank you.")
                }
                className="mt-8 md:mt-12 w-full bg-red-600 text-white py-5 md:py-6 rounded-xl md:rounded-2xl font-black uppercase italic tracking-widest text-[10px] hover:bg-white hover:text-black transition-all shadow-xl"
              >
                Send Enquiry
              </button>
            </div>
          </div>
        </div>
      </section>
      <CreateShipment />

      {/* FINAL STRIP */}
      <div className="h-1 bg-red-600 w-full" />
    </div>
  );
};

// --- HELPER COMPONENTS ---

const SpecCard = ({ icon, title, desc }) => (
  <div className="p-12 bg-white border border-slate-100 rounded-[3rem] hover:shadow-2xl transition-all group hover:-translate-y-2 cursor-default">
    <div className="text-red-600 mb-8 p-4 bg-slate-50 rounded-2xl w-fit group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
      {icon}
    </div>
    <h4 className="text-xl font-black uppercase italic mb-4 text-[#020617]">
      {title}
    </h4>
    <p className="text-slate-500 text-sm font-medium italic leading-relaxed uppercase tracking-wider">
      {desc}
    </p>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left"
      >
        <span className="font-black uppercase italic tracking-wider text-sm">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp size={16} className="text-red-600" />
        ) : (
          <ChevronDown size={16} className="text-slate-600" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="pb-6"
          >
            <p className="text-slate-400 text-xs italic font-medium uppercase tracking-widest">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactInfo = ({ icon, text }) => (
  <div className="flex items-center gap-4 group">
    <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-red-600 transition-colors">
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
      {text}
    </span>
  </div>
);

export default LocalmatePremium;
