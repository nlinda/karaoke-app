import React, { useEffect, useRef, useState } from 'react';
import AudioPlayer from './AudioPlayer';
import TranscriptDisplay from './TranscriptDisplay';
import { Transcript } from '../Interfaces/Transcript';
import axios from 'axios';
import useFetch from '../Effects/useFetch';
import { useParams } from 'react-router-dom';

interface ContentPageProps {
    selectedTranscriptId: number; 
}
const ContentPage: React.FC = () => {
    const { selectedTranscriptId } = useParams(); 
    const [selectedTranscript, setSelectedTranscript] = useState<Transcript | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [volume, setVolume] = useState<number>(0.5); // Initial volume set to 50%
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

    const audioRef = useRef<HTMLVideoElement>(null); // Ref for the <audio> element
    const { data, isPending, errorMessage} = useFetch<Transcript>(`https://verbit-karaoke-assignment.vercel.app/api/transcripts/${selectedTranscriptId}`);


    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleTimeUpdate = (time: number) => {
        setCurrentTime(time || 0);
    };

    const handleVolumeChange = (value: number) => {
        setVolume(value);
    }
    
    const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    }

    useEffect(() => {
        setSelectedTranscript(data); // Update selectedTranscript when data changes
    }, [data]);

    return (
        <div>
            {selectedTranscript && (
                <div className="selected-transcript">
                    <AudioPlayer audioUrl={selectedTranscript.audio_url} audioRef={audioRef}  
                        // handlePlay={handlePlay} 
                        // handlePause={handlePause}
                        // handleTimeUpdate={handleTimeUpdate}
                        // handleVolumeChange={handleVolumeChange}
                        // handleSpeedChange={handleSpeedChange}
                        />
                    <TranscriptDisplay
                    audioRef={audioRef}  
                        paragraphs={selectedTranscript.paragraphs}
                        words={selectedTranscript.words}
                        // isPlaying={isPlaying} 
                        // currentTime={currentTime}
                        // volume={volume}
                        // playbackSpeed={playbackSpeed}
                    />
                </div>
            )}
        </div>
    );
}

export default ContentPage;
