import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { Plane, Ship, Check, Star } from "lucide-react";
import About1 from "../assets/About1.png";
import DeliveryPng from "../assets/delivery.png"; // Aapki image

const AboutExperience = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden font-sans relative">
      {/* --- EXTRA BEST ANIMATION: The Delivery Boy --- */}
      {/* Ye image section ke piche se move karegi left to right */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "100vw", opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[-25px] left-0 z-50 pointer-events-none opacity-20 hidden lg:block"
      >
        <img src={DeliveryPng} alt="Delivery" className="w-40" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* --- LEFT SIDE: IMAGE & BADGE --- */}
          <div className="relative" data-aos="zoom-in-right">
            {/* Floating Globe Icon */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -left-10 z-20 hidden md:block"
            >
              <div className="bg-white p-8 rounded-full shadow-2xl border border-gray-100">
                <img
                  src={About1}
                  alt="globe"
                  className="w-20 h-20 object-contain"
                />
              </div>
            </motion.div>

            {/* Main Truck Image */}
            <div className="relative z-10 rounded-sm overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000"
                alt="Logistics Truck"
                className="w-full h-[500px] object-cover"
              />

              {/* --- IMAGE OVERLAY ANIMATION --- */}
              {/* Scooter image ko yahan chota karke ek badge ki tarah bhi dikha sakte hain */}
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 right-10 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl z-20 flex items-center gap-3 border border-red-100"
              >
                <img src={DeliveryPng} alt="Express" className="w-12 h-12" />
                <div>
                  <p className="text-[10px] font-black text-red-600 uppercase tracking-tighter">
                    Fastest
                  </p>
                  <p className="text-xs font-bold text-slate-900 uppercase">
                    Express Delivery
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Experience Red Badge */}
            <div
              className="absolute -bottom-10 -left-6 z-30 bg-red-600 text-white p-10 shadow-2xl"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="flex items-center gap-2 mb-2 font-black italic">
                <span className="text-5xl">25+</span>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest leading-tight">
                Years Of <br /> Experience
              </p>
              <div className="absolute top-4 right-4 bg-white text-red-600 px-2 py-1 rounded-sm flex items-center gap-1 shadow-lg">
                <span className="text-xs font-black">4.9</span>
                <Star size={10} fill="currentColor" />
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: CONTENT --- */}
          <div className="lg:pl-10">
            <div data-aos="fade-left">
              <h4 className="text-red-600 font-black uppercase tracking-widest text-sm mb-4 italic flex items-center gap-2">
                <span className="w-10 h-[2px] bg-red-600"></span> Safe
                Transportation
              </h4>
              <h2 className="text-5xl font-black text-slate-900 leading-[1.1] mb-8 uppercase italic">
                Modern transport system <br />
                <span className="text-red-600">& secure packaging</span>
              </h2>
            </div>

            {/* Sub-Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div data-aos="fade-up" data-aos-delay="200" className="group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-slate-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 rounded-lg">
                    <Plane size={32} />
                  </div>
                  <h5 className="font-black uppercase italic text-slate-900 leading-tight">
                    Air Freight <br /> Transportation
                  </h5>
                </div>
              </div>

              <div data-aos="fade-up" data-aos-delay="400" className="group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-slate-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 rounded-lg">
                    <Ship size={32} />
                  </div>
                  <h5 className="font-black uppercase italic text-slate-900 leading-tight">
                    Ocean Freight <br /> Transportation
                  </h5>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div
              className="space-y-4 mb-10"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              {["Safe & Timely Delivery", "Global Logistics Support"].map(
                (text, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-slate-700 font-bold text-sm uppercase"
                  >
                    <div className="bg-red-600 text-white p-1 rounded-full">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    {text}
                  </div>
                )
              )}
            </div>

            {/* CTA & Profile */}
            <div
              className="flex flex-wrap items-center gap-8"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <button className="bg-slate-900 text-white px-10 py-5 font-black uppercase italic flex items-center gap-3 hover:bg-red-600 transition-all group relative overflow-hidden shadow-xl">
                <span className="relative z-10">View Services</span>
                <div className="bg-white text-slate-900 p-1 rounded-full group-hover:rotate-45 transition-transform z-10">
                  <Check size={16} strokeWidth={3} />
                </div>
              </button>

              <div className="flex items-center gap-4 border-l-2 border-gray-100 pl-8">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="CEO"
                  className="w-14 h-14 rounded-full border-2 border-red-600 p-1"
                />
                <div>
                  <h6 className="font-black text-slate-900 italic uppercase">
                    Mehedii .H
                  </h6>
                  <p className="text-xs text-red-600 font-bold uppercase">
                    Ceo & Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutExperience;
