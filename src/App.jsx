import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Components & Pages
import Preloader from "./Pages/PreLoader";
import HomePage from "./Pages/HomePage";
import LuxuryAuthPortal from "./Component/login";

function App() {
  const [step, setStep] = useState("auth"); // 'auth' -> 'loading' -> 'website'
  const [isDelivered, setIsDelivered] = useState(false);

  // Ye function LuxuryAuthPortal se call hoga jab login successful ho jaye
  const handleLoginSuccess = () => {
    setStep("loading");

    // 2s baad parcel deliver hoga (Checkmark animation)
    setTimeout(() => setIsDelivered(true), 2000);

    // 4.5s baad final website load hogi
    setTimeout(() => setStep("website"), 4500);
  };

  return (
    <Router>
      <AnimatePresence mode="wait">
        {/* STEP 1: Pehle Login Page aayega */}
        {step === "auth" && (
          <LuxuryAuthPortal
            onLoginSuccess={handleLoginSuccess}
            key="login-page"
          />
        )}

        {/* STEP 2: Login ke baad Preloader chalega */}
        {step === "loading" && (
          <Preloader isDelivered={isDelivered} key="preloader" />
        )}

        {/* STEP 3: Website load hogi */}
        {step === "website" && (
          <Routes key="routes">
            <Route path="/" element={<HomePage />} />
            {/* Agar user wapas login par jana chahe toh step reset karna hoga */}
            <Route path="/login" element={<Navigate to="/" />} />
          </Routes>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
