import React, { useRef, useState, useEffect } from 'react';
import './AudioPlayer.css'; // Import your CSS file for styling

interface AudioPlayerProps {
  audioUrl: string;
  audioRef: React.RefObject<HTMLVideoElement>;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, audioRef }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5); // Initial volume set to 50%
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current?.currentTime || 0);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    audioRef.current?.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current?.addEventListener('play', handlePlay);
    audioRef.current?.addEventListener('pause', handlePause);
    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.current?.removeEventListener('play', handlePlay);
      audioRef.current?.removeEventListener('pause', handlePause);
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, [audioRef]);

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  // Function to toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play(); // Play the audio
      } else {
        audioRef.current.pause(); // Pause the audio
      }
    }
  };

  // Function to handle volume change
  const handleVolumeChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
      setVolume(value);
    }
  };

  // Function to toggle fullscreen mode
  const toggleFullScreen = () => {
    if (audioRef.current) {
      if (!isFullScreen) {
        audioRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  // Format time into minutes:seconds
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="audio-player">
      <video ref={audioRef} src={audioUrl} className="audio-element" />
      <div className="controls">
        <button onClick={togglePlayPause}>
        
          {isPlaying ? 
         <svg
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 24 24"
         width="24"
         height="24"
         fill="none"
         stroke="currentColor"
         stroke-width="2"
         stroke-linecap="round"
         stroke-linejoin="round"
       >
         <rect x="6" y="4" width="4" height="16" />
         <rect x="14" y="4" width="4" height="16" />
       </svg>
       
         : 
          <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>}
        </button>
        <div className="time-display">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={audioRef.current?.duration || 0}
            value={currentTime}
            className="seek-bar"
            onChange={(e) => handleSeek(Number(e.target.value))}
          />
          <span>{formatTime(audioRef.current?.duration || 0)}</span>
        </div>
        <div className="volume-control">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            className="volume-bar"
            onChange={(e) => handleVolumeChange(Number(e.target.value))}
          />
          <svg  onClick={toggleFullScreen}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15 4H4a2 2 0 0 0-2 2v11M21 20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v11z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
