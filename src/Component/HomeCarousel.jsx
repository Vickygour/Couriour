import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Globe,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/effect-coverflow";

const LuxuryProjectsSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      id: 1,
      category: "Maritime Division",
      title: "Global Maritime Delivery Logistics & hot takes",
      image:
        "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=800",
      stats: "15k+ Tons Handled",
    },
    {
      id: 2,
      category: "Aviation Hub",
      title: "Optimizing Terminal Operations Trends & Hot Takes",
      image:
        "https://images.unsplash.com/photo-1544015759-111811443be8?q=80&w=800",
      stats: "24h Express Clear",
    },
    {
      id: 3,
      category: "Smart Warehousing",
      title: "Taking a new pragmatic approach to flight capacity limits",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800",
      stats: "Zero Loss Guarantee",
    },
    {
      id: 4,
      category: "Maritime Division",
      title: "Global Maritime Delivery Logistics & hot takes",
      image:
        "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=800",
      stats: "15k+ Tons Handled",
    },
    {
      id: 5,
      category: "Aviation Hub",
      title: "Optimizing Terminal Operations Trends & Hot Takes",
      image:
        "https://images.unsplash.com/photo-1544015759-111811443be8?q=80&w=800",
      stats: "24h Express Clear",
    },
    {
      id: 6,
      category: "Smart Warehousing",
      title: "Taking a new pragmatic approach to flight capacity limits",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800",
      stats: "Zero Loss Guarantee",
    },
  ];

  return (
    <section className="bg-white py-24 font-sans overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-0 lg:h-[600px]">
          {/* --- LEFT SIDE: 30% STATIC CONTENT --- */}
          <div className="w-full lg:w-[35%] bg-[#001D26] p-12 lg:p-20 flex flex-col justify-between relative overflow-hidden order-2 lg:order-1 lg:rounded-l-[3rem]">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-8"
              >
                <span className="w-10 h-[2px] bg-red-600" />
                <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.5em]">
                  Network Excellence
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
                  <h2 className="text-white text-4xl lg:text-6xl font-black leading-[0.9] uppercase italic mb-8">
                    Moving <br />{" "}
                    <span className="text-red-600">Industries</span> <br />{" "}
                    Forward.
                  </h2>
                  <p className="text-gray-400 text-sm italic font-medium leading-relaxed border-l-2 border-red-600 pl-4">
                    Project {projects[activeIndex].id}:{" "}
                    {projects[activeIndex].stats}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-6 relative z-10 pt-10 border-t border-white/5">
              <div className="flex flex-col gap-1">
                <Globe className="text-red-600" size={20} />
                <span className="text-white font-black text-xl italic leading-none">
                  190+
                </span>
                <span className="text-white/20 text-[8px] uppercase font-bold tracking-widest">
                  Countries
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <ShieldCheck className="text-red-600" size={20} />
                <span className="text-white font-black text-xl italic leading-none">
                  Safe
                </span>
                <span className="text-white/20 text-[8px] uppercase font-bold tracking-widest">
                  Guaranteed
                </span>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: 70% INTERACTIVE SLIDER --- */}
          <div
            className="
  w-full lg:w-[65%] 
  relative order-1 lg:order-2 
  lg:rounded-r-[3rem] 
  overflow-hidden
  /* --- LUXURY GLASS CONFIG --- */
  bg-red-950/20               /* Dark Red Base with Transparency */
  backdrop-blur-[120px]       /* Deep Blurry Effect */
  border-l border-white/10    /* Subtle Edge Light */
  /* --- LUXURY GLASS CONFIG END --- */
"
          >
            {/* --- AMBIENT INTERNAL GLOW (Extra Luxury) --- */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-red-600/20 blur-[100px] rounded-full" />
              <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[80px] rounded-full" />
            </div>

            <Swiper
              modules={[Navigation, Autoplay, EffectCoverflow]}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1.2}
              loop={true}
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
              className="h-full luxury-swiper relative z-10" /* Added z-10 */
            >
              {projects.map((item) => (
                <SwiperSlide key={item.id} className="py-10 lg:py-20">
                  <motion.div
                    className="relative w-full h-full group px-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Image Box - Isko bhi halka Glassy touch diya hai */}
                    <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.3)] bg-white/5 backdrop-blur-md border border-white/10">
                      <img
                        src={item.image}
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                        alt={item.title}
                      />

                      {/* Interactive Glass Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Floating Content */}
                      <div className="absolute bottom-10 left-10 right-10 z-20">
                        <p className="text-red-500 font-black text-[10px] uppercase tracking-[0.4em] mb-2">
                          {item.category}
                        </p>
                        <h3 className="text-white text-2xl lg:text-3xl font-black uppercase italic leading-none max-w-md drop-shadow-lg">
                          {item.title}
                        </h3>
                      </div>

                      {/* Moving Red Accent */}
                      <div className="absolute top-0 right-0 w-[2px] h-0 bg-red-600 group-hover:h-full transition-all duration-1000 shadow-[0_0_15px_#dc2626]" />
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* --- NAVIGATION CONTROLS (Updated for Glass Theme) --- */}
            <div className="absolute bottom-10 right-20 z-30 flex gap-4">
              <button className="slide-prev w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-2xl hover:bg-red-600 transition-all duration-500 group">
                <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button className="slide-next w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl hover:shadow-red-600/40 transition-all duration-500 group border-2 border-white/30">
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Project Index Counter */}
            <div className="absolute top-10 right-20 z-30 flex items-end select-none">
              <span className="text-black text-6xl font-black opacity-10 italic">
                0{activeIndex + 1}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .luxury-swiper {
          padding-left: 50px !important;
          padding-right: 50px !important;
        }
        @media (max-width: 1024px) {
          .luxury-swiper {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default LuxuryProjectsSlider;
