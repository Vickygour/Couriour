import React from "react";
import HomeBanner from "../Component/HomeBanner";
import ServicesSection from "../Component/ServiceCard";
import AboutExperience from "../Component/AboutTop";
import Services1 from "../Component/Service1";
import BestLogisticsSection from "../Component/LogisticsSection";
import Transportation from "../Component/Transportation";
import FinalLogisticsTemplate from "../Component/HomeContact1";
// import Contact from "../Component/ContactUs";
import HomeCarousel from "../Component/HomeCarousel";
import TrackingDashboard from "../Component/TrackingPage";
import SupportBrand from "../Component/SupportBrand";
import ContactUs from "../Component/ContactUs";

const HomePage = () => {
  return (
    <>
      <HomeBanner />
      <ServicesSection />
      <AboutExperience />
      <Services1 />
      <BestLogisticsSection />
      <Transportation />
      <FinalLogisticsTemplate />
      <HomeCarousel />
      <TrackingDashboard />

      <ContactUs />
      <SupportBrand />
      {/* <Contact /> */}
    </>
  );
};

export default HomePage;
