import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Mail,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Search,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Nav links data
  const menuLinks = [
    { name: "Home", active: true },
    { name: "Pages", hasDropdown: true },
    { name: "Services", hasDropdown: true },
    { name: "About", hasDropdown: false },
    { name: "News", hasDropdown: true },
    { name: "Contact", hasDropdown: false },
  ];

  return (
    <header className="w-full fixed top-0 z-60 font-sans ">
      {/* --- TOP WHITE BAR --- */}
      <div className="bg-white border-b border-gray-100 hidden lg:block">
        <div className="flex justify-between items-center h-12 max-w-[1400px] mx-auto px-4">
          <div className="flex items-center space-x-8 ml-40">
            {" "}
            {/* Space for logo overflow */}
            <div className="flex items-center text-[13px] text-gray-600">
              <MapPin size={14} className="text-red-600 mr-2" />
              55 Main Street, 2nd block, Malborne, Australia
            </div>
            <div className="flex items-center text-[13px] text-gray-600">
              <Mail size={14} className="text-red-600 mr-2" />
              support@example.com
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center text-[13px] text-gray-600 mr-6">
              <Mail size={14} className="text-red-600 mr-2" />
              contact@gmail.com
            </div>
            <div className="bg-red-600 text-white text-[13px] px-6 h-12 flex items-center transform skew-x-[-20deg] mr-[-20px]">
              <div className="transform skew-x-[20deg] flex items-center">
                <MapPin size={14} className="mr-2" />
                734 H, Bryan Burlington, NC 27215
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN NAVIGATION --- */}
      <div className="bg-white shadow-md relative h-24 lg:h-20">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between h-full px-4 relative">
          {/* LOGO SECTION (The Red Slanted Shape) */}
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="absolute left-0 top-[-48px] lg:top-[-48px] z-20"
          >
            <div
              className="bg-red-600 w-32 lg:w-40 h-[150px] lg:h-[160px] flex flex-col items-center pt-16 shadow-2xl"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)" }}
            >
              {/* Logo Icon */}
              <div className="bg-white p-2 rounded-lg rotate-45 mb-2 shadow-inner">
                <div className="w-5 h-5 bg-red-600 rounded-sm"></div>
              </div>
              <h1 className="text-white font-bold text-xl lg:text-2xl tracking-tighter">
                Localmate
              </h1>
            </div>
          </motion.div>

          {/* DESKTOP MENU ITEMS */}
          <div className="hidden lg:flex items-center space-x-8 ml-48">
            {menuLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative group cursor-pointer"
              >
                <div
                  className={`flex items-center font-bold text-[15px] ${
                    link.active ? "text-red-600" : "text-gray-800"
                  } hover:text-red-600 transition-colors`}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown
                      size={14}
                      className="ml-1 mt-1 group-hover:rotate-180 transition-transform"
                    />
                  )}
                </div>
                {/* Underline Animation */}
                <div
                  className={`absolute -bottom-1 left-0 h-[2px] bg-red-600 transition-all duration-300 ${
                    link.active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT TOOLS (Language, Social, Grid) */}
          <div className="hidden lg:flex items-center h-full">
            <div className="flex items-center space-x-2 px-6 border-r border-gray-200">
              <img
                src="https://flagcdn.com/w20/au.png"
                alt="AU"
                className="w-5 h-3 shadow-sm"
              />
              <span className="text-sm font-bold text-gray-700">English</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>

            {/* Grid Icon */}
            <div className="px-6 cursor-pointer hover:text-red-600 transition-colors">
              <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-1 rounded-full ${
                      i === 7 ? "bg-red-600" : "bg-gray-800"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Social Icons Sidebar Panel */}
            <div className="bg-[#001524] h-full flex items-center px-4 space-x-4 border-l border-gray-800">
              <div className="flex flex-col space-y-3">
                <Twitter
                  size={15}
                  className="text-white hover:text-red-500 cursor-pointer"
                />
                <Instagram
                  size={15}
                  className="text-white hover:text-red-500 cursor-pointer"
                />
              </div>
              <div className="w-[1px] h-10 bg-gray-700"></div>
              <div className="flex flex-col space-y-3">
                <Facebook
                  size={15}
                  className="text-white hover:text-red-500 cursor-pointer"
                />
                <Youtube
                  size={15}
                  className="text-white hover:text-red-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="lg:hidden flex items-center ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-gray-100 rounded-md"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 bg-[#001524] z-50 lg:hidden flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-white font-bold text-2xl">Logistick</h1>
              <button onClick={() => setIsOpen(false)} className="text-white">
                <X size={30} />
              </button>
            </div>
            <div className="flex flex-col space-y-6">
              {menuLinks.map((link) => (
                <a
                  key={link.name}
                  href="#"
                  className="text-white text-xl font-semibold border-b border-gray-800 pb-2"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
