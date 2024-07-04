import { useState, useEffect } from "react";
import Navbar from "./NavBar";
import './Home.css';
import ContentPage from "./ContentPage";
import { Link, NavLink, Outlet } from "react-router-dom";


const Home = () => {

  const [selectedTranscriptId, setSelectedTranscriptId] = useState<number>(0)
  const handleTranscriptSelect = async (transcriptId: number) => {
  try {
    setSelectedTranscriptId(transcriptId);
  } catch (error) {
    console.error('Error fetching transcript details:', error);
  }
};
  return (
    <div className="home-page">
        <div className="content">
          <div className="transcripts-list">
            <Outlet/>
          </div>
        </div>
    </div>
  );
}
 
export default Home;