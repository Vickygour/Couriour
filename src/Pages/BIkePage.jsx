import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BikeDeliver from "../assets/BikeDeliver.jpg";
import {
  ArrowRight,
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
  Bike,
  Zap,
  Target,
  Lock,
  ShieldCheck,
  Timer,
  Navigation,
} from "lucide-react";
import CreateShipment from "./CreateShipment";
import AOS from "aos";
import "aos/dist/aos.css";

const BikeLogisticsPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-[#020617] mt-20 md:mt-32 text-slate-200 font-sans antialiased selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* --- SECTION 1: MASTER BANNER --- */}
      <section className="relative h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-transparent to-[#020617] z-10" />
          <img
            src={BikeDeliver}
            className="w-full h-full object-cover"
            alt="Localmate Bike Delivery"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6"
          >
            <div className="w-6 md:w-10 h-[1px] bg-red-600" />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-red-600 italic">
              Hyper-Local Intra-city Hub
            </span>
            <div className="w-6 md:w-10 h-[1px] bg-red-600" />
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl sm:text-6xl md:text-9xl font-black uppercase leading-none tracking-tighter mb-4 md:mb-8"
          >
            BIKE<span className="text-red-600">COURIER</span> <br />
            <span className="italic font-light opacity-80">INSTANT.</span>
          </motion.h1>
          <p className="max-w-xl md:max-w-2xl mx-auto text-slate-400 text-sm md:text-xl font-medium italic leading-relaxed px-4">
            Anything, Anywhere in the city. Our bike partners pick up your
            documents, keys, or parcels and deliver them in under 60 minutes.
          </p>
        </div>
      </section>

      {/* --- SECTION 2: HYPER-LOCAL TECH --- */}
      <section className="py-16 md:py-24 bg-white text-[#020617] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* LEFT COLUMN: VISUAL ASSET */}
            <div data-aos="fade-right" className="relative group w-full">
              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-24 md:w-32 h-24 md:h-32 bg-red-600/10 rounded-full blur-3xl" />
              <div className="relative z-10 overflow-hidden rounded-[2rem] md:rounded-[3.5rem] shadow-2xl border border-slate-100">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                  src="https://images.unsplash.com/photo-1585914641050-fa9883c4e21c?q=80&w=1000"
                  className="w-full h-[350px] md:h-[550px] object-cover"
                  alt="City Delivery"
                />
                <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-[#020617]/90 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl border border-white/10 text-[8px] md:text-[10px] text-white font-black uppercase tracking-widest">
                  Live: 15-Min Pickup
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#020617] to-transparent p-6 md:p-10 pt-12 md:pt-20">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 flex items-center justify-center rounded-xl md:rounded-2xl">
                      <Timer size={24} className="text-white md:w-8 md:h-8" />
                    </div>
                    <div>
                      <h4 className="text-white font-black italic uppercase text-lg md:text-xl">
                        Flash Dispatch
                      </h4>
                      <p className="text-slate-400 text-[8px] md:text-[10px] font-bold uppercase tracking-widest mt-1">
                        Real-Time Routing Sync
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: STRATEGIC CONTENT */}
            <div
              data-aos="fade-left"
              className="flex flex-col justify-center px-2"
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <span className="w-8 h-[2px] bg-red-600"></span>
                <h2 className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-red-600 italic">
                  Last-Mile Precision
                </h2>
              </div>
              <h3 className="text-4xl md:text-6xl font-black uppercase leading-[0.95] tracking-tighter text-[#020617] mb-6 md:mb-10">
                Instant <br />
                <span className="text-red-600 italic">Door-to-Door</span> <br />
                Connectivity.
              </h3>
              <p className="text-slate-500 text-sm md:text-lg leading-relaxed mb-8 md:mb-12 italic font-medium border-l-4 border-red-600/10 pl-4 md:pl-8">
                Skip the traffic. Our fleet of 10,000+ bike partners ensures
                your small parcels and documents move across the city at{" "}
                <span className="font-black text-[#020617]">
                  Bypassing Congestion
                </span>
                .
              </p>
              <div className="grid gap-4 md:gap-6">
                {[
                  {
                    title: "Point-to-Point Pickup",
                    desc: "Our partner reaches your location within 15 minutes of booking.",
                  },
                  {
                    title: "Contactless Secure",
                    desc: "OTP verified handshakes for documents and high-value keys.",
                  },
                  {
                    title: "Live Navigation",
                    desc: "Track the courier's real-time movement on our interactive map grid.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3 md:gap-5 p-3 md:p-4 rounded-2xl hover:bg-slate-50 transition-all group"
                  >
                    <div className="mt-1 bg-red-600/10 p-2 rounded-lg md:rounded-xl group-hover:bg-red-600 transition-colors">
                      <Navigation
                        className="text-red-600 group-hover:text-white"
                        size={16}
                      />
                    </div>
                    <div>
                      <h5 className="font-black uppercase italic text-xs md:text-sm text-[#020617]">
                        {item.title}
                      </h5>
                      <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: BIKE SERVICE SPECS --- */}
      <section className="py-16 md:py-32 bg-slate-50 text-[#020617]">
        <div className="container mx-auto px-4 md:px-6 text-center mb-12 md:mb-20">
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">
            City <span className="text-red-600">Flash Features.</span>
          </h3>
        </div>
        <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <SpecCard
            icon={<Zap size={30} />}
            title="Lightning Speed"
            desc="The fastest way to send anything intra-city, beating car-based couriers by 40%."
          />
          <SpecCard
            icon={<Package size={30} />}
            title="Up to 10kg"
            desc="Perfect for documents, lunch boxes, clothes, gadgets, and small retail orders."
          />
          <SpecCard
            icon={<Globe size={30} />}
            title="City-Wide Grid"
            desc="We operate across all sectors and neighborhoods with zero dead-zones."
          />
        </div>
      </section>

      {/* --- SECTION 4: FAQ & CONTACT --- */}
      <section className="py-16 md:py-24 px-4 sm:px-10 bg-[#020617] border-y border-white/5">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7" data-aos="fade-up">
            <h4 className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] mb-6 md:mb-10 italic border-l-2 border-red-600 pl-4">
              Hyper-Local FAQ
            </h4>
            <div className="space-y-2">
              <FAQItem
                question="What is the maximum distance for bike delivery?"
                answer="We cover the entire city radius, typically up to 40-50km for intra-city instant dispatch."
              />
              <FAQItem
                question="What items are not allowed?"
                answer="We do not carry illegal substances, highly inflammable items, or items weighing more than 10-12kg."
              />
              <FAQItem
                question="Can I book for multiple stops?"
                answer="Yes, our tactical grid allows 'Route-Planning' where one bike partner can visit multiple locations."
              />
              <FAQItem
                question="Is there an OTP for delivery?"
                answer="Yes, every delivery is secured via a 4-digit OTP sent to the receiver's mobile."
              />
              <FAQItem
                question="How soon does the partner arrive?"
                answer="Our average pickup time across major Indian metros is currently 14.5 minutes."
              />
            </div>
          </div>

          <div
            className="lg:col-span-5 bg-white/5 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10"
            data-aos="fade-up"
          >
            <h4 className="text-white font-black uppercase italic text-xl md:text-2xl mb-6 md:mb-8 tracking-tighter">
              Delivery <span className="text-red-600">Handshake.</span>
            </h4>
            <p className="text-slate-400 text-xs md:text-sm italic leading-relaxed mb-8 uppercase tracking-wide">
              Localmate Bike-Courier is the backbone of city movement. From
              small business owners to busy professionals, we deliver peace of
              mind.
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

      <div />
      <CreateShipment />
    </div>
  );
};

// --- RESPONSIVE HELPER COMPONENTS ---

const SpecCard = ({ icon, title, desc }) => (
  <div className="p-8 md:p-12 bg-white border border-slate-100 rounded-[2rem] md:rounded-[3rem] shadow-md hover:shadow-xl transition-all group">
    <div className="text-red-600 mb-6 md:mb-8 p-3 md:p-4 bg-slate-50 rounded-xl md:rounded-2xl w-fit group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <h4 className="text-lg md:text-xl font-black uppercase italic mb-3 md:mb-4 text-[#020617]">
      {title}
    </h4>
    <p className="text-slate-500 text-[10px] md:text-sm font-medium italic leading-relaxed uppercase tracking-wider">
      {desc}
    </p>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 md:py-6 flex justify-between items-center text-left"
      >
        <span className="font-black uppercase italic tracking-wider text-xs md:text-sm pr-4">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp size={14} className="text-red-600" />
        ) : (
          <ChevronDown size={14} className="text-slate-600" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="pb-4 md:pb-6 overflow-hidden"
          >
            <p className="text-slate-400 text-[10px] md:text-xs italic font-medium uppercase tracking-widest">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactInfo = ({ icon, text }) => (
  <div className="flex items-center gap-3 md:gap-4 group">
    <div className="p-2 md:p-3 bg-white/5 rounded-lg border border-white/5 group-hover:border-red-600 transition-colors">
      {icon}
    </div>
    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-300 break-all sm:break-normal">
      {text}
    </span>
  </div>
);

export default BikeLogisticsPage;
