import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Warehouse,
  Cpu,
  Database,
} from "lucide-react";
import CreateShipment from "./CreateShipment";
import AOS from "aos";
import "aos/dist/aos.css";

const WarehousingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-[#020617] mt-16 md:mt-32 text-slate-200 font-sans antialiased selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* --- SECTION 1: MASTER BANNER --- */}
      <section className="relative h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-transparent to-[#020617] z-10" />
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000"
            className="w-full h-full object-cover"
            alt="Smart Warehouse"
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
              Global Fulfillment Grid
            </span>
            <div className="w-6 md:w-10 h-[1px] bg-red-600" />
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl sm:text-6xl md:text-9xl font-black uppercase leading-none tracking-tighter mb-4 md:mb-8"
          >
            SMART<span className="text-red-600">STORAGE</span> <br />
            <span className="italic font-light opacity-80">SOLUTIONS.</span>
          </motion.h1>
          <p className="max-w-xl md:max-w-2xl mx-auto text-slate-400 text-sm md:text-xl font-medium italic leading-relaxed px-4">
            High-tech warehousing infrastructure designed to synchronize your
            inventory with the velocity of modern commerce.
          </p>
        </div>
      </section>

      {/* --- SECTION 2: SMART WAREHOUSING GRID --- */}
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
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1000"
                  className="w-full h-[350px] md:h-[550px] object-cover"
                  alt="Automation"
                />
                <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-[#020617]/90 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl border border-white/10 text-[8px] md:text-[10px] text-white font-black uppercase tracking-widest">
                  Status: Fully Automated
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#020617] to-transparent p-6 md:p-10 pt-12 md:pt-20">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 flex items-center justify-center rounded-xl md:rounded-2xl shadow-xl shadow-red-600/40">
                      <Database
                        size={24}
                        className="text-white md:w-8 md:h-8"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-black italic uppercase text-lg md:text-xl">
                        Cloud Inventory
                      </h4>
                      <p className="text-slate-400 text-[8px] md:text-[10px] font-bold uppercase tracking-widest mt-1">
                        Real-Time Data Sync
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
                  Advanced Storage Tier
                </h2>
              </div>
              <h3 className="text-4xl md:text-6xl font-black uppercase leading-[0.95] tracking-tighter text-[#020617] mb-6 md:mb-10">
                Modern <br />
                <span className="text-red-600 italic">Warehouse</span> <br />
                Architecture.
              </h3>
              <p className="text-slate-500 text-sm md:text-lg leading-relaxed mb-8 md:mb-12 italic font-medium border-l-4 border-red-600/10 pl-4 md:pl-8">
                Localmate Warehousing is an ecosystem of 48+ national hubs
                providing{" "}
                <span className="font-black text-[#020617]">
                  Climate-Controlled
                </span>{" "}
                tech-enabled spaces.
              </p>
              <div className="grid gap-4 md:gap-6">
                {[
                  {
                    title: "Omni-Channel Sync",
                    desc: "Connect your store API directly to dispatch nodes.",
                  },
                  {
                    title: "Precision Picking",
                    desc: "99.9% accuracy in SKU and order fulfillment.",
                  },
                  {
                    title: "Climate Governance",
                    desc: "Specialized zones for luxury & medical goods.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3 md:gap-5 p-3 md:p-4 rounded-2xl hover:bg-slate-50 transition-all group"
                  >
                    <div className="mt-1 bg-red-600/10 p-2 rounded-lg md:rounded-xl group-hover:bg-red-600 transition-colors">
                      <CheckCircle
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

      {/* --- SECTION 3: CAPABILITIES GRID --- */}
      <section className="py-16 md:py-32 bg-slate-50 text-[#020617]">
        <div className="container mx-auto px-4 md:px-6 text-center mb-12 md:mb-20">
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">
            Strategic Storage{" "}
            <span className="text-red-600">Capabilities.</span>
          </h3>
        </div>
        <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <SpecCard
            icon={<Shield size={30} />}
            title="High Security"
            desc="24/7 AI-surveillance and biometric access control for every storage bay."
          />
          <SpecCard
            icon={<Cpu size={30} />}
            title="Automated Picking"
            desc="Robotic systems for ultra-fast and error-free order processing."
          />
          <SpecCard
            icon={<Package size={30} />}
            title="Last-Mile Ready"
            desc="Warehouses strategically placed near major city hubs for instant dispatch."
          />
        </div>
      </section>

      {/* --- SECTION 4: FAQ & COMPANY INFO --- */}
      <section className="py-16 md:py-24 px-4 sm:px-10 bg-[#020617] border-y border-white/5">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7" data-aos="fade-up">
            <h4 className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] mb-6 md:mb-10 italic border-l-2 border-red-600 pl-4">
              Warehousing FAQ
            </h4>
            <div className="space-y-2">
              <FAQItem
                question="Where are your hubs located?"
                answer="48 strategic hubs across India, covering Delhi, Mumbai, Bangalore, and Tier-2 hubs."
              />
              <FAQItem
                question="Do you offer cold storage?"
                answer="Yes, our Premium tier includes climate-controlled zones monitored via IoT sensors for sensitive goods."
              />
              <FAQItem
                question="Can I integrate my store?"
                answer="Absolutely. Our API handshakes directly with Shopify, Amazon, and Magento for automated order fulfillment."
              />
              {/* Naye FAQ Items */}
              <FAQItem
                question="How is inventory safety managed?"
                answer="Our facilities feature 24/7 AI-surveillance, biometric access control, and 100% insurance coverage against unforeseen risks."
              />
              <FAQItem
                question="What is the minimum storage duration?"
                answer="Localmate offers flexible 'Pay-per-use' models with no rigid long-term contracts, suitable for seasonal businesses."
              />
              <FAQItem
                question="How do I track my stock levels?"
                answer="You get access to a real-time Telemetry Dashboard that shows live stock counts, SKU movement, and replenishment alerts."
              />
              <FAQItem
                question="Do you handle returns (RTO)?"
                answer="Yes, our Warehousing nodes include dedicated RTO management centers to process, verify, and restock returned items instantly."
              />
            </div>
          </div>

          <div
            className="lg:col-span-5 bg-white/5 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10"
            data-aos="fade-up"
          >
            <h4 className="text-white font-black uppercase italic text-xl md:text-2xl mb-6 md:mb-8 tracking-tighter">
              Localmate <span className="text-red-600">Network.</span>
            </h4>
            <p className="text-slate-400 text-xs md:text-sm italic leading-relaxed mb-8 uppercase tracking-wide">
              Managing over 1.2 Million Sq. Ft of premium storage specifically
              for high-growth Indian enterprises.
            </p>
            <div className="space-y-4 md:space-y-6">
              <ContactInfo
                icon={<MapPin size={16} className="text-red-600" />}
                text="Global Tech Park, Gurgaon, India"
              />
              <ContactInfo
                icon={<Phone size={16} className="text-red-600" />}
                text="+91 4500 9988 22"
              />
              <ContactInfo
                icon={<Mail size={16} className="text-red-600" />}
                text="warehouse.ops@localmate.com"
              />
            </div>
            <button className="mt-8 md:mt-12 w-full bg-red-600 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase italic tracking-widest text-[10px] hover:bg-white hover:text-black transition-all">
              Get Quotation
            </button>
          </div>
        </div>
      </section>

      <CreateShipment />
      <div />
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

export default WarehousingPage;
