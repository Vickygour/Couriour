import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Components & Pages
import Preloader from "./Pages/PreLoader";
import HomePage from "./Pages/HomePage";
// import LuxuryAuthPortal from "../components/LuxuryAuthPortal"; // Jo aapne banwaya tha

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDelivered, setIsDelivered] = useState(false);

  useEffect(() => {
    // 2s parcel animation, 4.5s total preloader
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
          <Preloader isDelivered={isDelivered} />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/login" element={<LuxuryAuthPortal />} /> */}
            {/* Baaki routes yahan add karein */}
          </Routes>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
