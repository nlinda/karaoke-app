import React, { useRef, useState, useEffect } from 'react';

interface AudioPlayerProps {
  audioUrl: string;
  audioRef: React.RefObject<HTMLVideoElement>;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, audioRef }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

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

    audioRef.current?.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current?.addEventListener('play', handlePlay);
    audioRef.current?.addEventListener('pause', handlePause);

    return () => {
      audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.current?.removeEventListener('play', handlePlay);
      audioRef.current?.removeEventListener('pause', handlePause);
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
      </div>
    </div>
  );
};

export default AudioPlayer;
