import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    subtitle: "Safe Transportation & Logistics",
    title: "Global Maritime Delivery",
    highlight: "Industry Trends",
    img: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=2000",
  },
  {
    id: 2,
    subtitle: "Fastest Air Freight",
    title: "Aviation Capacity",
    highlight: "New Limits",
    img: "https://images.unsplash.com/photo-1544015759-111811443be8?q=80&w=2000",
  },
  {
    id: 3,
    subtitle: "Secure Warehousing",
    title: "Smart Storage",
    highlight: "Solutions",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000",
  },
];

const HeroSlider = () => {
  return (
    <section className="relative w-full h-screen bg-[#050505] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1500}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        navigation={{ prevEl: ".prev-btn", nextEl: ".next-btn" }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Image with Zoom Animation */}
              <motion.div
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: "linear" }}
                className="absolute inset-0"
              >
                <img
                  src={slide.img}
                  className="w-full h-full object-cover"
                  alt={slide.title}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              </motion.div>

              {/* Content Overlay */}
              <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="text-red-600 font-black uppercase tracking-[0.4em] text-xs mb-6 italic border-l-4 border-red-600 pl-4">
                    {slide.subtitle}
                  </p>

                  <h1 className="text-white text-6xl md:text-[100px] font-black leading-[0.85] uppercase italic tracking-tighter mb-8">
                    {slide.title} <br />
                    <span
                      className="text-transparent"
                      style={{ WebkitTextStroke: "1px white" }}
                    >
                      {slide.highlight}
                    </span>
                  </h1>

                  <div className="flex flex-wrap gap-6 mt-10">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-red-600 text-white px-10 py-5 rounded-full font-black uppercase italic tracking-widest text-[11px] flex items-center gap-3 shadow-2xl"
                    >
                      View Services <ArrowRight size={18} />
                    </motion.button>

                    <button className="flex items-center gap-4 text-white group">
                      <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <Play fill="currentColor" size={20} />
                      </div>
                      <span className="font-black uppercase italic text-xs tracking-[0.2em]">
                        Watch Video
                      </span>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation & Pagination (Bottom Controls) */}
      <div className="absolute bottom-12 left-0 w-full z-20 px-6">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          {/* Pagination Dots */}
          <div className="custom-pagination flex gap-3"></div>

          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <button className="prev-btn w-12 h-12 rounded-full border border-white/10 text-white flex items-center justify-center hover:bg-red-600 transition-all uppercase font-bold text-[10px]">
              Prev
            </button>
            <button className="next-btn w-12 h-12 rounded-full border border-white/10 text-white flex items-center justify-center hover:bg-red-600 transition-all uppercase font-bold text-[10px]">
              Next
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white !important;
          width: 40px !important;
          height: 3px !important;
          border-radius: 0 !important;
          opacity: 0.2 !important;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #dc2626 !important;
          opacity: 1 !important;
          width: 80px !important;
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;
