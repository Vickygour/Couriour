import React from "react";
import AboutHero from "../Component/AboutBanner";
import AboutExperience from "../Component/AboutTop";
import PremiumServiceSection from "../Component/Service1";
import AboutVideo from "../Component/AboutVideo";
import AboutTeam from "../Component/AboutTeam";

const AboutPage = () => {
  return (
    <>
      <AboutHero />
      <AboutExperience />
      <PremiumServiceSection />
      <AboutVideo />
      <AboutTeam />
    </>
  );
};

export default AboutPage;
