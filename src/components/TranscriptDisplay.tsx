import React, { useState, useEffect } from 'react';
import './TranscriptDisplay.css';
import { Word } from '../Interfaces/Word';
import { Paragraph } from '../Interfaces/Paragraph';


interface TranscriptDisplayProps {
  paragraphs: Paragraph[];
  words: Word[];
  audioRef: React.RefObject<HTMLVideoElement>;
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
  }, [ audioRef]);

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
        <div id={paragraph.id} key={`para_${paragraph.id}`}>
          <div>
            {words
              .filter(word => word.paragraph_id === paragraph.id)
              .map((word, id) => (
                <span key={id} className={`word ${getHighlightedClass(word)}`}>
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
