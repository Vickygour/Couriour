import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react"; // Import WhatsApp icon

// Components & Pages
import Preloader from "./Pages/PreLoader";
import HomePage from "./Pages/HomePage";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import AboutPage from "./Pages/AboutPage";
import Tracking from "./Pages/TrackingPage";
import OrderTrack from "./Pages/OrderTrack";
import CreateShipment from "./Pages/CreateShipment";
import ExpressParcel from "./Pages/ExpressParcel";
import WareHousing from "./Pages/WareHousing";
import PartTruckLoad from "./Pages/PartTruckLoad";
import FullTruckLoad from "./Pages/FullTruckLoad";
import BikePage from "./Pages/BIkePage";
import ContactPage from "./Pages/ContactPage";
import Logins from "./Component/Logins";

// 1. Scroll To Top Logic
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 2. WhatsApp Floating Button Component
const WhatsAppButton = () => {
  const phoneNumber = "918826262858";
  const message = encodeURIComponent(
    "Hello LocalMate Logistics, I have a query regarding a shipment."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[999] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      aria-label="Contact on WhatsApp"
    >
      <i className="fa fa-whatsapp text-[30px]"></i>

      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 font-bold uppercase text-xs whitespace-nowrap">
        Chat with us
      </span>
    </a>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDelivered, setIsDelivered] = useState(false);

  useEffect(() => {
    const deliveryTimer = setTimeout(() => setIsDelivered(true), 2000);
    const finalTimer = setTimeout(() => setIsLoading(false), 6500);

    return () => {
      clearTimeout(deliveryTimer);
      clearTimeout(finalTimer);
    };
  }, []);

  return (
    <Router>
      {/* Ensures every page starts at the top */}
      <ScrollToTop />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader isDelivered={isDelivered} key="preloader" />
        ) : (
          <div className="flex flex-col min-h-screen bg-white">
            <Navbar />

            {/* Floating WhatsApp UI */}
            <WhatsAppButton />

            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/logins" element={<Logins />} />
                <Route path="/tracking" element={<Tracking />} />
                <Route path="/track" element={<OrderTrack />} />
                <Route path="/CreateShipment" element={<CreateShipment />} />
                <Route path="/services/express" element={<ExpressParcel />} />
                <Route path="/services/warehousing" element={<WareHousing />} />
                <Route
                  path="/services/part-truck"
                  element={<PartTruckLoad />}
                />
                <Route
                  path="/services/full-truck"
                  element={<FullTruckLoad />}
                />
                <Route path="/services/Bike-service" element={<BikePage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>

            <Footer />
          </div>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
