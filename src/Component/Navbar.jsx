import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, Link, useNavigate } from "react-router-dom"; // useNavigate add kiya
import {
  Menu,
  X,
  ChevronDown,
  Mail,
  MapPin,
  Search,
  Twitter,
  Facebook,
  Instagram,
  LogOut, // Icon for logout
  User as UserIcon,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const navigate = useNavigate();

  // Auth States
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.clear(); // Saara data saaf (token, login status etc)
    navigate("/logins");
  };

  const serviceItems = [
    { name: "Bike Service", path: "/services/Bike-service" },
    { name: "Express Parcel", path: "/services/express" },
    { name: "Warehousing", path: "/services/warehousing" },
    { name: "Part Truckload", path: "/services/part-truck" },
    { name: "Full Truckload", path: "/services/full-truck" },
  ];

  const menuLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    {
      name: "Services",
      path: "/services",
      hasDropdown: true,
      dropdownItems: serviceItems,
    },
    { name: "Tracking", path: "/tracking" },
    { name: "Create Shipment", path: "/CreateShipment" }, // Naya Link Add Kiya
    { name: "Contact", path: "/contact" },
  ];

  const closeMenu = () => {
    setIsOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <header className="w-full fixed top-0 z-[100] font-sans ">
      {/* --- TOP WHITE BAR --- */}
      <div className="bg-white border-b border-gray-100 hidden lg:block">
        <div className="flex justify-between items-center h-12 max-w-[1400px] mx-auto px-4">
          <div className="flex items-center space-x-8 ml-40">
            <a
              href="#"
              className="flex items-center text-[13px] text-gray-600 hover:text-red-600 transition-colors"
            >
              <MapPin size={14} className="text-red-600 mr-2" />
              Kh No 11/14/1, Kamal Vihar, Burari, Delhi
            </a>
            <a
              href="mailto:localmate2025@gmail.com"
              className="flex items-center text-[13px] text-gray-600 hover:text-red-600 transition-colors"
            >
              <Mail size={14} className="text-red-600 mr-2" />
              localmate2025@gmail.com
            </a>
          </div>

          <div className="flex items-center space-x-4">
            {/* LOGIN / LOGOUT BUTTON (TOP BAR) */}
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-black uppercase text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 italic">
                  {user.role || "Partner"} Mode
                </span>
                <button
                  onClick={handleLogout}
                  className="text-[12px] font-bold text-gray-700 hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/logins"
                className="text-[12px] font-bold text-gray-700 hover:text-red-600 flex items-center gap-1 transition-colors"
              >
                <UserIcon size={14} /> Partner Login
              </Link>
            )}

            <a href="tel:+918826262858" className="flex items-center">
              <div className="bg-red-600 text-white text-[13px] px-6 h-12 flex items-center transform skew-x-[-20deg] mr-[-20px] hover:bg-red-700 transition-colors">
                <div className="transform skew-x-[20deg] flex items-center font-bold">
                  Quick Support: +91 8826262858
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* --- MAIN NAVIGATION --- */}
      <div className="bg-white shadow-md relative h-20 lg:h-20">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between h-full px-4 relative">
          {/* LOGO SECTION */}
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="absolute left-0 top-[-48px] z-20"
          >
            <Link to="/">
              <div
                className="bg-red-600 w-32 lg:w-40 h-[150px] lg:h-[160px] flex flex-col items-center pt-16 shadow-2xl transition-transform hover:scale-105"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)" }}
              >
                <div className="bg-white p-2 rounded-lg rotate-45 mb-2 shadow-inner">
                  <div className="w-5 h-5 bg-red-600 rounded-sm"></div>
                </div>
                <h1 className="text-white font-black text-xl lg:text-2xl tracking-tighter italic">
                  Localmate
                </h1>
              </div>
            </Link>
          </motion.div>

          {/* DESKTOP MENU ITEMS */}
          <div className="hidden lg:flex items-center space-x-8 ml-48">
            {menuLinks.map((link) => (
              <div
                key={link.name}
                className="relative group h-full flex items-center"
                onMouseEnter={() => link.hasDropdown && setIsServicesOpen(true)}
                onMouseLeave={() =>
                  link.hasDropdown && setIsServicesOpen(false)
                }
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center font-black italic uppercase text-[14px] tracking-wide transition-colors ${
                      isActive
                        ? "text-red-600"
                        : "text-slate-800 hover:text-red-600"
                    }`
                  }
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown
                      size={14}
                      className={`ml-1 transition-transform duration-300 ${
                        isServicesOpen && link.name === "Services"
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  )}
                </NavLink>

                {/* DROPDOWN MENU */}
                <AnimatePresence>
                  {link.hasDropdown &&
                    link.name === "Services" &&
                    isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        className="absolute top-[100%] left-0 w-48 bg-white shadow-2xl border-t-4 border-red-600 py-4 z-50 rounded-b-xl"
                      >
                        {link.dropdownItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className="block px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-red-600 transition-all border-b border-gray-50 last:border-0"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* RIGHT TOOLS */}
          <div className="hidden lg:flex items-center h-full">
            <Link to="/track">
              <div className="flex items-center space-x-2 px-6 border-r border-gray-200">
                <span className="text-sm font-black text-slate-800 italic uppercase">
                  Track ID
                </span>
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all cursor-pointer">
                  <Search size={14} />
                </div>
              </div>
            </Link>
            <div className="bg-[#0a1d37] h-full flex items-center px-6 space-x-5">
              <Twitter
                size={16}
                className="text-white/70 hover:text-red-500 cursor-pointer transition-colors"
              />
              <Instagram
                size={16}
                className="text-white/70 hover:text-red-500 cursor-pointer transition-colors"
              />
              <Facebook
                size={16}
                className="text-white/70 hover:text-red-500 cursor-pointer transition-colors"
              />
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="lg:hidden flex items-center ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 bg-red-600 text-white rounded-xl shadow-lg shadow-red-600/30"
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
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-[#0a1d37] z-[100] lg:hidden flex flex-col"
          >
            <div className="flex justify-between items-center p-8 border-b border-white/10">
              <h1 className="text-white font-black italic text-2xl uppercase tracking-tighter">
                Local<span className="text-red-600">mate</span>
              </h1>
              <button
                onClick={closeMenu}
                className="p-2 text-white bg-white/10 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col p-8 space-y-6 overflow-y-auto">
              {menuLinks.map((link) => (
                <div key={link.name}>
                  <div className="flex justify-between items-center">
                    <NavLink
                      to={link.path}
                      onClick={() => !link.hasDropdown && closeMenu()}
                      className={({ isActive }) =>
                        `text-3xl font-black italic uppercase tracking-tight transition-all ${
                          isActive ? "text-red-600 ml-4" : "text-white/50"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </div>
                </div>
              ))}

              {/* MOBILE LOGIN/LOGOUT */}
              <div className="pt-6 border-t border-white/10">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="text-2xl font-black text-red-600 uppercase italic"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/logins"
                    onClick={closeMenu}
                    className="text-2xl font-black text-white/50 hover:text-red-600 uppercase italic transition-all"
                  >
                    Partner Login
                  </Link>
                )}
              </div>
            </div>

            <div className="mt-auto p-8 bg-red-600">
              <p className="text-white font-bold mb-2 uppercase text-xs tracking-widest">
                Active Partner: {user.name || "Guest"}
              </p>
              <h3 className="text-2xl font-black text-white italic">
                +91 8826262858
              </h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
