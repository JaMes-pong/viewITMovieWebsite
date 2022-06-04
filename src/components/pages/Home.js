import React from "react";
import Slider from "../comp/movieSlider";
import WatchTodayCard from "../comp/movieCard_watchToday";
import BlockbusterCard from "../comp/movieCard_blockbuster";
import Footer from '../comp/Footer';

// home page
function Home() {
    return(
    <>
        <Slider />
        <WatchTodayCard />
        <BlockbusterCard />
        <Footer />
    </>
    );
}

export default Home;