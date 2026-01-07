import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Components & Pages
import Preloader from "./Pages/PreLoader";
import HomePage from "./Pages/HomePage";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import LuxuryAuthPortal from "./Component/login"; // Path check karlein
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

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDelivered, setIsDelivered] = useState(false);

  useEffect(() => {
    // 2s parcel animation, 6.5s total preloader (as per your code)
    const deliveryTimer = setTimeout(() => setIsDelivered(true), 2000);
    const finalTimer = setTimeout(() => setIsLoading(false), 6500);

    return () => {
      clearTimeout(deliveryTimer);
      clearTimeout(finalTimer);
    };
  }, []);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading ? (
          // Preloader screen - No Navbar or Footer here
          <Preloader isDelivered={isDelivered} key="preloader" />
        ) : (
          /* Main Website Wrapper */
          <div className="flex flex-col min-h-screen bg-white">
            {/* Navbar hamesha top par rahega */}
            <Navbar />

            {/* Main Content Area - grow karega taaki footer hamesha bottom par rahe */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LuxuryAuthPortal />} />
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

                {/* Aap yahan aur routes add kar sakte hain */}
              </Routes>
            </main>

            {/* Footer hamesha bottom par rahega */}
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
