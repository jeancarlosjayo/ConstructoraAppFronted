import React from "react";
import BannerProfile from "../components/BannerProfile/BannerProfile";
import DataProfile from "../components/DataProfile/DataProfile";
import Footer from "../components/Footer/Footer";
import PictureProfile from "../components/PictureProfile/PictureProfile";

const Profile = () => {
  return (
    <div style={{ position: "relative" }}>
      <BannerProfile />
      <PictureProfile />
      <DataProfile />
      <Footer></Footer>
    </div>
  );
};

export default Profile;
