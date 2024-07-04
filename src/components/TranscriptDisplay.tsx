import React, { useState, useEffect } from 'react';
import './TranscriptDisplay.css';

interface TranscriptDisplayProps {
  paragraphs: Paragraph[];
  words: Word[];
  audioRef: React.RefObject<HTMLVideoElement>;
}

interface Paragraph {
  id: string; 
  time: number;
  duration: number;
  speaker_id: string;
}

interface Word {
  time: number;
  duration: number;
  text: string;
  paragraph_id: string;
}

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ paragraphs, words, audioRef }) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
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

  const getHighlightedClass = (word: Word): string => {
    if (isPlaying && currentTime >= word.time && currentTime <= word.time + word.duration) {
        const element = document.getElementById(word.paragraph_id);
        element?.scrollIntoView();
      return 'highlighted';
    }
    return '';
  };

  return (
    <div className="transcript-display">
      {paragraphs.map(paragraph => (
        <div id={paragraph.id}>
          <div>
            {words
              .filter(word => word.paragraph_id === paragraph.id)
              .map((word, index) => (
                <span key={index} className={`word ${getHighlightedClass(word)}`}>
                  {word.text}{' '}
                </span>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TranscriptDisplay;
