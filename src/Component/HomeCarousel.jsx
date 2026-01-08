import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Globe, ShieldCheck } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import Ocean from "../assets/Ocean.png";
import Plane from "../assets/Aeroplane1.png";
import Train from "../assets/Railway.png";
// import Ship from "../assets/Ship.png";
import "swiper/css";
import "swiper/css/effect-coverflow";

const LuxuryProjectsSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      id: 1,
      category: "Bike Service",
      title: "Fast Bike Delivery for Local & Hyperlocal Shipments",
      image: Plane,
      stats: "Same-Day Pickup • Express Local Delivery",
    },
    {
      id: 2,
      category: "Express Parcel",
      title: "Time-Bound Express Parcel & Courier Solutions",
      image: Ocean,
      stats: "Priority Handling • Nationwide Coverage",
    },
    {
      id: 3,
      category: "Warehousing",
      title: "Smart Warehousing & Inventory Management Services",
      image: Train,
      stats: "Real-Time Tracking • Secure Storage",
    },
    {
      id: 4,
      category: "Part Truckload",
      title: "Cost-Effective Part Truckload Transportation",
      image:
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800",
      stats: "Shared Loads • Optimized Transit Cost",
    },
    {
      id: 5,
      category: "Full Truckload",
      title: "Dedicated Full Truckload Freight Services",
      image:
        "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?q=80&w=800",
      stats: "Door-to-Door • Pan-India Coverage",
    },
    {
      id: 6,
      category: "Express Parcel",
      title: "High-Speed Intercity & Cross-City Parcel Delivery",
      image:
        "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=800",
      stats: "Time-Critical • Live Shipment Tracking",
    },
  ];

  return (
    <section className="bg-white py-24 font-sans overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:h-[600px]">
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-[35%] bg-[#001D26] p-12 lg:p-20 flex flex-col justify-between relative order-2 lg:order-1 lg:rounded-l-[3rem]">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-8"
              >
                <span className="w-10 h-[2px] bg-red-600" />
                <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.5em]">
                  Localmate Network
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-white text-4xl lg:text-6xl font-black uppercase italic leading-[0.9] mb-8">
                    Powering <br />
                    <span className="text-red-600">Global Logistics</span>
                  </h2>

                  <p className="text-gray-400 text-sm italic leading-relaxed border-l-2 border-red-600 pl-4">
                    Project {projects[activeIndex].id} —{" "}
                    {projects[activeIndex].stats}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-10 border-t border-white/5 relative z-10">
              <div>
                <Globe className="text-red-600 mb-1" size={20} />
                <p className="text-white font-black text-xl italic">190+</p>
                <p className="text-white/30 text-[8px] uppercase tracking-widest">
                  Countries Served
                </p>
              </div>
              <div>
                <ShieldCheck className="text-red-600 mb-1" size={20} />
                <p className="text-white font-black text-xl italic">100%</p>
                <p className="text-white/30 text-[8px] uppercase tracking-widest">
                  Secure Delivery
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SLIDER */}
          <div className="w-full lg:w-[65%] relative order-1 lg:order-2 overflow-hidden lg:rounded-r-[3rem] bg-red-950/20 backdrop-blur-[120px] border-l border-white/10">
            <Swiper
              modules={[Navigation, Autoplay, EffectCoverflow]}
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView={1.2}
              loop
              speed={1200}
              autoplay={{ delay: 5000 }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
              }}
              navigation={{
                prevEl: ".slide-prev",
                nextEl: ".slide-next",
              }}
              className="h-full luxury-swiper relative z-10"
            >
              {projects.map((item) => (
                <SwiperSlide key={item.id} className="py-10 lg:py-20">
                  <div className="px-4">
                    <div className="relative rounded-[2.5rem] overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.3)]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      <div className="absolute bottom-10 left-10 right-10">
                        <p className="text-red-500 text-[10px] uppercase tracking-[0.4em] font-black mb-2">
                          {item.category}
                        </p>
                        <h3 className="text-white text-2xl lg:text-3xl font-black uppercase italic max-w-md">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute bottom-10 right-20 z-30 flex gap-4">
              <button className="slide-prev w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-red-600 transition">
                <ChevronLeft />
              </button>
              <button className="slide-next w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center border border-white/30">
                <ChevronRight />
              </button>
            </div>

            <div className="absolute top-10 right-20 z-30 text-black/10 text-6xl font-black italic">
              0{activeIndex + 1}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryProjectsSlider;
