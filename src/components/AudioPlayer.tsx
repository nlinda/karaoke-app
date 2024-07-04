import React, { useRef, useState, useEffect } from 'react';
import './AudioPlayer.css'; // Import your CSS file for styling

interface AudioPlayerProps {
  audioUrl: string;
  audioRef: React.RefObject<HTMLVideoElement>;
  
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, audioRef}) => {

  return (
    <div className="audio-player"  >
      <video id="myVideo" ref={audioRef} src={audioUrl} className="audio-element" 
      controls
      />
    </div>
  );
}

export default AudioPlayer;
