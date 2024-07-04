import React, { useRef, useState, useEffect } from 'react';
import './AudioPlayer.css'; // Import your CSS file for styling

interface AudioPlayerProps {
  audioUrl: string;
  audioRef: React.RefObject<HTMLVideoElement>;
  // handlePlay:() => void ;
  // handlePause: () => void;
  // handleTimeUpdate:(time: number) => void ;
  // handleVolumeChange: (volume: number) => void;
  // handleSpeedChange: (speed: number) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, audioRef}) => {

  return (
    <div className="audio-player">
      <video ref={audioRef} src={audioUrl} className="audio-element" 
      // onTimeUpdate={() => handleTimeUpdate(audioRef.current?.currentTime || 0)} 
      // onPlay={handlePlay}
      // onPause={handlePause}
      controls
      />
    </div>
  );
}

export default AudioPlayer;
