import React, { useRef, useState, useEffect } from 'react';

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
  }
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

  return (
    <div className="audio-player">
      <video ref={audioRef} src={audioUrl} />
      <div className="controls">
        <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <input
          type="range"
          min={0}
          max={audioRef.current?.duration || 0}
          value={currentTime}
          onChange={(e) => handleSeek(Number(e.target.value))}
        />
         <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => handleVolumeChange(Number(e.target.value))}
        />
        <button onClick={toggleFullScreen}>{isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}</button>
   
      </div>
    </div>
  );
};

export default AudioPlayer;
