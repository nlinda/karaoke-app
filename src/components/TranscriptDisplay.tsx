import React, { useState, useEffect } from 'react';
import './TranscriptDisplay.css';

interface TranscriptDisplayProps {
  paragraphs: Paragraph[];
  words: Word[];
  // isPlaying: boolean;
  // currentTime: number;
  // volume:number;
  // playbackSpeed: number;
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

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ audioRef, paragraphs, words }) => {
  const [dummyState, setDummyState] = useState(false); // Dummy state to force re-render

  useEffect(() => {
    const handleTimeUpdate = () => {
      // Force re-render when currentTime changes
      setDummyState(prev => !prev);
    };

    audioRef.current?.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [audioRef]);

  const getHighlightedClass = (word: Word): string => {
    if(!audioRef?.current) return '';
    if (!audioRef?.current?.paused &&  audioRef.current.currentTime >= word.time && audioRef.current.currentTime <= word.time + word.duration) {
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
