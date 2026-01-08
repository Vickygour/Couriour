import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

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

// 2. Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  return isAuthenticated ? children : <Navigate to="/logins" replace />;
};

// 3. WhatsApp Floating Button
const WhatsAppButton = () => {
  const phoneNumber = "918826262858";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[999] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
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
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader isDelivered={isDelivered} key="preloader" />
        ) : (
          <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <WhatsAppButton />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/logins" element={<Logins />} />
                <Route path="/tracking" element={<Tracking />} />
                <Route path="/track" element={<OrderTrack />} />

                {/* Protected Route for CreateShipment */}
                <Route
                  path="/CreateShipment"
                  element={
                    <ProtectedRoute>
                      <CreateShipment />
                    </ProtectedRoute>
                  }
                />

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
