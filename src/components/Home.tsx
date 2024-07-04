import { useState, useEffect } from "react";
import Navbar from "./NavBar";
import './Home.css';
import ContentPage from "./ContentPage";


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
            <Navbar handleSelectChange={handleTranscriptSelect}/>
            <div className="content">
              <div className="transcripts-list">
               <ContentPage selectedTranscriptId={selectedTranscriptId}/>
              </div>
            </div>
        </div>
  );
}
 
export default Home;