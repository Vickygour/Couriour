import React from "react";
import TrackingDashboard from "../Component/TrackingPage";
import TrackingBanner from "../Component/TrackingBanner";
import TrackingPage2 from "../Component/TrackingPage2";
import CreateShipment from "./CreateShipment";

const TrackingPage = () => {
  return (
    <>
      <TrackingBanner />
      <TrackingDashboard />
      <TrackingPage2 />
      <CreateShipment />
    </>
  );
};

export default TrackingPage;
