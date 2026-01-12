import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
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
  LogOut,
  User as UserIcon,
  Phone,
  ArrowRight,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.clear();
    setIsOpen(false);
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
    { name: "Create Shipment", path: "/CreateShipment" },
    { name: "Contact", path: "/contact" },
  ];

  const closeMenu = () => {
    setIsOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <header className="w-full fixed top-0 z-[100] font-sans">
      {/* --- TOP WHITE BAR (Desktop Only) --- */}
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
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-black uppercase text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100  ">
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
            <a
              href="tel:+918826262858"
              className="bg-red-600 text-white text-[13px] px-6 h-12 flex items-center transform skew-x-[-20deg] mr-[-20px] hover:bg-red-700 transition-colors"
            >
              <div className="transform skew-x-[20deg] font-bold">
                Quick Support: +91 8826262858
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* --- MAIN NAVIGATION --- */}
      <div className="bg-white shadow-md relative h-20 lg:h-20">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between h-full px-4 relative">
          {/* LOGO SECTION (Improved for Mobile) */}
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="absolute left-4 lg:left-0 top-[-20px] lg:top-[-48px] z-20"
          >
            <Link to="/">
              <div
                className="bg-red-600 w-24 lg:w-44 h-[110px] lg:h-[180px] flex flex-col items-center justify-center shadow-2xl transition-transform hover:scale-105"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)" }}
              >
                <img
                  src={logo}
                  alt="Localmate Logo"
                  className="w-[85%] lg:w-[90%] h-auto object-contain mb-4"
                />
              </div>
            </Link>
          </motion.div>

          {/* DESKTOP MENU */}
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
                    `flex items-center font-black   uppercase text-[14px] tracking-wide transition-colors ${
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
                      className={`ml-1 transition-transform ${
                        isServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </NavLink>

                <AnimatePresence>
                  {link.hasDropdown && isServicesOpen && (
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

          {/* RIGHT TOOLS (Desktop) */}
          <div className="hidden lg:flex items-center h-full">
            <Link
              to="/track"
              className="flex items-center space-x-2 px-6 border-r border-gray-200"
            >
              <span className="text-sm font-black text-slate-800   uppercase">
                Track ID
              </span>
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                <Search size={14} />
              </div>
            </Link>
            <div className="bg-[#0a1d37] h-full flex items-center px-6 space-x-5 text-white/70">
              <Twitter
                size={16}
                className="hover:text-red-500 cursor-pointer"
              />
              <Instagram
                size={16}
                className="hover:text-red-500 cursor-pointer"
              />
              <Facebook
                size={16}
                className="hover:text-red-500 cursor-pointer"
              />
            </div>
          </div>

          {/* MOBILE TOGGLE & TRACK ICON */}
          <div className="lg:hidden flex items-center gap-4 ml-auto">
            <Link
              to="/tracking"
              className="p-2 text-slate-700 bg-gray-100 rounded-full"
            >
              <Search size={20} />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-red-600 text-white rounded-lg shadow-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU (Complete Overhaul) --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[80%] max-w-[320px] bg-white z-[120] lg:hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 bg-[#0a1d37] text-white flex justify-between items-center">
                <div>
                  <h1 className="font-black   text-xl uppercase tracking-tighter">
                    Local<span className="text-red-600">mate</span>
                  </h1>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">
                    Logistics & Express
                  </p>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2 bg-white/10 rounded-full transition-colors active:bg-red-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4">
                {menuLinks.map((link) => (
                  <div
                    key={link.name}
                    className="border-b border-gray-50 last:border-0"
                  >
                    {link.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className="flex justify-between items-center w-full px-6 py-4 text-slate-800 font-bold uppercase text-sm  "
                        >
                          {link.name}
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${
                              isServicesOpen ? "rotate-180 text-red-600" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {isServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="bg-gray-50 overflow-hidden"
                            >
                              {link.dropdownItems.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.path}
                                  onClick={closeMenu}
                                  className="flex items-center gap-3 pl-10 pr-6 py-3 text-sm font-semibold text-slate-600 border-l-4 border-transparent hover:border-red-600 hover:text-red-600"
                                >
                                  <ArrowRight
                                    size={14}
                                    className="text-red-600"
                                  />{" "}
                                  {sub.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <NavLink
                        to={link.path}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `block px-6 py-4 text-sm font-bold uppercase   transition-colors ${
                            isActive
                              ? "text-red-600 bg-red-50/50"
                              : "text-slate-800"
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Auth & Footer */}
              <div className="p-6 bg-gray-50 mt-auto">
                {isLoggedIn ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                      <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-black">
                        {user.name?.charAt(0) || "P"}
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">
                          Active Partner
                        </p>
                        <p className="text-sm font-black text-slate-800">
                          {user.name || "User Name"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 bg-red-600 text-white rounded-xl font-bold uppercase   flex items-center justify-center gap-2 shadow-lg shadow-red-200"
                    >
                      <LogOut size={18} /> Logout Account
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/logins"
                    onClick={closeMenu}
                    className="w-full py-4 bg-[#0a1d37] text-white rounded-xl font-bold uppercase   flex items-center justify-center gap-2 shadow-xl"
                  >
                    <UserIcon size={18} /> Partner Login
                  </Link>
                )}

                <div className="mt-6 flex justify-center gap-6 text-slate-400">
                  <Twitter size={20} />
                  <Instagram size={20} />
                  <Facebook size={20} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
