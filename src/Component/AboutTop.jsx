import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { Plane, Ship, Check, Star } from "lucide-react";
import About1 from "../assets/About1.png";
import DeliveryPng from "../assets/delivery.png";
import { Link } from "react-router-dom";
import Aman from "../assets/Aman.png";

const AboutExperience = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <section
      className="py-24 bg-white overflow-hidden font-sans relative"
      aria-labelledby="about-localmate-heading"
    >
      {/* Moving Delivery Animation */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "100vw", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-25px] left-0 z-50 pointer-events-none opacity-20 hidden lg:block"
      >
        <img
          src={DeliveryPng}
          alt="Localmate delivery network"
          className="w-40"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT VISUAL */}
          <div className="relative" data-aos="zoom-in-right">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -left-10 z-20 hidden md:block"
            >
              <div className="bg-white p-8 rounded-full shadow-2xl border border-gray-100">
                <img
                  src={About1}
                  alt="Global logistics network"
                  className="w-20 h-20 object-contain"
                />
              </div>
            </motion.div>

            <div className="relative z-10 rounded-sm overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000"
                alt="Localmate logistics transportation"
                className="w-full h-[500px] object-cover"
              />

              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 right-10 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl z-20 flex items-center gap-3 border border-red-100"
              >
                <img
                  src={DeliveryPng}
                  alt="Express delivery"
                  className="w-12 h-12"
                />
                <div>
                  <p className="text-[10px] font-black text-red-600 uppercase">
                    Fast & Reliable
                  </p>
                  <p className="text-xs font-bold text-slate-900 uppercase">
                    Express Shipping
                  </p>
                </div>
              </motion.div>
            </div>

            <div
              className="absolute -bottom-10 -left-6 z-30 bg-red-600 text-white p-10 shadow-2xl"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <span className="text-5xl font-black  ">25+</span>
              <p className="text-sm font-bold uppercase tracking-widest leading-tight">
                Years of <br /> Industry Experience
              </p>

              <div className="absolute top-4 right-4 bg-white text-red-600 px-2 py-1 rounded-sm flex items-center gap-1 shadow-lg">
                <span className="text-xs font-black">4.9</span>
                <Star size={10} fill="currentColor" />
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:pl-10">
            <div data-aos="fade-left">
              <h4 className="text-red-600 font-black uppercase tracking-widest text-sm mb-4   flex items-center gap-2">
                <span className="w-10 h-[2px] bg-red-600"></span>
                About Localmate
              </h4>

              <h2
                id="about-localmate-heading"
                className="text-5xl font-black text-slate-900 leading-[1.1] mb-8 uppercase  "
              >
                Trusted logistics solutions <br />
                <span className="text-red-600">
                  built for modern businesses
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div data-aos="fade-up" data-aos-delay="200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-slate-100 text-red-600 hover:bg-red-600 hover:text-white transition-all rounded-lg">
                    <Plane size={32} />
                  </div>
                  <h5 className="font-black uppercase   text-slate-900">
                    Air Freight <br /> Services
                  </h5>
                </div>
              </div>

              <div data-aos="fade-up" data-aos-delay="400">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-slate-100 text-red-600 hover:bg-red-600 hover:text-white transition-all rounded-lg">
                    <Ship size={32} />
                  </div>
                  <h5 className="font-black uppercase   text-slate-900">
                    Ocean Freight <br /> Solutions
                  </h5>
                </div>
              </div>
            </div>

            <div
              className="space-y-4 mb-10"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              {[
                "Safe, secure & timely delivery",
                "Domestic and global logistics coverage",
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-slate-700 font-bold text-sm uppercase"
                >
                  <div className="bg-red-600 text-white p-1 rounded-full">
                    <Check size={12} strokeWidth={4} />
                  </div>
                  {text}
                </div>
              ))}
            </div>

            <div
              className="flex flex-wrap items-center gap-8"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <Link
                to="/about"
                className="bg-slate-900 text-white px-10 py-5 font-black uppercase   flex items-center gap-3 hover:bg-red-600 transition-all shadow-xl"
              >
                View Services
                <Check size={16} strokeWidth={3} />
              </Link>

              <div className="flex items-center gap-4 border-l-2 border-gray-100 pl-8">
                <img
                  src={Aman}
                  alt="Founder of Localmate"
                  className="w-14 h-14 rounded-full border-2 border-red-600 p-1"
                />
                <div>
                  <h6 className="font-black text-slate-900   uppercase">
                    Aman Mahto
                  </h6>
                  <p className="text-xs text-red-600 font-bold uppercase">
                    Founder & CEO, Localmate
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
