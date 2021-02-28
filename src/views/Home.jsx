import { Typography } from "@material-ui/core";
import React from "react";
import BannerHome from "../components/BannerHome/BannerHome";
import Footer from "../components/Footer/Footer";
import GridOption from "../components/GridOptions/GridOption";

const Home = () => {
  return (
    <div style={{position:'relative'}}>
      <BannerHome />
      <div style={{ padding: '30px 30px'}}>
        <Typography variant="h4" color="primary">
          Bienvenidos a App Contructora
        </Typography>
        <br></br>
        <GridOption />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
