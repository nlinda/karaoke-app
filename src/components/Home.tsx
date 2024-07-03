import { useState, useEffect } from "react";

import TranscriptsList from "./VideoList";
import Navbar from "./NavBar";
import './Home.css';

const Home = () => {

  return (
    <div className="home-page">
            <Navbar/>
            <div className="content">
              <div className="transcripts-list">
               
              </div>
            </div>
        </div>
  );
}
 
export default Home;